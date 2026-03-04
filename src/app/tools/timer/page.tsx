import { Fragment } from "react";
import TimerClock from "./clock";

export default function Timer() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-medium italic text-zinc-100">Timer</h1>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <span className="text-sm italic text-zinc-400">Organize your life</span>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center">
        <TimerClock />
      </div>
    </div>
  );
}
