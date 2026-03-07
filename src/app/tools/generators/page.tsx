import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Sparkles } from "lucide-react";

export default function GeneratorsPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Generators"
        description="Quickly generate common data like UUIDs and secure passwords."
        icon={Sparkles}
      />
      <MenuTabs />
    </div>
  );
}
