'use client'
import { Button } from "@/components/ui/button"
import { Ban, Flame, Pause } from "lucide-react"
import { Fragment, useState } from "react"

export default function TimerControl({
  intervalId,
  startTimer,
  pauseTimer,
  stopTimer
}: TimerControlProps) {
  return (
    <Fragment>
      {
        !intervalId ?
          <Button onClick={startTimer} variant={'neutral'} className="gap-2 absolute bottom-12">
            <Flame className="h-4 w-4 flex-shrink-0 text-zinc-900" />
            Start
          </Button>
          :
          <div className="flex flex-row absolute bottom-12 gap-2">
            <Button onClick={pauseTimer} variant={'ghost'} className="gap-2">
              <Pause className="h-4 w-4 flex-shrink-0 text-zinc-200" />
            </Button>
            <Button onClick={stopTimer} variant={'ghost'} className="gap-2 text-zinc-200">
              <Ban className="h-4 w-4 flex-shrink-0 text-zinc-200" />
              Stop
            </Button>
          </div>
      }
    </Fragment>
  )
}