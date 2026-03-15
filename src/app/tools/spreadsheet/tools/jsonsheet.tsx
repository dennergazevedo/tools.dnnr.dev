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
} from "lucide-react";
import { downloadFile, jsonToSheet } from "./converter";
import { PrivacyAlert } from "@/components/ui/privacy-alert";
import * as XLSX from "xlsx";

export function JSONSheet() {
  const [entryData, setEntryData] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<XLSX.BookType>("xlsx");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [convertedBuffer, setConvertedBuffer] = useState<ArrayBuffer | null>(null);

  const handleConvert = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setReset(false);
      try {
        if (!entryData) return;
        const buffer = jsonToSheet(entryData, outputFormat);
        if (buffer) {
          setConvertedBuffer(buffer);
        }
      } catch (err) {
        console.log("[!] Convert:", err);
      }
    },
    [entryData, outputFormat]
  );

  const handleDownload = useCallback(() => {
    try {
      if (!convertedBuffer) return;
      
      let mimeType = "application/octet-stream";
      if (outputFormat === "csv") mimeType = "text/csv";
      else if (outputFormat === "xlsx") mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      
      downloadFile(
        `converted-json-sheet-dnnr-dev.${outputFormat}`,
        convertedBuffer,
        mimeType
      );
    } catch (err) {
      console.log("[!] Download:", err);
    }
  }, [convertedBuffer, outputFormat]);

  const handleClear = useCallback(() => {
    setEntryData("");
    setConvertedBuffer(null);
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
        id="jsonsheet"
        onSubmit={handleConvert}
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-800"
      >
        <div className="grid gap-3 pt-5 lg:grid-cols-form">
          <label
            htmlFor="json-sheet"
            className="flex flex-col text-sm font-medium leading-relaxed text-zinc-100"
          >
            JSON to Planilha
            <span className="text-sm font-normal text-zinc-500">
              Convert JSON files to Spreadsheets (XLS, XLSX, CSV, ODS) in one click. Input must be a valid JSON array of objects.
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
            id="json-sheet"
            className="flex flex-col items-start gap-5 lg:flex-row"
          >
            <FileInput.TriggerSelected reset={reset} />
            <FileInput.JSONPreview sendData={setEntryData} />
            <FileInput.Trigger type="JSON file" />
            <FileInput.Control accept=".json,application/json" />
          </FileInput.Root>
        </div>

        <div className="flex flex-col items-start gap-2 pt-5">
          <label className="text-sm font-medium text-zinc-100">Select output format:</label>
          <select 
            className="w-[200px] bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-md p-2"
            value={outputFormat} 
            onChange={(e) => setOutputFormat(e.target.value as XLSX.BookType)}
          >
            <option value="xlsx">XLSX</option>
            <option value="xls">XLS</option>
            <option value="csv">CSV</option>
            <option value="ods">ODS</option>
            <option value="tsv">TSV</option>
          </select>
        </div>

        <div className="flex items-center justify-start gap-2 pt-5">
          <Button
            type="submit"
            form="jsonsheet"
            variant="primary"
            className="flex flex-row gap-2"
            disabled={!entryData}
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

        {convertedBuffer ? (
          <>
            <div className="flex bg-zinc-900/40 p-4 border border-zinc-800 rounded-md items-center gap-4 pt-4 text-emerald-400">
              <CheckCheck className="h-5 w-5 flex-shrink-0" />
              <span>Conversion successful! Ready to download.</span>
            </div>
            <div className="flex items-center justify-start gap-2 pt-5">
              <Button
                type="button"
                variant="primary"
                className="flex flex-row gap-2"
                onClick={handleDownload}
              >
                <DownloadCloud className="h-5 w-5 flex-shrink-0 text-white" />
                Download {outputFormat.toUpperCase()}
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
