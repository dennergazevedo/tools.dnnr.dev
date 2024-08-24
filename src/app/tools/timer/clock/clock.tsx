export default function Clock({ timer }: ClockProps) {

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  return (
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
  )
}