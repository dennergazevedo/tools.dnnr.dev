import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Regex } from "lucide-react";

export const metadata = {
  title: 'Regex Tool | dnnr.dev',
}

export default function RegexPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Regex Tool"
        description="Test your regular expressions against text and understand what they do."
        icon={Regex}
      />
      <MenuTabs />
    </div>
  );
}
