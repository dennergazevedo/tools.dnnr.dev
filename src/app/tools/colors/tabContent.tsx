import { ColorPicker } from "./tools/ColorPicker";
import { PaletteGenerator } from "./tools/PaletteGenerator";
import { ContrastChecker } from "./tools/ContrastChecker";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "picker":
      return <ColorPicker />;

    case "palette":
      return <PaletteGenerator />;

    case "contrast":
      return <ContrastChecker />;

    default:
      return <ColorPicker />;
  }
}
