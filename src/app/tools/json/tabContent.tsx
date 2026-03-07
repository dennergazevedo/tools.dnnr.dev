import { JsonToTS } from "./tools/JsonToTS";
import { JSONValidator } from "./tools/jsonvalidator";
import { JWTDecoder } from "./tools/jwtDecoder";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "jsonvalidator":
      return <JSONValidator />;

    case "jsonts":
      return <JsonToTS />;

    case "jwt":
      return <JWTDecoder />;

    default:
      return <JSONValidator />;
  }
}
