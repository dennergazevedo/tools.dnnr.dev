"use client";

import { Button } from "@/components/Button";
import { Textarea } from "@/components/Form/Textarea";
import { FormEvent, Fragment, MouseEvent, useCallback, useState } from "react";
import { Copy, CheckCheck } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";

export function EncodeDecodeURI() {
  const [entryText, setEntryText] = useState<string>("");
  const [convertedText, setConvertedText] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleEncode = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        setConvertedText(encodeURI(entryText));
      } catch (err) {
        console.log("[!] Encode:", err);
        setConvertedText(entryText);
      }
    },
    [entryText]
  );

  const handleEncodeComponent = useCallback(() => {
    try {
      setConvertedText(encodeURIComponent(entryText));
    } catch (err) {
      console.log("[!] Encode:", err);
      setConvertedText(entryText);
    }
  }, [entryText]);

  const handleDecode = useCallback(() => {
    try {
      setConvertedText(decodeURI(entryText));
    } catch (err) {
      console.log("[!] Decode:", err);
      setConvertedText(entryText);
    }
  }, [entryText]);

  const handleDecodeComponent = useCallback(() => {
    try {
      setConvertedText(decodeURIComponent(entryText));
    } catch (err) {
      console.log("[!] Decode:", err);
      setConvertedText(entryText);
    }
  }, [entryText]);

  const handleCopyToClipboard = useCallback(async () => {
    setCopySuccess(await copyToClipboard(convertedText));
  }, [convertedText]);

  return (
    <form
      id="encodeToBase64"
      onSubmit={handleEncode}
      className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 divide-zinc-800"
    >
      <div className="grid gap-3 pt-5 lg:grid-cols-form">
        <label
          htmlFor="bio"
          className="flex flex-col text-sm font-medium leading-relaxed text-zinc-700 text-zinc-100"
        >
          Encode or Decode to URI-encoded format
          <span className="text-sm font-normal text-zinc-500 text-zinc-400">
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
          Encode URI
        </Button>
        <Button type="button" variant="primary" onClick={handleEncodeComponent}>
          Encode URI Component
        </Button>
        <Button type="button" variant="outline" onClick={handleDecode}>
          Decode URI
        </Button>
        <Button type="button" variant="outline" onClick={handleDecodeComponent}>
          Decode URI Component
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
  );
}
