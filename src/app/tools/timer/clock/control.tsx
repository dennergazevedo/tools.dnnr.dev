"use client";
import { Button } from "@/components/ui/button";
import { Ban, Flame, Pause, Play, Timer } from "lucide-react";
import { Fragment, useCallback, useState } from "react";
import * as Input from "../../../../components/Form/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function TimerControl({
  intervalId,
  startTimer,
  pauseTimer,
  stopTimer,
  timer,
  setNewTime,
}: TimerControlProps) {
  const [minutes, setMinutes] = useState<number>(0);

  const handleChangeTime = useCallback(() => {
    setNewTime(minutes * 60);
  }, [minutes]);

  return (
    <div className="flex flex-col items-center">
      {!intervalId ? (
        <Fragment>
          {timer === 0 ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="primary"
                  className="gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  <Timer className="h-4 w-4 flex-shrink-0" />
                  Set timer
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[300px] rounded-2xl border-zinc-800 bg-zinc-900 p-4 shadow-2xl"
                sideOffset={10}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-zinc-200">
                    Custom Duration
                  </h3>
                  <div className="flex flex-row gap-2">
                    <Input.Root className="flex-1 border-zinc-800 bg-zinc-950">
                      <Input.Control
                        className="w-full"
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        type="number"
                        placeholder="Minutes"
                      />
                    </Input.Root>
                    <Button
                      onClick={handleChangeTime}
                      variant="primary"
                      className="gap-2"
                    >
                      Set
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              onClick={startTimer}
              variant="primary"
              className="h-12 gap-2 rounded-full px-8 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <Play className="h-5 w-5 fill-current" />
              Start Focus
            </Button>
          )}
        </Fragment>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <Button
            onClick={pauseTimer}
            variant="ghost"
            className="h-12 w-12 rounded-full bg-zinc-800/50 p-0 text-zinc-300 transition-all hover:bg-zinc-800 active:scale-95"
          >
            <Pause className="h-6 w-6 fill-current" />
          </Button>
          <Button
            onClick={stopTimer}
            variant="outline"
            className="h-12 gap-2 rounded-full border-zinc-800 px-6 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-zinc-100 active:scale-95"
          >
            <Ban className="h-4 w-4" />
            Stop
          </Button>
        </div>
      )}
    </div>
  );
}
