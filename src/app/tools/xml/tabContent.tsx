import { XmlBeautify } from "./tools/XmlBeautify";
import { XmlToJson } from "./tools/XmlToJson";
import { JsonToXml } from "./tools/JsonToXml";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "beautify":
      return <XmlBeautify />;

    case "xmltojson":
      return <XmlToJson />;

    case "jsontoxml":
      return <JsonToXml />;

    default:
      return <XmlBeautify />;
  }
}
