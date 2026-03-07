import { MenuTabs } from "./tabs";
import { PageHeader } from "@/components/ui/page-header";
import { AlarmClock } from "lucide-react";

export default function CronPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Cron Generator"
        description="Create and verify cron schedules with ease."
        icon={AlarmClock}
      />
      <MenuTabs />
    </div>
  );
}
