import { CSVJSON } from "./tools/csvjson";
import { JSONCSV } from "./tools/jsoncsv";
import { JSONValidator } from "./tools/jsonvalidator";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "jsoncsv":
      return <JSONCSV />;

    case "csvjson":
      return <CSVJSON />;

    case "jsonvalidator":
      return <JSONValidator />;

    default:
      return <JSONCSV />;
  }
}
