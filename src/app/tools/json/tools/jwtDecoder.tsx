"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/Form/Textarea";
import { Fragment, useCallback, useState, useEffect } from "react";
import {
  Copy,
  CheckCheck,
  Eraser,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PrivacyAlert } from "@/components/ui/privacy-alert";

interface DecodedJWT {
  header: any;
  payload: any;
  signature: string;
}

export function JWTDecoder() {
  const [token, setToken] = useState<string>("");
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});

  const decodeToken = useCallback((jwt: string) => {
    if (!jwt.trim()) {
      setDecoded(null);
      setError(null);
      return;
    }

    const parts = jwt.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT: A JWT must have 3 parts separated by dots.");
      setDecoded(null);
      return;
    }

    try {
      const header = JSON.parse(
        atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"))
      );
      const payload = JSON.parse(
        atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
      const signature = parts[2];

      setDecoded({ header, payload, signature });
      setError(null);
    } catch (e) {
      setError("Invalid JWT: Failed to decode base64 content.");
      setDecoded(null);
    }
  }, []);

  useEffect(() => {
    decodeToken(token);
  }, [token, decodeToken]);

  const handleClear = useCallback(() => {
    setToken("");
    setDecoded(null);
    setError(null);
  }, []);

  const handleCopy = useCallback(async (content: any, key: string) => {
    const text =
      typeof content === "string" ? content : JSON.stringify(content, null, 2);
    const success = await copyToClipboard(text);
    setCopySuccess((prev) => ({ ...prev, [key]: success }));
    setTimeout(() => {
      setCopySuccess((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  }, []);

  return (
    <Fragment>
      <PrivacyAlert>
        Your JWT is decoded locally in your browser. We never store or transmit
        your tokens.
      </PrivacyAlert>

      <div className="mt-6 flex w-full flex-col gap-8">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium italic text-zinc-100">
            Encoded Token
          </label>
          <Textarea
            placeholder="Paste your JWT here..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="min-h-[120px] font-mono text-sm"
          />
          <div className="flex justify-start">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex gap-2"
            >
              <Eraser className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {decoded && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                  Header
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(decoded.header, "header")}
                >
                  {copySuccess.header ? (
                    <CheckCheck className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <pre className="overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  Payload
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(decoded.payload, "payload")}
                >
                  {copySuccess.payload ? (
                    <CheckCheck className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <pre className="overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-pink-400">
                  Signature
                </h3>
              </div>
              <div className="break-all rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-500">
                {decoded.signature}
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
