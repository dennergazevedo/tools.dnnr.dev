interface TimerConfigProps{
  setNewTime: (newTime: number) => void
}

interface ClockProps{
  timer: number
}

interface TimerControlProps{
  intervalId: NodeJS.Timeout | null
  startTimer: () => void
  pauseTimer: () => void
  stopTimer: () => void
  timer: number
  setNewTime: (newTime: number) => void
}