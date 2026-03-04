import { Button } from "@/components/ui/button";

const TWENTY_FIVE_MINUTES = 1500;
const FIVE_MINUTES = 300;
const FIFTEEN_MINUTES = 900;

export default function TimerConfig({ setNewTime }: TimerConfigProps) {
  return (
    <div className="flex flex-row items-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 p-1 shadow-lg">
      <Button
        onClick={() => setNewTime(TWENTY_FIVE_MINUTES)}
        variant="ghost"
        className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
      >
        Pomodoro
      </Button>
      <div className="mx-1 h-4 w-px bg-zinc-800" />
      <Button
        onClick={() => setNewTime(FIVE_MINUTES)}
        variant="ghost"
        className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
      >
        Short Break
      </Button>
      <div className="mx-1 h-4 w-px bg-zinc-800" />
      <Button
        onClick={() => setNewTime(FIFTEEN_MINUTES)}
        variant="ghost"
        className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
      >
        Long Break
      </Button>
    </div>
  );
}
