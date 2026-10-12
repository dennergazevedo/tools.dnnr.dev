"use client";

import { useState } from "react";
import { XmlConverter } from "./XmlConverter";
import { CheckboxOption } from "./options";
import { xmlToJson } from "./converter";

export function XmlToJson() {
  const [parseValues, setParseValues] = useState<boolean>(false);

  return (
    <XmlConverter
      id="xmltojson"
      title="XML to JSON"
      description='Attributes become "@name" keys and mixed text becomes "#text"'
      placeholder='<user id="1"><name>John</name></user>'
      errorTitle="Invalid XML"
      options={
        <CheckboxOption
          label="Parse numbers and booleans"
          checked={parseValues}
          onChange={setParseValues}
        />
      }
      actions={[
        { label: "Convert", run: (input) => xmlToJson(input, { parseValues }) },
      ]}
    />
  );
}
