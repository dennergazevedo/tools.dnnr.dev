'use client'
import { AlarmClock, FolderClock } from "lucide-react";
import { Fragment, useState } from "react";

export default async function Timer() {
  const [menu, setMenu] = useState<TimerMenu>('timer');

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
      <div className="flex flex-row gap-4 mt-12">
        <AlarmClock className={`h-6 w-6 flex-shrink-0 ${menu === 'timer' ? 'text-sky-500' : 'text-white'}`}/>
        <FolderClock className={`h-6 w-6 flex-shrink-0 text-white ${menu === 'history' ? 'text-sky-500' : 'text-white'}`}/>
      </div>
    </Fragment>
  );
}
