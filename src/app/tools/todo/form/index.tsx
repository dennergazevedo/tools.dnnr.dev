'use client'
import { FormEvent, Fragment, useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useTodo } from "../context";
import { ToDoItem } from "../page";

interface ToDoFormProps {
  todos: ToDoItem[]
}

export default function ToDoForm({ todos }: ToDoFormProps) {
  const { 
    saveLocalTodos, 
    setList, 
    addTask, 
  } = useTodo()
  const [inputValue, setInputValue] = useState<string>("");

  const loadTodoData = useCallback(async () => {
    if(todos){
      saveLocalTodos(todos)
      setList(todos);
    }
  }, [todos])

  const handleAddTask = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask(inputValue)
  }, [inputValue, addTask])

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadTodoData()
    }
  }, []);

  return (
    <Fragment>
      <form onSubmit={handleAddTask} className="mt-16 flex flex-row items-center gap-4">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-600 bg-zinc-800 p-4 text-zinc-100"
          placeholder="Write your task here..."
        />
        <button type="submit" className="flex cursor-pointer flex-row items-center gap-1 rounded-lg bg-sky-700 p-4 text-zinc-100 hover:bg-sky-800">
          Create
          <Plus className="h-5 w-5 flex-shrink-0" />
        </button>
      </form>
    </Fragment>
  );
}
