import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Layers } from "lucide-react";

export default function Spreadsheet() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Spreadsheet"
        description="Convert your data effortlessly between Spreadsheets (XLS, XLSX, CSV, ODS) and JSON formats."
        icon={Layers}
      />
      <MenuTabs />
    </div>
  );
}
