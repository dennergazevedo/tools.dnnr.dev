"use client";

import { useState } from "react";
import { XmlConverter } from "./XmlConverter";
import { IndentSelect } from "./options";
import { beautifyXml, minifyXml } from "./converter";

export function XmlBeautify() {
  const [indent, setIndent] = useState<string>("  ");

  return (
    <XmlConverter
      id="xmlbeautify"
      title="XML Beautify"
      description="Paste your XML below to format or minify it"
      placeholder='<root><item id="1">value</item></root>'
      errorTitle="Invalid XML"
      options={<IndentSelect value={indent} onChange={setIndent} />}
      actions={[
        { label: "Beautify", run: (input) => beautifyXml(input, indent) },
        { label: "Minify", run: minifyXml },
      ]}
    />
  );
}
