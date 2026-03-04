export default function Clock({ timer }: ClockProps) {
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(seconds).padStart(2, "0");

  return (
    <div className="flex flex-row items-center justify-center tabular-nums">
      <div className="flex flex-col items-center">
        <span className="text-6xl font-bold tracking-tighter text-zinc-100 drop-shadow-lg md:text-7xl">
          {hours > 0 ? `${hoursStr}:` : ""}
          {minutesStr}:{secondsStr}
        </span>
      </div>
    </div>
  );
}
