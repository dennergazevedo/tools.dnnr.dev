"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Converter } from "./tools/Converter";
import { Compressor } from "./tools/Compressor";

export function TabContent() {
  return (
    <div className="mt-8 flex flex-col gap-8 pb-12">
      <Tabs.Content value="converter">
        <Converter />
      </Tabs.Content>
      <Tabs.Content value="compressor">
        <Compressor />
      </Tabs.Content>
    </div>
  );
}
