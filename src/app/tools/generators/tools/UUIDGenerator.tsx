"use client";

import { Button } from "@/components/ui/button";
import { Fragment, useCallback, useState, useEffect } from "react";
import { Copy, CheckCheck, RefreshCw, Layers } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { PrivacyAlert } from "@/components/ui/privacy-alert";

export function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const handleGenerate = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  }, [count]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(uuids.join("\n"));
    setCopySuccess(success);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [uuids]);

  return (
    <Fragment>
      <PrivacyAlert>
        UUIDs are generated locally in your browser using Math.random().
      </PrivacyAlert>

      <div className="mt-6 flex w-full flex-col gap-8">
        <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase text-zinc-500">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) =>
                  setCount(
                    Math.min(50, Math.max(1, parseInt(e.target.value) || 1))
                  )
                }
                className="w-24 rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-center font-mono text-sm text-zinc-100 focus:border-sky-500 focus:outline-none"
              />
            </div>
            <Button
              variant="primary"
              onClick={handleGenerate}
              className="mt-6 flex gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              Generate
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400">
              Result
            </h3>
            {uuids.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-zinc-500"
              >
                {copySuccess ? (
                  <CheckCheck className="mr-2 h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                Copy All
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm">
            {uuids.map((uuid, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-zinc-900 py-2 last:border-0"
              >
                <span className="text-zinc-300">{uuid}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(uuid)}
                >
                  <Copy className="h-4 w-4 text-zinc-600 hover:text-zinc-400" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
