import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { FileCode2 } from "lucide-react";

export default function URI() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="URI"
        description="Safely encode and decode Uniform Resource Identifiers."
        icon={FileCode2}
      />
      <MenuTabs />
    </div>
  );
}
