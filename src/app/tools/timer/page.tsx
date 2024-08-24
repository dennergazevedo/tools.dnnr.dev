import { AlarmClock, FolderClock } from "lucide-react";
import { Fragment } from "react";
import TimerClock from "./clock";

export default async function Timer() {
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
      <nav className="flex flex-row gap-4 mt-12">
        <AlarmClock 
          className={`h-6 w-6 flex-shrink-0 text-white`}
        />
        <FolderClock 
          className={`h-6 w-6 flex-shrink-0 text-white`}
        />
      </nav>
      <section>
        <TimerClock />
      </section>
    </Fragment>
  );
}
