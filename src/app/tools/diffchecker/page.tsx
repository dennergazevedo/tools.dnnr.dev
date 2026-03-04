import { GitCompare } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { DiffChecker } from "./DiffChecker";

export default function DiffCheckerPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Diff Checker"
        description="Compare two blocks of text and see the differences highlighted instantly."
        icon={GitCompare}
      />
      <DiffChecker />
    </div>
  );
}
