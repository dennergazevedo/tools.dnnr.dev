"use client";

import { useState } from "react";
import { colord } from "colord";
import { Check, X } from "lucide-react";

// WCAG 2.0 contrast ratio calculation
function getLuminance(hex: string) {
  const rgb = colord(hex).toRgb();
  const a = [rgb.r, rgb.g, rgb.b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(color1: string, color2: string) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (lightest + 0.05) / (darkest + 0.05);
}

export function ContrastChecker() {
  const [background, setBackground] = useState("#ffffff");
  const [foreground, setForeground] = useState("#000000");

  const ratio = getContrast(background, foreground);
  const ratioString = ratio.toFixed(2);

  const passesAANormal = ratio >= 4.5;
  const passesAALarge = ratio >= 3.0;
  const passesAAANormal = ratio >= 7.0;
  const passesAAALarge = ratio >= 4.5;

  return (
    <div className="flex w-full flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 mt-4">
      {/* Inputs Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Background Color</label>
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-md p-2">
            <input
              type="color"
              value={colord(background).toHex()}
              onChange={(e) => setBackground(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded bg-transparent border-0 p-0"
            />
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="flex-1 bg-transparent text-zinc-100 font-mono outline-none uppercase"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Foreground Color (Text)</label>
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-md p-2">
            <input
              type="color"
              value={colord(foreground).toHex()}
              onChange={(e) => setForeground(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded bg-transparent border-0 p-0"
            />
            <input
              type="text"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="flex-1 bg-transparent text-zinc-100 font-mono outline-none uppercase"
              placeholder="#000000"
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div 
        className="flex min-h-[160px] w-full items-center justify-center rounded-xl transition-colors duration-300 shadow-sm border border-zinc-800"
        style={{ backgroundColor: background }}
      >
        <div className="text-center p-6" style={{ color: foreground }}>
          <p className="text-4xl font-bold mb-2">Contrast Tester</p>
          <p className="text-lg">This is how the contrast looks in a real environment.</p>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h3 className="text-xl font-semibold text-zinc-200">Contrast Ratio</h3>
          <span className="text-3xl font-mono text-zinc-100 bg-zinc-900 px-4 py-1 border border-zinc-800 rounded-lg">
            {ratioString}:1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {/* Normal Text */}
          <div className="flex flex-col gap-3 p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40">
            <h4 className="text-zinc-300 font-medium pb-2 border-b border-zinc-800">Normal Text (14pt)</h4>
            <div className="flex items-center justify-between mt-1">
              <span className="text-zinc-400 text-sm">WCAG AA (4.5:1)</span>
              {passesAANormal ? (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" /> PASS
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-500 rounded-md text-xs font-semibold">
                  <X className="w-3.5 h-3.5" /> FAIL
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">WCAG AAA (7.0:1)</span>
              {passesAAANormal ? (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" /> PASS
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-500 rounded-md text-xs font-semibold">
                  <X className="w-3.5 h-3.5" /> FAIL
                </span>
              )}
            </div>
          </div>

          {/* Large Text */}
          <div className="flex flex-col gap-3 p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40">
            <h4 className="text-zinc-300 font-medium pb-2 border-b border-zinc-800">Large Text (18pt+)</h4>
            <div className="flex items-center justify-between mt-1">
              <span className="text-zinc-400 text-sm">WCAG AA (3.0:1)</span>
              {passesAALarge ? (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" /> PASS
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-500 rounded-md text-xs font-semibold">
                  <X className="w-3.5 h-3.5" /> FAIL
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">WCAG AAA (4.5:1)</span>
              {passesAAALarge ? (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" /> PASS
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-500 rounded-md text-xs font-semibold">
                  <X className="w-3.5 h-3.5" /> FAIL
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
