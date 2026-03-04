import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Layers } from "lucide-react";

export default function CSV() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="CSV • JSON"
        description="Transform your data effortlessly between CSV and JSON formats."
        icon={Layers}
      />
      <MenuTabs />
    </div>
  );
}
