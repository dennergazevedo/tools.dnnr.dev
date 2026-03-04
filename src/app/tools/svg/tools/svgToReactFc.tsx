"use client";

import { Button } from "@/components/ui/button";
import * as FileInput from "@/components/Form/FileInput";
import { Textarea } from "@/components/Form/Textarea";
import { FormEvent, Fragment, useCallback, useState } from "react";
import { Eraser, Flame, Copy, CheckCheck, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { svgToReactFC } from "./converter";
import { copyToClipboard } from "@/utils/copyToClipboard";

import { PrivacyAlert } from "@/components/ui/privacy-alert";

export function SvgToReactFc() {
  const [entryData, setEntryData] = useState<string>("");
  const [convertedData, setConvertedData] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const handleConvert = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setReset(false);
      try {
        const reactCode = svgToReactFC(entryData);
        setConvertedData(reactCode);
      } catch (err) {
        console.log("[!] Convert:", err);
      }
    },
    [entryData]
  );

  const handleCopyToClipboard = useCallback(async () => {
    setCopySuccess(await copyToClipboard(convertedData));
    setTimeout(() => setCopySuccess(false), 2000);
  }, [convertedData]);

  const handleClear = useCallback(() => {
    setEntryData("");
    setConvertedData("");
    setCopySuccess(false);
    setReset(true);
  }, []);

  return (
    <Fragment>
      <PrivacyAlert>
        Your conversions/files are processed locally and will not be saved when
        using this tool.
      </PrivacyAlert>
      <form
        id="svgtoreactfc"
        onSubmit={handleConvert}
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-800"
      >
        <div className="grid gap-3 pt-5 lg:grid-cols-form">
          <label
            htmlFor="projects"
            className="flex flex-col text-sm font-medium leading-relaxed text-zinc-100"
          >
            SVG to ReactFC
            <span className="text-sm font-normal text-zinc-500">
              Convert SVG to React Functional Component
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
            id="svg-react"
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
            form="svgtoreactfc"
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
          <>
            <div className="flex flex-row items-center gap-4 pt-4">
              <Textarea
                name="convertedText"
                id="convertedText"
                value={convertedData}
                readOnly
                rows={15}
              />
            </div>
            <div className="flex items-center justify-start gap-2 pt-5">
              <Button
                variant="outline"
                className="flex flex-row gap-2"
                onClick={handleCopyToClipboard}
              >
                {copySuccess ? (
                  <CheckCheck className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                ) : (
                  <Copy className="h-5 w-5 flex-shrink-0 text-zinc-500" />
                )}
                Copy to clipboard
              </Button>
            </div>
          </>
        )}
      </form>
    </Fragment>
  );
}
