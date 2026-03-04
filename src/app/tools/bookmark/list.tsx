"use client";
import { Fragment } from "react";
import { Trash2, ExternalLink } from "lucide-react";
import { useBookmark } from "./context";
import { Button } from "@/components/ui/button";

export default function BookmarkList() {
  const { list, removeBookmark } = useBookmark();

  if (!list.length) return <Fragment />;

  return (
    <div className="mx-auto mt-12 flex w-full flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-border pb-4">
        <h2 className="text-xl font-bold text-foreground">My Bookmarks</h2>
        <p className="text-sm text-muted-foreground">
          {list.length} saved link{list.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-neutral-900/40 p-5 transition-all hover:border-neutral-700 hover:bg-neutral-800/40 hover:shadow-premium"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800/50 ring-1 ring-zinc-700/50">
                <img
                  src={`https://www.google.com/s2/favicons?sz=64&domain=${item.url}`}
                  alt={`${item.title} icon`}
                  className="h-6 w-6 rounded-sm object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'%3E%3C/path%3E%3Cpath d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'%3E%3C/path%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <h3
                  className="truncate font-semibold text-zinc-100"
                  title={item.title}
                >
                  {item.title}
                </h3>
                <p className="truncate text-xs text-zinc-500" title={item.url}>
                  {item.url}
                </p>
              </div>
              <div className="flex h-full shrink-0 items-center gap-1">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-zinc-700 hover:text-sky-400"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => removeBookmark(item)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
