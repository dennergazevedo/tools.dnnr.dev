"use client";

import { Button } from "@/components/ui/button";
import * as FileInput from "@/components/Form/FileInput";
import { Textarea } from "@/components/Form/Textarea";
import { FormEvent, Fragment, useCallback, useState } from "react";
import {
  Eraser,
  Flame,
  DownloadCloud,
  CheckCheck,
  Copy,
} from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { downloadFile, sheetToJson } from "./converter";
import { PrivacyAlert } from "@/components/ui/privacy-alert";

export function SheetJSON() {
  const [entryData, setEntryData] = useState<string>("");
  const [entryFile, setEntryFile] = useState<File | null>(null);
  const [convertedData, setConvertedData] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleCopyToClipboard = useCallback(async () => {
    setCopySuccess(await copyToClipboard(convertedData));
  }, [convertedData]);

  const handleConvert = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setReset(false);
      setIsConverting(true);
      try {
        const input = entryFile || entryData;
        if (!input) return;

        const jsonData = await sheetToJson(input);
        if (jsonData) {
          setConvertedData(jsonData);
        }
      } catch (err) {
        console.log("[!] Convert:", err);
      } finally {
        setIsConverting(false);
      }
    },
    [entryData, entryFile]
  );

  const handleDownload = useCallback(() => {
    try {
      downloadFile(
        "converted-sheet-json-dnnr-dev.json",
        convertedData,
        "application/json"
      );
    } catch (err) {
      console.log("[!] Download:", err);
    }
  }, [convertedData]);

  const handleClear = useCallback(() => {
    setEntryData("");
    setEntryFile(null);
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
        id="sheetjson"
        onSubmit={handleConvert}
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-800"
      >
        <div className="grid gap-3 pt-5 lg:grid-cols-form">
          <label
            htmlFor="sheet-json"
            className="flex flex-col text-sm font-medium leading-relaxed text-zinc-100"
          >
            Planilha to JSON
            <span className="text-sm font-normal text-zinc-500">
              Convert Spreadsheets (XLS, XLSX, CSV, ODS) to JSON in one click
            </span>
          </label>
        </div>
        <div className="flex flex-row items-center gap-4 pt-4">
          <Textarea
            name="entryText"
            id="entryTextToEncode"
            placeholder="Entry your CSV or TSV data here..."
            value={entryData}
            onChange={(event) => setEntryData(event.target.value)}
            disabled={!!entryFile}
          />
          <span className="text-zinc-500">or</span>
          <FileInput.Root
            id="sheet-json"
            className="flex flex-col items-start gap-5 lg:flex-row"
          >
            <FileInput.TriggerSelected reset={reset} />
            <FileInput.FileListener onFileChange={setEntryFile} />
            <FileInput.Trigger type="Spreadsheet file" />
            <FileInput.Control accept=".csv,.tsv,.xls,.xlsx,.ods" />
          </FileInput.Root>
        </div>

        <div className="flex items-center justify-start gap-2 pt-5">
          <Button
            type="submit"
            form="sheetjson"
            variant="primary"
            className="flex flex-row gap-2"
            disabled={isConverting || (!entryData && !entryFile)}
          >
            <Flame className="h-5 w-5 flex-shrink-0 text-white" />
            {isConverting ? "Converting..." : "Convert"}
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
                type="button"
                variant="primary"
                className="flex flex-row gap-2"
                onClick={handleDownload}
              >
                <DownloadCloud className="h-5 w-5 flex-shrink-0 text-white" />
                Download
              </Button>
              <Button
                type="button"
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
    </Fragment>
  );
}
