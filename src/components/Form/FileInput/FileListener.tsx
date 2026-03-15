"use client";

import { useFileInput } from "./Root";
import { useEffect } from "react";

export interface FileListenerProps {
  onFileChange: (file: File | null) => void;
}

export function FileListener({ onFileChange }: FileListenerProps) {
  const { files } = useFileInput();

  useEffect(() => {
    if (files.length === 0) {
      onFileChange(null);
      return;
    }
    
    // Pass the first file to the parent directly
    onFileChange(files[0]);
  }, [files, onFileChange]);

  return <></>;
}
