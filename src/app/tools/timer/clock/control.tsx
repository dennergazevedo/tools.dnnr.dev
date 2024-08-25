'use client'
import { Button } from "@/components/ui/button"
import { Ban, Flame, Pause, Play, Timer } from "lucide-react"
import { Fragment, useCallback, useState } from "react"
import * as Input from "../../../../components/Form/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function TimerControl({
  intervalId,
  startTimer,
  pauseTimer,
  stopTimer,
  timer,
  setNewTime
}: TimerControlProps) {

  const [minutes, setMinutes] = useState<number>(0)

  const handleChangeTime = useCallback(() => {
    setNewTime(minutes * 60)
  }, [minutes])

  return (
    <Fragment>
      {
        !intervalId ?
          <Fragment>
            {timer === 0 ?
              <Popover>
                <Button variant={'neutral'} className="gap-2 absolute bottom-12">
                  <PopoverTrigger className="flex flex-row items-center gap-2">
                    <Timer className="h-4 w-4 flex-shrink-0 text-zinc-900" />
                    Set timer
                  </PopoverTrigger>
                </Button>
                <PopoverContent className="flex w-full bg-zinc-900 border-zinc-700">
                  <div className="flex flex-row w-full gap-2">
                    <Input.Root className="w-48">
                      <Input.Prefix>
                        <Timer className="h-5 w-5 text-zinc-500" />
                      </Input.Prefix>
                      <Input.Control className="w-32" onChange={e => setMinutes(Number(e.target.value))} type="number" placeholder="Whats minutes?" />
                    </Input.Root>
                    <Button onClick={handleChangeTime} variant={'neutral'} className="gap-2">
                      <Play className="h-4 w-4 flex-shrink-0 text-zinc-900" />
                      Set time
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              :
              <Button onClick={startTimer} variant={'neutral'} className="gap-2 absolute bottom-12">
                <Flame className="h-4 w-4 flex-shrink-0 text-zinc-900" />
                Start
              </Button>
            }
          </Fragment>

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