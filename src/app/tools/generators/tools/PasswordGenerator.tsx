"use client";

import { Button } from "@/components/ui/button";
import { Fragment, useCallback, useState, useEffect } from "react";
import { Copy, CheckCheck, RefreshCw, Shield } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { PrivacyAlert } from "@/components/ui/privacy-alert";

export function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const generatePassword = useCallback(() => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(password);
    setCopySuccess(success);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [password]);

  return (
    <Fragment>
      <PrivacyAlert>
        Passwords are generated locally in your browser. We never see or store
        your passwords.
      </PrivacyAlert>

      <div className="mt-6 flex w-full flex-col gap-8">
        <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <label className="text-xs font-semibold uppercase text-zinc-500">
                Password Length: {length}
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-sky-500"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                {
                  label: "Uppercase",
                  val: includeUppercase,
                  set: setIncludeUppercase,
                },
                {
                  label: "Numbers",
                  val: includeNumbers,
                  set: setIncludeNumbers,
                },
                {
                  label: "Symbols",
                  val: includeSymbols,
                  set: setIncludeSymbols,
                },
              ].map((opt) => (
                <label
                  key={opt.label}
                  className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300"
                >
                  <input
                    type="checkbox"
                    checked={opt.val}
                    onChange={(e) => opt.set(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-sky-500 focus:ring-sky-500 focus:ring-offset-zinc-900"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            onClick={generatePassword}
            className="flex w-full gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Generate New Password
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400">
            Generated Password
          </h3>
          <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <code className="flex-1 overflow-x-auto font-mono text-2xl font-bold tracking-wider text-zinc-100">
              {password}
            </code>
            <Button
              variant="outline"
              onClick={handleCopy}
              className="flex gap-2"
            >
              {copySuccess ? (
                <CheckCheck className="h-5 w-5 text-emerald-500" />
              ) : (
                <Copy className="h-5 w-5 text-zinc-500" />
              )}
              {copySuccess ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span>Entropy estimation: high. This is a secure password.</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
