import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Ampersands } from "lucide-react";

export default function Base64() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Base64"
        description="Quickly encode or decode text and files to Base64 format."
        icon={Ampersands}
      />
      <MenuTabs />
    </div>
  );
}
