import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { CodeXml } from "lucide-react";

export default function XmlPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="XML Tools"
        description="Beautify XML and convert between XML and JSON."
        icon={CodeXml}
      />
      <MenuTabs />
    </div>
  );
}
