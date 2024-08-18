"use client";

import { Button } from "@/components/Button";
import * as FileInput from "@/components/Form/FileInput";
import { Textarea } from "@/components/Form/Textarea";
import { FormEvent, useCallback, useState } from "react";
import { Eraser, Flame, DownloadCloud, CheckCheck, Copy } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { csvToJson, downloadFile, jsonToCSV } from "./converter";

export function CSVJSON() {
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
        const jsonData = csvToJson(entryData);
        if (jsonData) {
          setConvertedData(jsonData);
        }
      } catch (err) {
        console.log("[!] Convert:", err);
      }
    },
    [entryData]
  );

  const handleDownload = useCallback(() => {
    try {
      downloadFile("converted-csv-json-dnnr-dev", convertedData, "application/json");
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
      id="csvjson"
      onSubmit={handleConvert}
      className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-800"
    >
      <div className="grid gap-3 pt-5 lg:grid-cols-form">
        <label
          htmlFor="projects"
          className="flex flex-col text-sm font-medium leading-relaxed text-zinc-100"
        >
          CSV to JSON
          <span className="text-sm font-normal text-zinc-500">
            Convert CSV files to JSON in one click
          </span>
        </label>
      </div>
      <div className="flex flex-row items-center gap-4 pt-4">
        <Textarea
          name="entryText"
          id="entryTextToEncode"
          placeholder="Entry your CSV here..."
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
          <FileInput.Trigger type="CSV file" />
          <FileInput.Control accept="text/csv" />
        </FileInput.Root>
      </div>

      <div className="flex items-center justify-start gap-2 pt-5">
        <Button
          type="submit"
          form="csvjson"
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
              value={convertedData}
              disabled
            />
          </div>
          <div className="flex items-center justify-start gap-2 pt-5">
            <Button
              type="submit"
              form="csvjson"
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
