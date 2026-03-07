import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Code2 } from "lucide-react";

export default function JsonPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="JSON"
        description="Helper tools for your JSON development workflow."
        icon={Code2}
      />
      <MenuTabs />
    </div>
  );
}
