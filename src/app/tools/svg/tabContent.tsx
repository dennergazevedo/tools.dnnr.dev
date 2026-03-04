import { SvgToPng } from "./tools/svgToPng";
import { SvgToIco } from "./tools/svgToIco";
import { SvgToWebp } from "./tools/svgToWebp";
import { SvgToReactFc } from "./tools/svgToReactFc";

interface TabContentProps {
  currentTab: string;
}

export function TabContent({ currentTab }: TabContentProps) {
  switch (currentTab) {
    case "svgtopng":
      return <SvgToPng />;

    case "svgtoico":
      return <SvgToIco />;

    case "svgtowebp":
      return <SvgToWebp />;

    case "svgtoreactfc":
      return <SvgToReactFc />;

    default:
      return <SvgToPng />;
  }
}
