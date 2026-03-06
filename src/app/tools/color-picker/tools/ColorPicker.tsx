"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { colord, extend } from "colord";
import cmykPlugin from "colord/plugins/cmyk";
import { Copy, CheckCheck, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { PrivacyAlert } from "@/components/ui/privacy-alert";
import {
  oklch as culoriOklch,
  formatCss,
  rgb as culoriRgb,
  formatHex,
  parse as culoriParse,
} from "culori";

extend([cmykPlugin]);

interface ColorState {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
  a: number; // 0-1
}

// Renamed from ColorPicker to ColorPickerTool to break any possible caching
export function ColorPicker() {
  const [hsva, setHsva] = useState<ColorState>({ h: 217, s: 73, v: 96, a: 1 });
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});

  // Refs for tracking mouse interactions
  const saturationRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const color = useMemo(() => colord(hsva), [hsva]);

  const hex = useMemo(() => color.toHex(), [color]);
  const rgb = useMemo(() => color.toRgbString(), [color]);
  const hsl = useMemo(() => color.toHslString(), [color]);
  const hsv = useMemo(() => {
    const { h, s, v } = color.toHsv();
    return `hsv(${Math.round(h)}°, ${Math.round(s)}%, ${Math.round(v)}%)`;
  }, [color]);
  const cmyk = useMemo(() => {
    try {
      return (color as any).toCmykString();
    } catch (e) {
      return "N/A";
    }
  }, [color]);

  const oklchValue = useMemo(() => {
    try {
      const c = culoriOklch(hex);
      if (!c) return "N/A";

      // EXPLICIT FORMATTING
      const l = (Number(c.l) * 100).toFixed(1);
      const chroma = Number(c.c).toFixed(3);
      const hVal = Number(c.h !== undefined && !isNaN(c.h) ? c.h : 0);
      const hue = hVal.toFixed(3);

      return `oklch(${l}% ${chroma} ${hue})`;
    } catch (e) {
      return "N/A";
    }
  }, [hex]);

  const handleCopy = useCallback(async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopyStatus((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    }
  }, []);

  const updateColorFromHex = (newHex: string) => {
    const c = colord(newHex);
    if (c.isValid()) {
      const { h, s, v, a } = c.toHsv();
      setHsva({ h, s, v, a });
    }
  };

  const updateColorFromRgb = (newRgb: string) => {
    const c = colord(newRgb);
    if (c.isValid()) {
      const { h, s, v, a } = c.toHsv();
      setHsva({ h, s, v, a });
    }
  };

  const updateColorFromCmyk = (newCmyk: string) => {
    try {
      const c = colord(newCmyk);
      if (c.isValid()) {
        const { h, s, v, a } = c.toHsv();
        setHsva({ h, s, v, a });
      }
    } catch (e) {
      // ignore
    }
  };

  const updateColorFromOklch = (newOklch: string) => {
    try {
      const cleaned = newOklch.trim();
      const parsed = culoriParse(cleaned);
      if (parsed) {
        const oklchColor = culoriOklch(parsed);
        if (oklchColor) {
          const hexString = formatHex(oklchColor);
          if (hexString) {
            const result = colord(hexString);
            if (result.isValid()) {
              const { h, s, v, a } = result.toHsv();
              setHsva({ h, s, v, a });
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }
  };

  // Interaction handlers for Saturation/Value area
  const handleSaturationMove = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!saturationRef.current) return;
      const rect = saturationRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setHsva((prev) => ({ ...prev, s: x * 100, v: (1 - y) * 100 }));
    },
    []
  );

  const handleHueMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHsva((prev) => ({ ...prev, h: x * 360 }));
  }, []);

  const onMouseDownSaturation = (e: React.MouseEvent) => {
    handleSaturationMove(e);
    const onMouseMove = (moveEvent: MouseEvent) =>
      handleSaturationMove(moveEvent);
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseDownHue = (e: React.MouseEvent) => {
    handleHueMove(e);
    const onMouseMove = (moveEvent: MouseEvent) => handleHueMove(moveEvent);
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="mt-6 flex flex-col gap-6">
      <PrivacyAlert>
        Colors are processed entirely in your browser.
      </PrivacyAlert>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Visual Picker Side */}
        <div className="flex flex-col gap-4">
          {/* Saturation/Value Area */}
          <div
            ref={saturationRef}
            className="relative aspect-video w-full cursor-crosshair overflow-hidden rounded-xl"
            style={{ backgroundColor: `hsl(${hsva.h}, 100%, 50%)` }}
            onMouseDown={onMouseDownSaturation}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

            {/* The Cursor */}
            <div
              className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
              style={{
                left: `${hsva.s}%`,
                top: `${100 - hsva.v}%`,
                backgroundColor: hex,
              }}
            />
          </div>

          {/* Hue Slider */}
          <div
            ref={hueRef}
            className="relative h-6 w-full cursor-pointer overflow-visible rounded-full"
            style={{
              background:
                "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
            }}
            onMouseDown={onMouseDownHue}
          >
            <div
              className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-900 bg-white shadow-lg"
              style={{ left: `${(hsva.h / 360) * 100}%` }}
            />
          </div>

          {/* Current Color Preview & Random Button */}
          <div className="mt-2 flex items-center justify-between gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/40 p-3">
            <div className="flex items-center gap-4">
              <div
                className="h-16 w-16 rounded-xl border border-zinc-800 shadow-inner"
                style={{ backgroundColor: hex }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-400">
                  Selected Color
                </span>
                <span className="font-mono text-xl font-bold uppercase text-zinc-100">
                  {hex}
                </span>
              </div>
            </div>

            <button
              id="random-color-btn"
              onClick={() =>
                setHsva({ h: Math.random() * 360, s: 70, v: 90, a: 1 })
              }
              className="flex h-fit items-center gap-2 rounded-lg bg-zinc-800 px-4 py-3 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700"
            >
              <RefreshCw size={18} />
              Random Color
            </button>
          </div>
        </div>

        {/* Inputs Side */}
        <div className="flex flex-col gap-6">
          {/* Main HEX Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              HEX Code
            </label>
            <div className="group relative flex items-center">
              <input
                type="text"
                value={hex}
                onChange={(e) => updateColorFromHex(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 font-mono text-zinc-100 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <button
                onClick={() => handleCopy(hex, "hex")}
                className="absolute right-3 rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-sky-500/10 hover:text-sky-500"
                title="Copy HEX"
              >
                {copyStatus["hex"] ? (
                  <CheckCheck size={18} className="text-emerald-500" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* RGB */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                RGB
              </label>
              <div className="group relative flex items-center">
                <input
                  type="text"
                  value={rgb}
                  onChange={(e) => updateColorFromRgb(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 font-mono text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                />
                <button
                  onClick={() => handleCopy(rgb, "rgb")}
                  className="absolute right-2 rounded-md p-1 text-zinc-500 transition-colors hover:text-sky-500"
                >
                  {copyStatus["rgb"] ? (
                    <CheckCheck size={16} className="text-emerald-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* CMYK */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                CMYK
              </label>
              <div className="group relative flex items-center">
                <input
                  type="text"
                  value={cmyk}
                  onChange={(e) => updateColorFromCmyk(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 font-mono text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                />
                <button
                  onClick={() => handleCopy(cmyk, "cmyk")}
                  className="absolute right-2 rounded-md p-1 text-zinc-500 transition-colors hover:text-sky-500"
                >
                  {copyStatus["cmyk"] ? (
                    <CheckCheck size={16} className="text-emerald-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* HSL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                HSL
              </label>
              <div className="group relative flex items-center">
                <input
                  type="text"
                  value={hsl}
                  readOnly
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 font-mono text-sm text-zinc-200 focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(hsl, "hsl")}
                  className="absolute right-2 rounded-md p-1 text-zinc-500 transition-colors hover:text-sky-500"
                >
                  {copyStatus["hsl"] ? (
                    <CheckCheck size={16} className="text-emerald-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* HSV */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                HSV
              </label>
              <div className="group relative flex items-center">
                <input
                  type="text"
                  value={hsv}
                  readOnly
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 font-mono text-sm text-zinc-200 focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(hsv, "hsv")}
                  className="absolute right-2 rounded-md p-1 text-zinc-500 transition-colors hover:text-sky-500"
                >
                  {copyStatus["hsv"] ? (
                    <CheckCheck size={16} className="text-emerald-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* OKLCH */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                OKLCH
              </label>
              <div className="group relative flex items-center">
                <input
                  id="oklch-input"
                  type="text"
                  value={oklchValue}
                  onChange={(e) => updateColorFromOklch(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 font-mono text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                />
                <button
                  onClick={() => handleCopy(oklchValue, "oklch")}
                  className="absolute right-2 rounded-md p-1 text-zinc-500 transition-colors hover:text-sky-500"
                >
                  {copyStatus["oklch"] ? (
                    <CheckCheck size={16} className="text-emerald-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
