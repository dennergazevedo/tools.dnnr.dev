"use client";

import { Button } from "@/components/Button";
import * as FileInput from "@/components/Form/FileInput";
import { Textarea } from "@/components/Form/Textarea";
import { FormEvent, useCallback, useState } from "react";
import { Eraser, Flame, DownloadCloud, CheckCheck, Copy } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { downloadFile, jsonToCSV } from "./converter";

export function JSONCSV() {
  const [entryData, setEntryData] = useState<string>("");
  const [convertedData, setConvertedData] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const handleCopyToClipboard = useCallback(async () => {
    setCopySuccess(await copyToClipboard(convertedData));
  }, [convertedData]);

  const handleConvert = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setReset(false);
      try {
        const csv = jsonToCSV(JSON.parse(entryData));
        if (csv) {
          setConvertedData(csv);
        }
      } catch (err) {
        console.log("[!] Convert:", err);
      }
    },
    [entryData]
  );

  const handleDownload = useCallback(() => {
    try {
      downloadFile("converted-json-csv-dnnr-dev", convertedData, "text/csv");
    } catch (err) {
      console.log("[!] Download:", err);
    }
  }, [convertedData]);

  const handleClear = useCallback(() => {
    setEntryData("");
    setConvertedData("");
    setCopySuccess(false);
    setReset(true);
  }, []);

  return (
    <form
      id="settings"
      onSubmit={handleConvert}
      className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
    >
      <div className="grid gap-3 pt-5 lg:grid-cols-form">
        <label
          htmlFor="projects"
          className="flex flex-col text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-100"
        >
          JSON to CSV
          <span className="text-sm font-normal text-zinc-500">
            Convert JSON files to CSV in one click
          </span>
        </label>
      </div>
      <div className="flex flex-row items-center gap-4 pt-4">
        <Textarea
          name="entryText"
          id="entryTextToEncode"
          placeholder="Entry your JSON here..."
          value={entryData}
          onChange={(event) => setEntryData(event.target.value)}
        />
        <span className="text-zinc-500">or</span>
        <FileInput.Root
          id="csv-json"
          className="flex flex-col items-start gap-5 lg:flex-row"
        >
          <FileInput.TriggerSelected reset={reset} />
          <FileInput.JSONPreview sendData={setEntryData} />
          <FileInput.Trigger type="JSON file" />
          <FileInput.Control accept=".json,application/json" />
        </FileInput.Root>
      </div>

      <div className="flex items-center justify-start gap-2 pt-5">
        <Button
          type="submit"
          form="settings"
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

      {convertedData ? (
        <>
          <div className="flex flex-row items-center gap-4 pt-4">
            <Textarea
              name="convertedText"
              id="convertedText"
              defaultValue={convertedData}
              disabled
            />
          </div>
          <div className="flex items-center justify-start gap-2 pt-5">
            <Button
              type="submit"
              form="settings"
              variant="primary"
              className="flex flex-row gap-2"
              onClick={handleDownload}
            >
              <DownloadCloud className="h-5 w-5 flex-shrink-0 text-white" />
              Download
            </Button>
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
      ) : (
        <></>
      )}
    </form>
  );
}
