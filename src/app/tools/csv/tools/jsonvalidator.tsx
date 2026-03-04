"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/Form/Textarea";
import { FormEvent, Fragment, useCallback, useState } from "react";
import {
  Eraser,
  Flame,
  CheckCheck,
  Copy,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ValidationError {
  message: string;
  line?: number;
  column?: number;
  suggestion?: string;
}

export function JSONValidator() {
  const [entryData, setEntryData] = useState<string>("");
  const [error, setError] = useState<ValidationError | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleCopyToClipboard = useCallback(async () => {
    setCopySuccess(await copyToClipboard(entryData));
  }, [entryData]);

  const validateJSON = (jsonString: string) => {
    try {
      if (!jsonString.trim()) {
        setError(null);
        setIsValid(false);
        return;
      }
      JSON.parse(jsonString);
      setError(null);
      setIsValid(true);
    } catch (e: any) {
      setIsValid(false);
      const message = e.message;
      let line, column;

      // Try to extract position from V8 error message: "at position 123"
      const posMatch = message.match(/at position (\d+)/);
      if (posMatch) {
        const position = parseInt(posMatch[1], 10);
        const beforeError = jsonString.substring(0, position);
        const lines = beforeError.split("\n");
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }

      let suggestion = "";
      if (message.includes("Unexpected token ' in JSON")) {
        suggestion =
          "JSON requires double quotes (\") for keys and string values instead of single quotes (').";
      } else if (
        message.includes("Unexpected token ]") ||
        message.includes("Unexpected token }")
      ) {
        suggestion =
          "Check for trailing commas before closing brackets or braces.";
      } else if (message.includes("Unexpected identifier")) {
        suggestion = 'Keys must be enclosed in double quotes (").';
      }

      setError({
        message: message.replace(/at position \d+/, "").trim(),
        line,
        column,
        suggestion,
      });
    }
  };

  const handleValidate = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      validateJSON(entryData);
    },
    [entryData]
  );

  const handleClear = useCallback(() => {
    setEntryData("");
    setError(null);
    setIsValid(false);
    setCopySuccess(false);
  }, []);

  return (
    <Fragment>
      <Alert className="mt-12 border-neutral-800 bg-neutral-900/50">
        <ShieldCheck className="h-4 w-4 text-sky-500" />
        <AlertTitle className="text-foreground">Private & Secure</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Your JSON is validated locally in your browser and never leaves your
          device.
        </AlertDescription>
      </Alert>

      <form
        id="jsonvalidator"
        onSubmit={handleValidate}
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-neutral-800"
      >
        <div className="grid gap-3 pt-5 lg:grid-cols-form">
          <label className="flex flex-col text-sm font-medium leading-relaxed text-foreground">
            JSON Validator
            <span className="text-sm font-normal text-muted-foreground">
              Paste your JSON below to check for errors
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <Textarea
            name="entryText"
            id="jsonInput"
            placeholder='{ "key": "value" }'
            value={entryData}
            onChange={(event) => {
              setEntryData(event.target.value);
              if (error || isValid) {
                setError(null);
                setIsValid(false);
              }
            }}
          />
        </div>

        <div className="flex items-center justify-start gap-2 pt-5">
          <Button
            type="submit"
            form="jsonvalidator"
            variant="primary"
            className="flex flex-row gap-2"
          >
            <Flame className="h-5 w-5 flex-shrink-0" />
            Validate JSON
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex flex-row gap-2"
            onClick={handleClear}
          >
            <Eraser className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
            Clear
          </Button>
          {entryData && (
            <Button
              type="button"
              variant="ghost"
              className="ml-auto flex flex-row gap-2"
              onClick={handleCopyToClipboard}
            >
              {copySuccess ? (
                <CheckCheck className="h-5 w-5 flex-shrink-0 text-emerald-500" />
              ) : (
                <Copy className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              )}
              Copy
            </Button>
          )}
        </div>

        {isValid && (
          <div className="animate-in fade-in pt-5 duration-500">
            <Alert className="border-emerald-500/20 bg-emerald-500/10">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <AlertTitle className="font-bold text-emerald-500">
                Valid JSON
              </AlertTitle>
              <AlertDescription className="text-emerald-500/80">
                The provided JSON string is syntactically correct!
              </AlertDescription>
            </Alert>
          </div>
        )}

        {error && (
          <div className="animate-in slide-in-from-top-2 pt-5 duration-300">
            <Alert
              variant="destructive"
              className="border-destructive/20 bg-destructive/10 text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold">Invalid JSON</AlertTitle>
              <AlertDescription className="space-y-3">
                <p className="font-medium">{error.message}</p>

                {error.line !== undefined && (
                  <div className="flex gap-4 rounded border border-destructive/10 bg-destructive/5 p-2 font-mono text-xs">
                    <span>
                      Line:{" "}
                      <span className="font-bold text-white">{error.line}</span>
                    </span>
                    <span>
                      Column:{" "}
                      <span className="font-bold text-white">
                        {error.column}
                      </span>
                    </span>
                  </div>
                )}

                {error.suggestion && (
                  <div className="rounded-lg border border-neutral-700 bg-neutral-800/80 p-3 text-sm">
                    <p className="mb-1 font-bold italic text-sky-400">
                      Suggestion:
                    </p>
                    <p className="text-neutral-300">{error.suggestion}</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </form>
    </Fragment>
  );
}
