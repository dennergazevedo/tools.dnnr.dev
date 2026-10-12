"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/Form/Textarea";
import { FormEvent, Fragment, ReactNode, useCallback, useState } from "react";
import { AlertCircle, CheckCheck, Copy, Eraser, Flame } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PrivacyAlert } from "@/components/ui/privacy-alert";

export interface ConverterAction {
  label: string;
  run: (input: string) => string;
  variant?: "primary" | "outline";
}

interface XmlConverterProps {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  errorTitle: string;
  actions: ConverterAction[];
  options?: ReactNode;
}

export function XmlConverter({
  id,
  title,
  description,
  placeholder,
  errorTitle,
  actions,
  options,
}: XmlConverterProps) {
  const [entryData, setEntryData] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const runAction = useCallback(
    (action: ConverterAction) => {
      setCopySuccess(false);
      if (!entryData.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        setOutput(action.run(entryData));
        setError(null);
      } catch (err: any) {
        setOutput("");
        setError(err?.message ?? String(err));
      }
    },
    [entryData]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      runAction(actions[0]);
    },
    [actions, runAction]
  );

  const handleClear = useCallback(() => {
    setEntryData("");
    setOutput("");
    setError(null);
    setCopySuccess(false);
  }, []);

  const handleCopyToClipboard = useCallback(async () => {
    setCopySuccess(await copyToClipboard(output));
  }, [output]);

  return (
    <Fragment>
      <PrivacyAlert>
        Your data is processed locally in your browser and never leaves your
        device.
      </PrivacyAlert>

      <form
        id={id}
        onSubmit={handleSubmit}
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-800"
      >
        <div className="grid gap-3 pt-5 lg:grid-cols-form">
          <label className="flex flex-col text-sm font-medium leading-relaxed text-zinc-100">
            {title}
            <span className="text-sm font-normal text-zinc-400">
              {description}
            </span>
          </label>
          {options && <div className="flex flex-wrap gap-4">{options}</div>}
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <Textarea
            name="entryText"
            id={`${id}-input`}
            placeholder={placeholder}
            value={entryData}
            spellCheck={false}
            className="font-mono"
            onChange={(event) => {
              setEntryData(event.target.value);
              if (error) setError(null);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-start gap-2 pt-5">
          {actions.map((action, index) => (
            <Button
              key={action.label}
              type={index === 0 ? "submit" : "button"}
              form={index === 0 ? id : undefined}
              variant={action.variant ?? (index === 0 ? "primary" : "outline")}
              className="flex flex-row gap-2"
              onClick={index === 0 ? undefined : () => runAction(action)}
            >
              {index === 0 && <Flame className="h-5 w-5 flex-shrink-0" />}
              {action.label}
            </Button>
          ))}
          <Button
            type="button"
            variant="outline"
            className="flex flex-row gap-2"
            onClick={handleClear}
          >
            <Eraser className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
            Clear
          </Button>
        </div>

        {error && (
          <div className="animate-in slide-in-from-top-2 pt-5 duration-300">
            <Alert
              variant="destructive"
              className="border-destructive/20 bg-destructive/10 text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold">{errorTitle}</AlertTitle>
              <AlertDescription>
                <pre className="whitespace-pre-wrap font-mono text-xs">
                  {error}
                </pre>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {output && (
          <div className="flex flex-col gap-4 pt-5">
            <Textarea
              name="output"
              id={`${id}-output`}
              value={output}
              spellCheck={false}
              readOnly
              className="min-h-[320px] font-mono"
            />
            <div className="flex items-center justify-start gap-2">
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
          </div>
        )}
      </form>
    </Fragment>
  );
}
