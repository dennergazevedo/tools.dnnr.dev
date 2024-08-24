'use client'
import { Button } from "@/components/ui/button"
import { Ban, Flame, Pause } from "lucide-react"
import { Fragment, useEffect, useState } from "react"

const TWENTY_FIVE_MINUTES = 1500
const FIVE_MINUTES = 300
const FIFTEEN_MINUTES = 900

export default function TimerClock() {
  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalId !== null) return; // Impede que múltiplos intervalos sejam criados

    const id = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          setIntervalId(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const pauseTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  const stopTimer = () => {
    pauseTimer();
    setTimer(0);
  }

  const setNewTime = (newTime: number) => {
    pauseTimer();
    setTimer(newTime)
  }

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');
  
  return (
    <Fragment>
      <div className="flex flex-row items-center justify-center gap-2 w-full mt-12">
        <Button onClick={() => setNewTime(TWENTY_FIVE_MINUTES)} variant={'ghost'} className="text-zinc-200 text-sm">
          Pomodoro
        </Button>
        <Button onClick={() => setNewTime(FIVE_MINUTES)} variant={'ghost'} className="text-zinc-200 text-sm">
          Short Break
        </Button>
        <Button onClick={() => setNewTime(FIFTEEN_MINUTES)} variant={'ghost'} className="text-zinc-200 text-sm">
          Long Break
        </Button>
      </div>
      <div className="w-96 h-96 mr-auto ml-auto mt-4 relative">
        <div className="rounded-full border-10 w-96 h-96 p-1 border-zinc-800">
          <div className="rounded-full border-8 w-full h-full p-1 border-zinc-500">
            <div className="flex flex-col gap-2 relative items-center justify-center rounded-full border-4 w-full h-full p-2 border-zinc-300">
              <div className="flex flex-row items-center gap-2">
                <div className="flex gap-1">
                  <span className="text-4xl bg-zinc-800 rounded p-2 pt-2 pb-2 text-zinc-200">{hoursStr.charAt(0)}</span>
                  <span className="text-4xl bg-zinc-800 rounded p-2 pt-2 pb-2 text-zinc-200">{hoursStr.charAt(1)}</span>
                </div>
                <span className="text-zinc-200">:</span>
                <div className="flex gap-1">
                  <span className="text-4xl bg-zinc-800 rounded p-2 pt-2 pb-2 text-zinc-200">{minutesStr.charAt(0)}</span>
                  <span className="text-4xl bg-zinc-800 rounded p-2 pt-2 pb-2 text-zinc-200">{minutesStr.charAt(1)}</span>
                </div>
                <span className="text-zinc-200">:</span>
                <div className="flex gap-1">
                  <span className="text-4xl bg-zinc-800 rounded p-2 pt-2 pb-2 text-zinc-200">{secondsStr.charAt(0)}</span>
                  <span className="text-4xl bg-zinc-800 rounded p-2 pt-2 pb-2 text-zinc-200">{secondsStr.charAt(1)}</span>
                </div>
              </div>
              <span className="text-zinc-200 text-xl">
                Time to focus!
              </span>
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}