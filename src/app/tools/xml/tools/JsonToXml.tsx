"use client";

import { useState } from "react";
import { XmlConverter } from "./XmlConverter";
import { CheckboxOption, IndentSelect } from "./options";
import { jsonToXml } from "./converter";

export function JsonToXml() {
  const [indent, setIndent] = useState<string>("  ");
  const [rootName, setRootName] = useState<string>("root");
  const [declaration, setDeclaration] = useState<boolean>(true);

  return (
    <XmlConverter
      id="jsontoxml"
      title="JSON to XML"
      description='Keys starting with "@" become attributes and "#text" becomes text content'
      placeholder='{ "user": { "@id": 1, "name": "John" } }'
      errorTitle="Invalid JSON"
      options={
        <>
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            Root element
            <input
              type="text"
              value={rootName}
              onChange={(event) => setRootName(event.target.value)}
              className="w-28 rounded-lg border border-border bg-neutral-900/50 px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-primary"
            />
          </label>
          <IndentSelect value={indent} onChange={setIndent} />
          <CheckboxOption
            label="XML declaration"
            checked={declaration}
            onChange={setDeclaration}
          />
        </>
      }
      actions={[
        {
          label: "Convert",
          run: (input) =>
            jsonToXml(input, {
              rootName: rootName.trim() || "root",
              indent,
              declaration,
            }),
        },
      ]}
    />
  );
}
