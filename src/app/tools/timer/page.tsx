import { Fragment } from "react";
import TimerClock from "./clock";

export default function Timer() {
  return (
    <Fragment>
      <h1 className="text-3xl font-medium text-zinc-100">
        Timer
      </h1>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <span className="text-sm text-zinc-400">
          Organize your life
        </span>
      </div>
      <section>
        <TimerClock />
      </section>
    </Fragment>
  );
}
