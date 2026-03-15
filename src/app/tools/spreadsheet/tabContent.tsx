import { SheetJSON } from "./tools/sheetjson";
import { JSONSheet } from "./tools/jsonsheet";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "json-sheet":
      return <JSONSheet />;

    case "sheet-json":
      return <SheetJSON />;

    default:
      return <JSONSheet />;
  }
}
