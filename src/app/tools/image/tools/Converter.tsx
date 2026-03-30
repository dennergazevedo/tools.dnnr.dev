"use client";

import { Button } from "@/components/ui/button";
import { Fragment, useState, useRef, useCallback } from "react";
import { Upload, Download, RefreshCw, FileImage, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PrivacyAlert } from "@/components/ui/privacy-alert";

const SUPPORTED_FORMATS = [
  { label: "PNG", value: "image/png", ext: "png" },
  { label: "JPEG", value: "image/jpeg", ext: "jpg" },
  { label: "WEBP", value: "image/webp", ext: "webp" },
];

import { motion, AnimatePresence } from "framer-motion";

export function Converter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("image/png");
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
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
      setConvertedUrl(null);
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
      setConvertedUrl(null);
    }
  };

  const convertImage = useCallback(async () => {
    if (!selectedFile) return;

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

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setConvertedUrl(url);
          setIsProcessing(false);
          toast.success("Image converted successfully!");
        }
      }, outputFormat);
    } catch (error) {
      console.error(error);
      toast.error("Failed to convert image.");
      setIsProcessing(false);
    }
  }, [selectedFile, previewUrl, outputFormat]);

  const downloadImage = () => {
    if (!convertedUrl) return;
    const link = document.createElement("a");
    const format = SUPPORTED_FORMATS.find((f) => f.value === outputFormat);
    link.href = convertedUrl;
    link.download = `converted-image.${format?.ext || "png"}`;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setConvertedUrl(null);
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
              className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/20 p-12 transition-all hover:border-sky-500/50 hover:bg-zinc-900/40"
            >
              <div className="rounded-full bg-zinc-800 p-4 transition-transform group-hover:scale-110">
                <Upload className="h-8 w-8 text-zinc-400 group-hover:text-sky-400" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-zinc-200">
                  Click or drag image here
                </p>
                <p className="text-sm text-zinc-500">
                  Supports PNG, JPG, WEBP, and more
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
              </div>

              <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                    Settings
                  </h3>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-500">
                      Output Format
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {SUPPORTED_FORMATS.map((format) => (
                        <button
                          key={format.value}
                          onClick={() => {
                            setOutputFormat(format.value);
                            setConvertedUrl(null);
                          }}
                          className={`rounded-lg border p-3 text-sm font-medium transition-all ${
                            outputFormat === format.value
                              ? "border-sky-500 bg-sky-500/10 text-sky-400"
                              : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                          }`}
                        >
                          {format.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  {!convertedUrl ? (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={convertImage}
                      disabled={isProcessing}
                      className="w-full gap-2 py-6 text-lg"
                    >
                      {isProcessing ? (
                        <RefreshCw className="h-5 w-5 animate-spin" />
                      ) : (
                        <RefreshCw className="h-5 w-5" />
                      )}
                      {isProcessing ? "Converting..." : "Convert Image"}
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-4 text-emerald-400">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Ready to download!</span>
                      </div>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={downloadImage}
                        className="w-full gap-2 py-6 text-lg bg-emerald-600 hover:bg-emerald-500 border-emerald-500"
                      >
                        <Download className="h-5 w-5" />
                        Download Image
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setConvertedUrl(null)}
                        className="w-full"
                      >
                        Back to Settings
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Fragment>
  );
}
