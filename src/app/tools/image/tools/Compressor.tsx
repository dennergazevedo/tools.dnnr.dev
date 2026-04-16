"use client";

import { Button } from "@/components/ui/button";
import { Fragment, useState, useRef, useCallback } from "react";
import { Upload, Download, RefreshCw, FileImage, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { toast } from "sonner";
import { PrivacyAlert } from "@/components/ui/privacy-alert";

const UNITS = [
  { label: "KB", value: 1024 },
  { label: "MB", value: 1024 * 1024 },
];

import { motion, AnimatePresence } from "framer-motion";

export function Compressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetSize, setTargetSize] = useState<string>("500");
  const [unit, setUnit] = useState(1024); // default KB
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCompressedUrl(null);
      setCompressedSize(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCompressedUrl(null);
      setCompressedSize(null);
    }
  };

  const compressImage = useCallback(async () => {
    if (!selectedFile) return;

    const targetBytes = parseFloat(targetSize) * unit;
    if (isNaN(targetBytes) || targetBytes <= 0) {
      toast.error("Please enter a valid target size.");
      return;
    }

    setIsProcessing(true);
    try {
      const img = new Image();
      img.src = previewUrl!;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(img, 0, 0);

      // Determine format. If PNG, we use JPEG for compression as PNG is lossless in canvas.
      const format = selectedFile.type === "image/png" ? "image/jpeg" : selectedFile.type;
      
      let low = 0.01;
      let high = 1.0;
      let bestBlob: Blob | null = null;
      let bestSize = Infinity;

      // Iterative binary search for the best quality
      for (let i = 0; i < 8; i++) {
        const mid = (low + high) / 2;
        const blob = await new Promise<Blob | null>((resolve) => 
          canvas.toBlob((b) => resolve(b), format, mid)
        );

        if (blob) {
          if (blob.size <= targetBytes) {
            bestBlob = blob;
            low = mid; // Try higher quality
          } else {
            high = mid; // Need lower quality
            if (!bestBlob || blob.size < bestBlob.size) {
                bestBlob = blob; // Keep at least one result
            }
          }
        }
      }

      if (bestBlob) {
        const url = URL.createObjectURL(bestBlob);
        setCompressedUrl(url);
        setCompressedSize(bestBlob.size);
        setIsProcessing(false);
        toast.success("Image compressed successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to compress image.");
      setIsProcessing(false);
    }
  }, [selectedFile, previewUrl, targetSize, unit]);

  const downloadImage = () => {
    if (!compressedUrl) return;
    const link = document.createElement("a");
    const ext = selectedFile?.type === "image/png" ? "jpg" : selectedFile?.type.split("/")[1] || "jpg";
    link.href = compressedUrl;
    link.download = `compressed-image.${ext}`;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setCompressedUrl(null);
    setCompressedSize(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Fragment>
      <PrivacyAlert>
        Your images are processed locally in your browser. Nothing is uploaded to our servers.
      </PrivacyAlert>

      <div className="mt-6 flex w-full flex-col gap-8">
        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="uploader"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/20 p-12 transition-all hover:border-amber-500/50 hover:bg-zinc-900/40"
            >
              <div className="rounded-full bg-zinc-800 p-4 transition-transform group-hover:scale-110">
                <Upload className="h-8 w-8 text-zinc-400 group-hover:text-amber-400" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-zinc-200">
                  Click or drag image here
                </p>
                <p className="text-sm text-zinc-500">
                  Supports PNG, JPG, WEBP
                </p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </motion.div>
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <div className="flex flex-col gap-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                  <img
                    src={previewUrl!}
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={reset}
                    className="absolute right-2 top-2 bg-black/50 text-zinc-100 hover:bg-black/70"
                  >
                    Change Image
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Original: {selectedFile.name}</span>
                  <span>{(selectedFile.size / 1024).toFixed(2)} KB</span>
                </div>

                {selectedFile.type === "image/png" && (
                  <div className="flex items-start gap-3 rounded-xl border border-amber-500/10 bg-amber-500/5 p-4 text-xs text-amber-400/80">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <p>
                      PNG files will be compressed as JPEG for better efficiency. Transparency will be lost.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                    Compression Settings
                  </h3>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-500">
                      Target File Size
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={targetSize}
                        onChange={(e) => setTargetSize(e.target.value)}
                        className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-zinc-100 focus:border-amber-500 focus:outline-none"
                      />
                      <div className="flex overflow-hidden rounded-lg border border-zinc-800">
                        {UNITS.map((u) => (
                          <button
                            key={u.label}
                            onClick={() => setUnit(u.value)}
                            className={`px-4 text-xs font-bold uppercase transition-all ${
                              unit === u.value
                                ? "bg-amber-500 text-white"
                                : "bg-zinc-950 text-zinc-500 hover:bg-zinc-900"
                            }`}
                          >
                            {u.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {compressedSize && (
                    <div className="mt-4 flex flex-col gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-400">Compressed Size:</span>
                          <span className="text-sm font-bold text-emerald-400">
                              {(compressedSize / 1024).toFixed(2)} KB
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-400">Reduction:</span>
                          <span className="text-sm font-bold text-emerald-400">
                              {((1 - compressedSize / selectedFile.size) * 100).toFixed(1)}%
                          </span>
                        </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  {!compressedUrl ? (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={compressImage}
                      disabled={isProcessing}
                      className="w-full gap-2 py-6 text-lg"
                    >
                      {isProcessing ? (
                        <RefreshCw className="h-5 w-5 animate-spin" />
                      ) : (
                        <FileImage className="h-5 w-5" />
                      )}
                      {isProcessing ? "Compressing..." : "Compress Image"}
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={downloadImage}
                        className="w-full gap-2 py-6 text-lg bg-emerald-600 hover:bg-emerald-500 border-emerald-500"
                      >
                        <Download className="h-5 w-5" />
                        Download Result
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCompressedUrl(null)}
                        className="w-full"
                      >
                        Adjust Settings
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-amber-500/10 bg-amber-500/5 p-4 text-xs text-amber-400/80">
                  <Info className="h-4 w-4 flex-shrink-0" />
                  <p>
                    The tool will try to get as close as possible to your target size without sacrificing too much quality.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Fragment>
  );
}
