import { ColorPicker } from "./tools/ColorPicker";
import { PaletteGenerator } from "./tools/PaletteGenerator";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "picker":
      return <ColorPicker />;

    case "palette":
      return <PaletteGenerator />;

    default:
      return <ColorPicker />;
  }
}
