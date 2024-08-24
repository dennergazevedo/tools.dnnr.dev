import { Button } from "@/components/ui/button"

const TWENTY_FIVE_MINUTES = 1500
const FIVE_MINUTES = 300
const FIFTEEN_MINUTES = 900

export default function TimerConfig({ setNewTime }:TimerConfigProps) {
  return (
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
  )
}