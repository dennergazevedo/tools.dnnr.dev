'use client'
import { Fragment, useCallback, useState } from "react"
import TimerConfig from "./config"
import Clock from "./clock"
import TimerControl from "./control"

export default function TimerClock() {
  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (intervalId !== null) return;

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
  }, [intervalId, setTimer])

  const pauseTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId])

  const stopTimer = useCallback(() => {
    pauseTimer();
    setTimer(0);
  }, [pauseTimer])

  const setNewTime = useCallback((newTime: number) => {
    pauseTimer();
    setTimer(newTime)
  }, [pauseTimer])

  return (
    <Fragment>
      <TimerConfig setNewTime={setNewTime}/>
      <div className="w-96 h-96 mr-auto ml-auto mt-4 relative">
        <div className="rounded-full border-16 w-96 h-96 p-1 border-zinc-800">
          <div className="rounded-full border-8 w-full h-full p-1 border-zinc-500">
            <div className="flex flex-col gap-2 relative items-center justify-center rounded-full border-4 w-full h-full p-2 border-zinc-300">
              <Clock timer={timer}/>
              <span className="text-zinc-200 text-xl">
                Time to focus!
              </span>
              <TimerControl 
                intervalId={intervalId} 
                stopTimer={stopTimer} 
                pauseTimer={pauseTimer} 
                startTimer={startTimer}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}