"use client";

import { Button } from "@/components/ui/button";
import { Fragment, useCallback, useState, useEffect } from "react";
import { Copy, CheckCheck, Eraser, Info } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { PrivacyAlert } from "@/components/ui/privacy-alert";

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every Sunday at midnight", value: "0 0 * * 0" },
];

export function CronGenerator() {
  const [cron, setCron] = useState<string>("* * * * *");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Split cron into parts
  const parts = cron.split(" ");
  const [minute, setMinute] = useState(parts[0] || "*");
  const [hour, setHour] = useState(parts[1] || "*");
  const [dayOfMonth, setDayOfMonth] = useState(parts[2] || "*");
  const [month, setMonth] = useState(parts[3] || "*");
  const [dayOfWeek, setDayOfWeek] = useState(parts[4] || "*");

  useEffect(() => {
    setCron(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`);
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(cron);
    setCopySuccess(success);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [cron]);

  const handleClear = useCallback(() => {
    setMinute("*");
    setHour("*");
    setDayOfMonth("*");
    setMonth("*");
    setDayOfWeek("*");
  }, []);

  return (
    <Fragment>
      <PrivacyAlert>
        Generated cron expressions are created locally. No data is sent to any
        server.
      </PrivacyAlert>

      <div className="mt-6 flex w-full flex-col gap-8">
        <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Presets
            </h3>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const p = preset.value.split(" ");
                    setMinute(p[0]);
                    setHour(p[1]);
                    setDayOfMonth(p[2]);
                    setMonth(p[3]);
                    setDayOfWeek(p[4]);
                  }}
                  className="text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {[
              { label: "Minute", val: minute, set: setMinute, hint: "0-59" },
              { label: "Hour", val: hour, set: setHour, hint: "0-23" },
              {
                label: "Day (Month)",
                val: dayOfMonth,
                set: setDayOfMonth,
                hint: "1-31",
              },
              { label: "Month", val: month, set: setMonth, hint: "1-12" },
              {
                label: "Day (Week)",
                val: dayOfWeek,
                set: setDayOfWeek,
                hint: "0-6",
              },
            ].map((field) => (
              <div key={field.label} className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase text-zinc-500">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.val}
                  onChange={(e) => field.set(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-center font-mono text-sm text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
                <span className="text-center text-[10px] text-zinc-600">
                  {field.hint}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Generated Expression
            </h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-zinc-500"
              >
                <Eraser className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <code className="flex-1 font-mono text-2xl font-bold tracking-wider text-zinc-100">
              {cron}
            </code>
            <Button
              variant="primary"
              onClick={handleCopy}
              className="flex gap-2"
            >
              {copySuccess ? (
                <CheckCheck className="h-5 w-5" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
              {copySuccess ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-amber-500/10 bg-amber-500/5 p-4 text-xs text-amber-400/80">
            <Info className="h-4 w-4 flex-shrink-0" />
            <p>
              This expression will run tasks at the specified intervals. Use{" "}
              <code className="text-amber-300">*</code> for "every",
              <code className="text-amber-300">*/n</code> for "every n", and{" "}
              <code className="text-amber-300">n,m</code> for specific values.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
