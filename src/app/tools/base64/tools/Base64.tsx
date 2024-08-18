"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/Form/Textarea";
import { FormEvent, Fragment, MouseEvent, useCallback, useState } from "react";
import { Copy, CheckCheck, ShieldCheck } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ToBase64() {
  const [entryText, setEntryText] = useState<string>("");
  const [convertedText, setConvertedText] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleEncode = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try{
        setConvertedText(btoa(entryText));
      }catch(err){
        console.log("[!] Encode:", err)
        setConvertedText(entryText);
      }
    },
    [entryText]
  );

  const handleDecode = useCallback(() => {
    try{
      setConvertedText(atob(entryText));
    }catch(err){
      console.log("[!] Decode:", err);
      setConvertedText(entryText);
    }
  },[entryText]);

  const handleCopyToClipboard = useCallback(async () => {
    setCopySuccess(await copyToClipboard(convertedText));
  }, [convertedText]);

  return (
    <Fragment>
      <Alert className="mt-12">
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>Rest assured!</AlertTitle>
        <AlertDescription>
          Your conversions/files are processed locally and will not be saved when using this tool.
        </AlertDescription>
      </Alert>
      <form
        id="encodeToBase64"
        onSubmit={handleEncode}
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-800"
      >
        <div className="grid gap-3 pt-5 lg:grid-cols-form">
          <label
            htmlFor="bio"
            className="flex flex-col text-sm font-medium leading-relaxed text-zinc-100"
          >
            Encode or Decode to Base64 format
            <span className="text-sm font-normal text-zinc-400">
              Enter your data
            </span>
          </label>
        </div>
        <Textarea
          name="entryText"
          id="entryTextToEncode"
          placeholder="Entry your text here..."
          value={entryText}
          onChange={(event) => setEntryText(event.target.value)}
        />

        <div className="flex items-center justify-start gap-2 pt-5">
          <Button type="submit" form="encodeToBase64" variant="primary">
            Encode
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleDecode}
          >
            Decode
          </Button>
        </div>

        {convertedText.length ? (
          <>
            <Textarea
              name="convertedText"
              id="convertedTextToEncode"
              value={convertedText}
              onChange={(event) => setConvertedText(event.target.value)}
            />
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
        ) : (
          <Fragment />
        )}
      </form>
    </Fragment>
  );
}
