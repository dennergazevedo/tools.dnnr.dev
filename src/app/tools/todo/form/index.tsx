"use client";
import {
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import { Plus } from "lucide-react";
import { useTodo } from "../context";
import { ToDoItem } from "../page";
import * as Input from "@/components/Form/Input";
import { Button } from "@/components/ui/button";

interface ToDoFormProps {
  todos: ToDoItem[];
}

export default function ToDoForm({ todos }: ToDoFormProps) {
  const { saveLocalTodos, setList, addTask } = useTodo();
  const [inputValue, setInputValue] = useState<string>("");

  // We rely on the initial 'todos' prop passed to TodoContextProvider to populate the list.
  // The client side 'setList' and 'saveLocalTodos' are only called for new interactions.

  const handleAddTask = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inputValue.trim()) {
        addTask(inputValue);
        setInputValue("");
      }
    },
    [inputValue, addTask]
  );

  return (
    <div className="mx-auto mt-12 w-full">
      <form
        onSubmit={handleAddTask}
        className="flex flex-row items-center gap-3"
      >
        <div className="flex-1">
          <Input.Root className="h-12 border-neutral-800 bg-neutral-900 focus-within:border-primary">
            <Input.Control
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              placeholder="What needs to be done?"
              className="text-base"
            />
          </Input.Root>
        </div>
        <Button type="submit" size="lg" className="h-12 px-6 font-bold">
          Add Task
          <Plus className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
