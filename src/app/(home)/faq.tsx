"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Why use dnnr.dev?",
    a: "Built by devs for devs: no intrusive ads, no data collection, no mandatory registration. All tools work directly in the browser, providing instant results without requiring an external server or internet connection.",
  },
  {
    q: "Is my data sent to any server?",
    a: "No. All processing happens locally in your browser. API secrets, passwords, confidential JSONs, and any other data you enter never leave your machine — except in intentional storage tools (To-Do and Bookmarks), which only sync with your account if you are logged in.",
  },
  {
    q: "Do I need to create an account to use the tools?",
    a: "No. The vast majority of the tools work without any registration. Creating an account is optional and serves only to sync data between devices in tools like To-Do and Bookmarks.",
  },
  {
    q: "Do the tools work offline?",
    a: "Yes! Once the page is loaded, tools like Base64, URI Encoder, JSON Validator, Diff Checker, and others work completely offline. Only cloud-sync features require a connection.",
  },
  {
    q: "How often are new tools added?",
    a: "dnnr.dev is actively developed. New tools are added based on the needs of users and the community. If you have a suggestion, feel free to reach out!",
  },
  {
    q: "Are the tools free?",
    a: "Yes, completely free. The goal of dnnr.dev is to be an accessible resource for all developers, with no paid plans or hidden features.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-3 mt-12">
      <div className="flex items-center gap-4">
        <h2 className="whitespace-nowrap text-xl font-semibold text-zinc-100">
          Frequently Asked Questions
        </h2>
        <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>
      <span className="text-sm text-zinc-500 mb-4">
        Quick answers to the most common questions about tools.dnnr.dev. 
        Our goal is to make using the tools simple and straightforward, 
        so we've gathered everything you need to know here. If you still have questions, 
        you can freely explore the tools or contact us to learn more.
      </span>
      <div className="flex flex-col divide-y divide-zinc-800/60 overflow-hidden">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-0 py-3 text-left transition-colors hover:bg-zinc-900/40"
            >
              <span className="text-sm font-medium text-zinc-200">{item.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && (
              <p className="px-4 pb-4 pt-1 text-xs leading-relaxed text-zinc-500">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
