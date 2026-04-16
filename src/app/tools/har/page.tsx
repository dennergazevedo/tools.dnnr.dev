import { Network } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { HarViewer } from "./HarViewer";

export const metadata = {
  title: "HAR Viewer | dnnr.dev",
  description: "Inspect and analyse HTTP Archive (.har) files directly in your browser.",
};

export default function HarPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="HAR Viewer"
        description="Upload a .har file to inspect all network requests, timings, and headers visually."
        icon={Network}
      />
      <HarViewer />
    </div>
  );
}
