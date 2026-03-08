"use client";

import { useState, useCallback, useEffect } from "react";
import { RefreshCw, Lock, Unlock, Save, Trash2 } from "lucide-react";
import { useAuth } from "@/app/auth/context";
import { api } from "@/utils/request";
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface PaletteColor {
  hex: string;
  isLocked: boolean;
}

export function PaletteGenerator() {
  const { user } = useAuth();
  const [colors, setColors] = useState<PaletteColor[]>([]);
  const [paletteName, setPaletteName] = useState("");
  const [savedPalettes, setSavedPalettes] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const generateRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  const generatePalette = useCallback(() => {
    setColors((prevColors) => {
      if (prevColors.length === 0) {
        return Array.from({ length: 5 }, () => ({
          hex: generateRandomColor(),
          isLocked: false,
        }));
      }
      return prevColors.map((color) =>
        color.isLocked ? color : { ...color, hex: generateRandomColor() }
      );
    });
  }, []);

  useEffect(() => {
    generatePalette();
  }, [generatePalette]);

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, isLocked: !c.isLocked } : c))
    );
  };

  const handleSavePalette = async () => {
    if (!paletteName.trim()) {
      toast.error("Please enter a name for your palette.");
      return;
    }

    setIsSaving(true);
    try {
      await api.post("/api/color-palette/save", {
        name: paletteName,
        colors: colors.map((c) => c.hex),
      });
      toast.success("Palette saved successfully!");
      setPaletteName("");
      fetchSavedPalettes();
    } catch (error) {
      toast.error("Failed to save palette.");
    } finally {
      setIsSaving(false);
    }
  };

  const fetchSavedPalettes = useCallback(async () => {
    if (user?.id) {
      try {
        const { data } = await api.get("/api/color-palette/list");
        setSavedPalettes(data.data);
      } catch (error) {
        console.error("Error fetching palettes:", error);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    fetchSavedPalettes();
  }, [fetchSavedPalettes]);

  const handleDeletePalette = async (id: string) => {
    try {
      await api.delete("/api/color-palette/delete", {
        data: { id },
      });
      toast.success("Palette deleted successfully!");
      fetchSavedPalettes();
    } catch (error) {
      toast.error("Failed to delete palette.");
    }
  };

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-100">Generator</h2>
          <button
            onClick={generatePalette}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700"
          >
            <RefreshCw className="h-4 w-4" />
            Generate New
          </button>
        </div>

        <div className="grid h-auto grid-cols-1 gap-2 sm:h-64 sm:grid-cols-5">
          {colors.map((color, index) => (
            <div
              key={index}
              className="group relative flex h-32 flex-col items-center justify-center rounded-xl transition-all sm:h-full"
              style={{ backgroundColor: color.hex }}
            >
              <div className="flex flex-col items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => toggleLock(index)}
                  className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  {color.isLocked ? (
                    <Lock className="h-5 w-5" />
                  ) : (
                    <Unlock className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    copyToClipboard(color.hex);
                    toast.success(`Copied ${color.hex} to clipboard!`);
                  }}
                  className="text-xs font-bold text-white drop-shadow-md"
                >
                  {color.hex}
                </button>
              </div>
              <span className="absolute bottom-4 left-4 text-xs font-bold text-white/50 group-hover:hidden">
                {color.hex}
              </span>
            </div>
          ))}
        </div>

        {user?.id && (
          <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-medium text-zinc-100">Save Palette</h3>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Palette name..."
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-700"
              />
              <button
                onClick={handleSavePalette}
                disabled={isSaving}
                className="flex items-center gap-2 rounded-lg bg-zinc-100 px-6 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>

      {user?.id && savedPalettes.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-zinc-100">
            Saved Palettes
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedPalettes.map((palette) => (
              <div
                key={palette.id}
                className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-zinc-200">
                    {palette.name}
                  </span>
                  <button
                    onClick={() => handleDeletePalette(palette.id)}
                    className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-500"
                    title="Delete Palette"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex h-12 w-full overflow-hidden rounded-lg">
                  {palette.colors.map((hex: string, i: number) => (
                    <div
                      key={i}
                      className="h-full flex-1 cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: hex }}
                      onClick={() => {
                        copyToClipboard(hex);
                        toast.success(`Copied ${hex} to clipboard!`);
                      }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
