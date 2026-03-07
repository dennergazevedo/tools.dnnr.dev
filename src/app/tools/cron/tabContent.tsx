import { CronGenerator } from "./tools/CronGenerator";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "generator":
      return <CronGenerator />;

    default:
      return <CronGenerator />;
  }
}
