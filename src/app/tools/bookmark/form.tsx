"use client";
import { FormEvent, useCallback, useState, ChangeEvent } from "react";
import { Plus } from "lucide-react";
import { useBookmark } from "./context";
import * as Input from "@/components/Form/Input";
import { Button } from "@/components/ui/button";

export default function BookmarkForm() {
  const { addBookmark } = useBookmark();
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (title.trim() && url.trim()) {
        addBookmark(title, url);
        setTitle("");
        setUrl("");
      }
    },
    [title, url, addBookmark]
  );

  return (
    <div className="mx-auto mt-12 w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:flex-row md:items-end"
      >
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-zinc-400">Title</label>
          <Input.Root className="h-12 border-neutral-800 bg-neutral-900 focus-within:border-primary">
            <Input.Control
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="E.g. GitHub"
              className="text-base"
            />
          </Input.Root>
        </div>
        <div className="flex-[2] space-y-2">
          <label className="text-sm font-medium text-zinc-400">URL</label>
          <Input.Root className="h-12 border-neutral-800 bg-neutral-900 focus-within:border-primary">
            <Input.Control
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
              placeholder="paste-your-link-here.com"
              className="text-base"
            />
          </Input.Root>
        </div>
        <Button type="submit" size="lg" className="h-12 px-6 font-bold">
          Add Bookmark
          <Plus className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
