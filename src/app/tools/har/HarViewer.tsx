"use client";

import { Fragment, useState, useRef, useCallback, useMemo } from "react";
import { Upload, Search, X, ChevronDown, ChevronRight, Clock, FileText } from "lucide-react";
import { PrivacyAlert } from "@/components/ui/privacy-alert";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HarTimings {
  blocked?: number;
  dns?: number;
  connect?: number;
  ssl?: number;
  send?: number;
  wait: number;
  receive: number;
}

interface HarHeader {
  name: string;
  value: string;
}

interface HarEntry {
  startedDateTime: string;
  time: number;
  request: {
    method: string;
    url: string;
    headers: HarHeader[];
  };
  response: {
    status: number;
    statusText: string;
    headers: HarHeader[];
    content: { mimeType: string; size: number };
  };
  timings: HarTimings;
  _resourceType?: string;
}

interface HarData {
  log: { entries: HarEntry[] };
}

type FilterType = "all" | "xhr" | "js" | "css" | "img" | "media" | "other" | "errors";

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTERS: { label: string; value: FilterType; isError?: boolean }[] = [
  { label: "All", value: "all" },
  { label: "XHR", value: "xhr" },
  { label: "JS", value: "js" },
  { label: "CSS", value: "css" },
  { label: "Img", value: "img" },
  { label: "Media", value: "media" },
  { label: "Other", value: "other" },
  { label: "Errors", value: "errors", isError: true },
];

const TIMING_PHASES = [
  { key: "dns" as const,     label: "DNS Lookup",         color: "bg-blue-500",   dot: "#3b82f6" },
  { key: "connect" as const, label: "Initial Connection", color: "bg-purple-500", dot: "#a855f7" },
  { key: "ssl" as const,     label: "SSL/TLS",            color: "bg-pink-500",   dot: "#ec4899" },
  { key: "wait" as const,    label: "Waiting (TTFB)",     color: "bg-amber-500",  dot: "#f59e0b" },
  { key: "receive" as const, label: "Content Download",   color: "bg-emerald-500",dot: "#10b981" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getResourceType(entry: HarEntry): string {
  if (entry._resourceType) return entry._resourceType.toLowerCase();
  // Strip parameters like "; charset=utf-8" before matching
  const mime = (entry.response.content.mimeType ?? "").split(";")[0].trim().toLowerCase();
  // Most-specific checks first — order matters to avoid false matches
  if (mime.startsWith("image/")) return "image";                          // image/svg+xml must not hit xml check
  if (mime.startsWith("audio/") || mime.startsWith("video/")) return "media";
  if (mime.includes("javascript")) return "script";
  if (mime.includes("css")) return "stylesheet";
  if (mime.includes("html")) return "document";                           // xhtml+xml must not hit xml check
  if (mime.includes("json") || mime.includes("xml")) return "xhr";
  if (mime.includes("font") || mime.includes("woff")) return "font";
  return "other";
}

function matchesFilter(entry: HarEntry, filter: FilterType): boolean {
  if (filter === "all") return true;
  if (filter === "errors") return entry.response.status >= 400;
  const t = getResourceType(entry);
  if (filter === "xhr") return ["xhr", "fetch"].includes(t);
  if (filter === "js") return ["script", "js"].includes(t);
  if (filter === "css") return ["stylesheet", "css"].includes(t);
  if (filter === "img") return ["image", "img"].includes(t);
  if (filter === "media") return t === "media";
  // "other" = anything not covered by a dedicated filter
  return !["xhr","fetch","script","js","stylesheet","css","image","img","media","document"].includes(t);
}

function statusDot(status: number) {
  if (!status) return "bg-zinc-500";
  if (status < 300) return "bg-emerald-500";
  if (status < 400) return "bg-yellow-500";
  return "bg-red-500";
}

function statusText(status: number) {
  if (!status) return "text-zinc-400";
  if (status < 300) return "text-emerald-400";
  if (status < 400) return "text-yellow-400";
  return "text-red-400";
}

function methodColor(method: string) {
  const map: Record<string, string> = {
    GET: "text-sky-400", POST: "text-orange-400", PUT: "text-purple-400",
    DELETE: "text-red-400", PATCH: "text-yellow-400",
  };
  return map[method?.toUpperCase()] ?? "text-zinc-400";
}

function formatMs(ms: number) {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function parseUrl(url: string) {
  try {
    const p = new URL(url);
    return { domain: p.hostname, path: p.pathname + (p.search.length > 1 ? p.search : "") };
  } catch {
    return { domain: "", path: url };
  }
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch { return ""; }
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function entryKey(idx: number) {
  return String(idx);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TimelineHeader({ totalRange }: { totalRange: number }) {
  const n = 6;
  return (
    <div className="relative h-4 w-full">
      {Array.from({ length: n }).map((_, i) => {
        const pct = (i / (n - 1)) * 100;
        const ms = (i / (n - 1)) * totalRange;
        return (
          <span
            key={i}
            style={{
              left: `${pct}%`,
              transform: i === 0 ? "none" : i === n - 1 ? "translateX(-100%)" : "translateX(-50%)",
            }}
            className="absolute text-[9px] whitespace-nowrap text-zinc-600"
          >
            {i === 0 ? "0ms" : formatMs(ms)}
          </span>
        );
      })}
    </div>
  );
}

function WaterfallBar({
  entry,
  minStart,
  totalRange,
}: {
  entry: HarEntry;
  minStart: number;
  totalRange: number;
}) {
  const start = new Date(entry.startedDateTime).getTime();
  const leftPct = clamp(((start - minStart) / totalRange) * 100, 0, 99);
  const widthPct = clamp((entry.time / totalRange) * 100, 0.1, 100 - leftPct);

  const t = entry.timings;
  const phases = TIMING_PHASES.map((p) => ({
    ...p,
    ms: Math.max(0, (t[p.key] as number | undefined) ?? 0),
  })).filter((p) => p.ms > 0);
  const total = phases.reduce((s, p) => s + p.ms, 0) || entry.time;

  return (
    <div className="absolute inset-0 flex items-center">
      <div
        className="absolute flex h-3 overflow-hidden rounded-sm"
        style={{ left: `${leftPct}%`, width: `max(3px, ${widthPct}%)` }}
      >
        {phases.length > 0 ? (
          phases.map((p) => (
            <div
              key={p.key}
              className={p.color}
              style={{ width: `${(p.ms / total) * 100}%`, minWidth: "1px" }}
            />
          ))
        ) : (
          <div className="h-full w-full bg-zinc-600" />
        )}
      </div>
    </div>
  );
}

function EntryDetail({ entry }: { entry: HarEntry }) {
  const [showReq, setShowReq] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const t = entry.timings;

  const timingRows = TIMING_PHASES.map((p) => ({
    ...p,
    ms: t[p.key] as number | undefined,
  })).filter((r) => (r.ms ?? -1) >= 0);

  return (
    <div className="grid gap-6 bg-zinc-950/70 px-6 py-5 lg:grid-cols-2">
      {/* Left: URL + stats + timings */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">URL</span>
          <span className="break-all text-xs text-zinc-300">{entry.request.url}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Status", value: `${entry.response.status} ${entry.response.statusText}`, className: statusText(entry.response.status) },
            { label: "Total", value: formatMs(entry.time), className: "text-zinc-200" },
            { label: "Type", value: entry.response.content.mimeType.split(";")[0], className: "text-zinc-200" },
          ].map(({ label, value, className }) => (
            <div key={label} className="flex flex-col gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
              <span className="text-[10px] text-zinc-500">{label}</span>
              <span className={`font-mono text-xs font-bold ${className}`}>{value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Timings</span>
          {timingRows.map((r) => (
            <div key={r.key} className="flex items-center justify-between rounded-lg bg-zinc-900/60 px-3 py-1.5">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${r.color}`} />
                <span className="text-xs text-zinc-400">{r.label}</span>
              </div>
              <span className="font-mono text-xs text-zinc-300">{formatMs(r.ms ?? 0)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-lg bg-zinc-800/80 px-3 py-1.5">
            <span className="text-xs font-semibold text-zinc-300">Total</span>
            <span className="font-mono text-xs font-bold text-zinc-200">{formatMs(entry.time)}</span>
          </div>
        </div>
      </div>

      {/* Right: headers */}
      <div className="flex flex-col gap-3">
        {[
          { label: "Request Headers", count: entry.request.headers.length, headers: entry.request.headers, shown: showReq, toggle: () => setShowReq((v) => !v), nameColor: "text-sky-400" },
          { label: "Response Headers", count: entry.response.headers.length, headers: entry.response.headers, shown: showRes, toggle: () => setShowRes((v) => !v), nameColor: "text-emerald-400" },
        ].map(({ label, count, headers, shown, toggle, nameColor }) => (
          <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-900/40">
            <button onClick={toggle} className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-zinc-300">
              <span>{label} ({count})</span>
              {shown ? <ChevronDown className="h-4 w-4 text-zinc-500" /> : <ChevronRight className="h-4 w-4 text-zinc-500" />}
            </button>
            {shown && (
              <div className="max-h-52 overflow-y-auto border-t border-zinc-800 px-4 py-3">
                {headers.map((h, i) => (
                  <div key={i} className="flex gap-2 py-0.5 text-xs">
                    <span className={`shrink-0 ${nameColor}`}>{h.name}:</span>
                    <span className="break-all text-zinc-400">{h.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HarViewer() {
  const [harData, setHarData] = useState<HarData | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as HarData;
        if (!data?.log?.entries) {
          toast.error("Invalid HAR file: missing log.entries");
          return;
        }
        setHarData(data);
        setActiveFilter("all");
        setExpandedKey(null);
        setSearch("");
        toast.success(`Loaded ${data.log.entries.length} requests`);
      } catch {
        toast.error("Could not parse the HAR file.");
      }
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const entries = useMemo(() => harData?.log.entries ?? [], [harData]);

  const { minStart, totalRange } = useMemo(() => {
    if (!entries.length) return { minStart: 0, totalRange: 1 };
    const starts = entries.map((e) => new Date(e.startedDateTime).getTime());
    const ends = entries.map((e, i) => starts[i] + e.time);
    const minStart = Math.min(...starts);
    const maxEnd = Math.max(...ends);
    return { minStart, totalRange: maxEnd - minStart || 1 };
  }, [entries]);

  const filterCounts = useMemo<Record<FilterType, number>>(() => {
    const c = { all: entries.length, xhr: 0, js: 0, css: 0, img: 0, media: 0, other: 0, errors: 0 };
    const keys: FilterType[] = ["xhr", "js", "css", "img", "media", "other", "errors"];
    entries.forEach((entry) => keys.forEach((f) => { if (matchesFilter(entry, f)) c[f]++; }));
    return c;
  }, [entries]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return entries
      .map((e, i) => ({ entry: e, idx: i }))
      .filter(({ entry: e }) => matchesFilter(e, activeFilter) && (!q || e.request.url.toLowerCase().includes(q)));
  }, [entries, activeFilter, search]);

  const reset = () => {
    setHarData(null);
    setExpandedKey(null);
    setSearch("");
    setActiveFilter("all");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Upload screen ──────────────────────────────────────────────────────────
  if (!harData) {
    return (
      <Fragment>
        <PrivacyAlert>
          HAR files are parsed entirely in your browser. Nothing is uploaded to any server.
        </PrivacyAlert>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group mt-6 flex cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed p-16 transition-all ${
            isDragging
              ? "border-sky-500 bg-sky-500/5"
              : "border-zinc-800 bg-zinc-900/20 hover:border-sky-500/50 hover:bg-zinc-900/40"
          }`}
        >
          <div className="rounded-full bg-zinc-800 p-4 transition-transform group-hover:scale-110">
            <FileText className="h-8 w-8 text-zinc-400 group-hover:text-sky-400" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-zinc-200">
              Click or drag your <span className="font-mono text-sky-400">.har</span> file here
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Export from Chrome / Firefox DevTools → Network tab → Save all as HAR
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".har,application/json"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            className="hidden"
          />
        </motion.div>
      </Fragment>
    );
  }

  // ── Viewer ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4">
      {/* Filter buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => { setActiveFilter(f.value); setExpandedKey(null); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              activeFilter === f.value
                ? f.isError
                  ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
                  : "bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/40"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            {f.label}
            {filterCounts[f.value] > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeFilter === f.value
                    ? f.isError ? "bg-red-500/30 text-red-300" : "bg-sky-500/30 text-sky-300"
                    : "bg-zinc-700 text-zinc-400"
                }`}
              >
                {filterCounts[f.value]}
              </span>
            )}
          </button>
        ))}
        <button
          onClick={reset}
          className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition-all hover:bg-zinc-800 hover:text-zinc-300"
        >
          <X className="h-3.5 w-3.5" />
          Load new file
        </button>
      </div>

      {/* Legend + summary */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Legend</span>
          {TIMING_PHASES.map((p) => (
            <div key={p.key} className="flex items-center gap-1.5">
              <div className={`h-2.5 w-2.5 rounded-full ${p.color}`} />
              <span className="text-xs text-zinc-400">{p.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock className="h-3 w-3" />
          <span>Timeline {formatMs(totalRange)}</span>
          <span>·</span>
          <span>{filtered.length} requests</span>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-zinc-500" />
        <input
          type="text"
          placeholder="Filter by URL..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setExpandedKey(null); }}
          className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none"
        />
        {search && (
          <button onClick={() => setSearch("")}>
            <X className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-300" />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        {/* Header */}
        <div className="grid min-w-[900px] grid-cols-[80px_64px_88px_1fr_280px_72px] border-b border-zinc-800 bg-zinc-900/60 px-3 py-2">
          {(["STATUS", "METHOD", "STARTED", "REQUEST", "", "TOTAL"] as const).map((col, i) => (
            <div key={i} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {col === "" ? <TimelineHeader totalRange={totalRange} /> : col}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="min-w-[900px] divide-y divide-zinc-800/50">
          {filtered.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-zinc-600">
              No requests match the current filter.
            </div>
          ) : (
            filtered.map(({ entry, idx }) => {
              const key = entryKey(idx);
              const isExpanded = expandedKey === key;
              const isError = entry.response.status >= 400;
              const { domain, path } = parseUrl(entry.request.url);

              return (
                <Fragment key={key}>
                  <button
                    onClick={() => setExpandedKey(isExpanded ? null : key)}
                    className={`grid w-full min-w-[900px] grid-cols-[80px_64px_88px_1fr_280px_72px] items-center px-3 py-2.5 text-left transition-colors ${
                      isError ? "hover:bg-red-950/25" : "hover:bg-zinc-800/40"
                    } ${isExpanded ? (isError ? "bg-red-950/20" : "bg-zinc-800/30") : ""}`}
                  >
                    {/* Status */}
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 shrink-0 rounded-full ${statusDot(entry.response.status)}`} />
                      <span className={`font-mono text-sm font-medium ${statusText(entry.response.status)}`}>
                        {entry.response.status || "—"}
                      </span>
                    </div>
                    {/* Method */}
                    <span className={`text-xs font-bold ${methodColor(entry.request.method)}`}>
                      {entry.request.method}
                    </span>
                    {/* Started */}
                    <span className="font-mono text-xs text-zinc-500">
                      {formatTime(entry.startedDateTime)}
                    </span>
                    {/* Request URL */}
                    <div className="flex min-w-0 flex-col pr-4">
                      <span className="truncate text-xs font-medium text-zinc-300">{domain}</span>
                      <span className="truncate text-xs text-zinc-500">{path}</span>
                    </div>
                    {/* Waterfall */}
                    <div className="relative h-8">
                      <WaterfallBar entry={entry} minStart={minStart} totalRange={totalRange} />
                    </div>
                    {/* Total */}
                    <span className="text-right font-mono text-xs text-zinc-300">
                      {formatMs(entry.time)}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <EntryDetail entry={entry} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
