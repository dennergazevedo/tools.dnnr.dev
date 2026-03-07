import { UUIDGenerator } from "./tools/UUIDGenerator";
import { PasswordGenerator } from "./tools/PasswordGenerator";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "uuid":
      return <UUIDGenerator />;
    case "password":
      return <PasswordGenerator />;

    default:
      return <UUIDGenerator />;
  }
}
