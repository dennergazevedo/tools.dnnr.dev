import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Code2 } from "lucide-react";

export default function Typescript() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Typescript"
        description="Helper tools for your Typescript development workflow."
        icon={Code2}
      />
      <MenuTabs />
    </div>
  );
}
