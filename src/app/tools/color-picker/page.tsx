import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Palette } from "lucide-react";

export default function ColorPickerPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Color Picker"
        description="Pick, convert and experiment with different color formats."
        icon={Palette}
      />
      <MenuTabs />
    </div>
  );
}
