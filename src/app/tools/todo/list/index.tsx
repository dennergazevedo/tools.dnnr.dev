"use client";
import { Fragment, useCallback, useMemo } from "react";
import { ToDoItem } from "../page";
import { Trash2 } from "lucide-react";
import { useTodo } from "../context";
import { Button } from "@/components/ui/button";

export default function ToDoList() {
  const { list, removeTask, updateTask } = useTodo();

  const completedTodos = useMemo(() => {
    return list?.filter((todoItem) => todoItem.completed) ?? [];
  }, [list]);

  const incompletedTodos = useMemo(() => {
    return list?.filter((todoItem) => !todoItem.completed) ?? [];
  }, [list]);

  const handleTaskCheckbox = useCallback(
    (todoItem: ToDoItem) => {
      updateTask({
        ...todoItem,
        completed: !todoItem.completed,
      });
    },
    [updateTask]
  );

  if (!list.length) return <Fragment />;

  return (
    <div className="mx-auto mt-8 flex w-full flex-col gap-3">
      <div className="mb-6 flex flex-row items-end justify-between border-b border-border pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground">Tasks</h2>
          <p className="text-sm text-muted-foreground">
            Manage your daily activities
          </p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex flex-col items-end gap-1">
            <span className="uppercase tracking-wider text-muted-foreground">
              Created
            </span>
            <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-foreground">
              {list.length}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="uppercase tracking-wider text-muted-foreground">
              Done
            </span>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary">
              {completedTodos.length} / {list.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {completedTodos.concat(incompletedTodos).map((todoItem) => (
          <div
            key={todoItem.id}
            className="group flex cursor-pointer flex-row items-center gap-4 rounded-xl border border-border bg-neutral-900/50 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-800/50"
            onClick={() => handleTaskCheckbox(todoItem)}
          >
            <div
              className={`
              flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all
              ${
                todoItem.completed
                  ? "border-primary bg-primary text-white"
                  : "border-neutral-600 bg-transparent"
              }
            `}
            >
              {todoItem.completed && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <label
              className={`flex-1 cursor-pointer text-sm font-medium transition-all ${
                todoItem.completed
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {todoItem.description}
            </label>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-neutral-500 opacity-0 transition-all group-hover:opacity-100 hover:text-destructive"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                removeTask(todoItem);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
