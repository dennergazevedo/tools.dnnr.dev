"use client";

import { Button } from "@/components/ui/button";
import * as FileInput from "@/components/Form/FileInput";
import { Textarea } from "@/components/Form/Textarea";
import { FormEvent, Fragment, useCallback, useState } from "react";
import { Eraser, Flame, DownloadCloud, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { convertSvgToIco, downloadDataUrl } from "./converter";

import { PrivacyAlert } from "@/components/ui/privacy-alert";

export function SvgToIco() {
  const [entryData, setEntryData] = useState<string>("");
  const [convertedData, setConvertedData] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);

  const handleConvert = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setReset(false);
      try {
        const icoDataUrl = await convertSvgToIco(entryData);
        setConvertedData(icoDataUrl);
      } catch (err) {
        console.log("[!] Convert:", err);
      }
    },
    [entryData]
  );

  const handleDownload = useCallback(() => {
    if (convertedData) {
      downloadDataUrl("converted-icon.ico", convertedData);
    }
  }, [convertedData]);

  const handleClear = useCallback(() => {
    setEntryData("");
    setConvertedData("");
    setReset(true);
  }, []);

  return (
    <Fragment>
      <PrivacyAlert>
        Your conversions/files are processed locally and will not be saved when
        using this tool.
      </PrivacyAlert>
      <form
        id="svgtoico"
        onSubmit={handleConvert}
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-800"
      >
        <div className="grid gap-3 pt-5 lg:grid-cols-form">
          <label
            htmlFor="projects"
            className="flex flex-col text-sm font-medium leading-relaxed text-zinc-100"
          >
            SVG to ICO
            <span className="text-sm font-normal text-zinc-500">
              Convert SVG files to ICO (Favicon)
            </span>
          </label>
        </div>
        <div className="flex flex-row items-center gap-4 pt-4">
          <Textarea
            name="entryText"
            id="entryText"
            placeholder="Paste your SVG code here..."
            value={entryData}
            onChange={(event) => setEntryData(event.target.value)}
          />
          <span className="text-zinc-500">or</span>
          <FileInput.Root
            id="svg-ico"
            className="flex flex-col items-start gap-5 lg:flex-row"
          >
            <FileInput.TriggerSelected reset={reset} />
            <FileInput.JSONPreview sendData={setEntryData} />
            <FileInput.Trigger type="SVG file" />
            <FileInput.Control accept="image/svg+xml" />
          </FileInput.Root>
        </div>

        <div className="flex items-center justify-start gap-2 pt-5">
          <Button
            type="submit"
            form="svgtoico"
            variant="primary"
            className="flex flex-row gap-2"
          >
            <Flame className="h-5 w-5 flex-shrink-0 text-white" />
            Convert
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex flex-row gap-2"
            onClick={handleClear}
          >
            <Eraser className="h-5 w-5 flex-shrink-0 text-zinc-500" />
            Clear
          </Button>
        </div>

        {convertedData && (
          <div className="flex flex-col items-center gap-4 pt-8">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <img
                src={convertedData}
                alt="Converted"
                className="h-16 w-16 object-contain"
              />
            </div>
            <Button
              type="button"
              variant="primary"
              className="flex flex-row gap-2"
              onClick={handleDownload}
            >
              <DownloadCloud className="h-5 w-5 flex-shrink-0 text-white" />
              Download ICO
            </Button>
          </div>
        )}
      </form>
    </Fragment>
  );
}
