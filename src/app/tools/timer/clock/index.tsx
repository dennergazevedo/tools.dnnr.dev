"use client";
import { Fragment, useCallback, useState } from "react";
import TimerConfig from "./config";
import Clock from "./clock";
import TimerControl from "./control";

export default function TimerClock() {
  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (intervalId !== null) return;

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIntervalId(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  }, [intervalId, setTimer]);

  const pauseTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const stopTimer = useCallback(() => {
    pauseTimer();
    setTimer(0);
  }, [pauseTimer]);

  const setNewTime = useCallback(
    (newTime: number) => {
      pauseTimer();
      setTimer(newTime);
    },
    [pauseTimer]
  );

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-12">
      <TimerConfig setNewTime={setNewTime} />

      <div className="relative flex h-[340px] w-[340px] items-center justify-center md:h-[400px] md:w-[400px]">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[12px] border-zinc-800/50 shadow-2xl shadow-amber-500/10" />

        {/* Progress Ring (Visual only for now, can be improved with SVG stroke-dasharray) */}
        <div className="absolute inset-2 rounded-full border-[6px] border-zinc-700/30" />

        {/* Main Display Area */}
        <div className="group relative flex h-[280px] w-[280px] flex-col items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm md:h-[320px] md:w-[320px]">
          <div className="flex flex-col items-center gap-6">
            <Clock timer={timer} />

            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                {timer > 0 ? "Time to focus!" : "Ready when you are"}
              </span>
            </div>

            <TimerControl
              intervalId={intervalId}
              stopTimer={stopTimer}
              pauseTimer={pauseTimer}
              startTimer={startTimer}
              timer={timer}
              setNewTime={setNewTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
