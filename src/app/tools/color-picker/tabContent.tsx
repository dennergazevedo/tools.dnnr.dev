import { ColorPicker } from "./tools/ColorPicker";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "picker":
      return <ColorPicker />;

    default:
      return <ColorPicker />;
  }
}
