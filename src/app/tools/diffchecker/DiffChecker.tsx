"use client";

import { useState, useCallback, Fragment } from "react";
import { Textarea } from "@/components/Form/Textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  GitCompare,
  Eraser,
  Copy,
  CheckCheck,
  ShieldCheck,
  Split,
} from "lucide-react";
import { diffLines, Change } from "diff";
import { copyToClipboard } from "@/utils/copyToClipboard";

export function DiffChecker() {
  const [originalText, setOriginalText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  const [diffResult, setDiffResult] = useState<Change[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCompare = useCallback(() => {
    const diff = diffLines(originalText, modifiedText);
    setDiffResult(diff);
  }, [originalText, modifiedText]);

  const handleClear = useCallback(() => {
    setOriginalText("");
    setModifiedText("");
    setDiffResult([]);
    setCopySuccess(false);
  }, []);

  const handleCopyResult = useCallback(async () => {
    const textResult = diffResult
      .map((part) =>
        part.added
          ? `+ ${part.value}`
          : part.removed
          ? `- ${part.value}`
          : `  ${part.value}`
      )
      .join("");
    setCopySuccess(await copyToClipboard(textResult));
  }, [diffResult]);

  return (
    <Fragment>
      <Alert className="mt-12 border-neutral-800 bg-neutral-900/50">
        <ShieldCheck className="h-4 w-4 text-sky-500" />
        <AlertTitle className="text-foreground">Private & Local</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Your text is compared locally in your browser and never leaves your
          device.
        </AlertDescription>
      </Alert>

      <div className="mt-6 flex w-full flex-col gap-8 divide-y divide-neutral-800">
        <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium leading-relaxed text-foreground">
              Original Text
              <span className="block text-sm font-normal text-muted-foreground">
                Paste the base version of your text here.
              </span>
            </label>
            <Textarea
              placeholder="Paste original text here..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium leading-relaxed text-foreground">
              Modified Text
              <span className="block text-sm font-normal text-muted-foreground">
                Paste the new version of your text here.
              </span>
            </label>
            <Textarea
              placeholder="Paste modified text here..."
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
        </div>

        <div className="flex items-center justify-start gap-2 pt-5">
          <Button
            onClick={handleCompare}
            variant="primary"
            className="flex flex-row gap-2"
          >
            <GitCompare className="h-5 w-5 flex-shrink-0" />
            Compare Text
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="flex flex-row gap-2"
          >
            <Eraser className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
            Clear
          </Button>
          {diffResult.length > 0 && (
            <Button
              onClick={handleCopyResult}
              variant="ghost"
              className="ml-auto flex flex-row gap-2"
            >
              {copySuccess ? (
                <CheckCheck className="h-5 w-5 flex-shrink-0 text-emerald-500" />
              ) : (
                <Copy className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              )}
              Copy Diff
            </Button>
          )}
        </div>

        {diffResult.length > 0 && (
          <div className="flex flex-col gap-4 pt-8">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Split className="h-4 w-4 text-sky-500" />
              Difference Result
            </div>
            <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 font-mono text-sm leading-relaxed">
              <div className="flex flex-col">
                {diffResult.map((part, index) => (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap px-4 py-0.5 ${
                      part.added
                        ? "bg-emerald-500/10 text-emerald-400"
                        : part.removed
                        ? "bg-red-500/10 text-red-400"
                        : "text-neutral-400"
                    }`}
                  >
                    <span className="mr-4 inline-block w-4 shrink-0 select-none text-center opacity-50">
                      {part.added ? "+" : part.removed ? "-" : " "}
                    </span>
                    {part.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
