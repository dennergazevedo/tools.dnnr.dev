import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Image } from "lucide-react";

export const metadata = {
  title: "SVG Tools - Tools",
  description: "Convert SVG to PNG, ICO, WebP and React components",
};

export default function SvgToolPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="SVG Tools"
        description="Convert your SVG files to different formats or React components easily."
        icon={Image}
      />

      <MenuTabs />
    </div>
  );
}
