import { Fragment } from "react";
import TimerClock from "./clock";
import { PageHeader } from "@/components/ui/page-header";
import { AlarmClock } from "lucide-react";

export default function Timer() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Timer"
        description="Stay focused and productive with customizable intervals."
        icon={AlarmClock}
      />

      <div className="mt-8 flex flex-col items-center justify-center">
        <TimerClock />
      </div>
    </div>
  );
}
