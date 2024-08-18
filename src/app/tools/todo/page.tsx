"use client";
import { FormEvent, Fragment, useCallback, useEffect, useState } from "react";
import ToDoList from "./list";
import { Plus, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/app/auth/context";
import Link from "next/link";

export interface ToDoItem {
  id: number;
  completed: boolean;
  title: string;
}

export default function ToDo() {
  const { token } = useAuth();
  const [list, setList] = useState<ToDoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTask = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(!inputValue) return
    const newList = [
      ...list, 
      {
        id: list.length + 1,
        completed: false,
        title: inputValue,
      },
    ]
    setList(newList);
    localStorage.setItem('@dnnr:todo', JSON.stringify(newList))
    setInputValue('');
  }, [inputValue, list]);

  const handleRemoveTask = useCallback((removedItem: ToDoItem) => {
    const newList = list.filter(currentItem => currentItem.id !== removedItem.id)
    setList(newList)
    localStorage.setItem('@dnnr:todo', JSON.stringify(newList))
  }, [list])

  const updateTask = useCallback((item: ToDoItem) => {
    const newList = list.filter(currentItem => currentItem.id !== item.id)
    newList.push(item)
    setList(newList)
    localStorage.setItem('@dnnr:todo', JSON.stringify(newList))
  }, [list])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const todos = localStorage.getItem("@dnnr:todo");
      if (todos) setList(JSON.parse(todos));
    }
  }, []);

  return (
    <Fragment>
      <h1 className="text-3xl font-medium text-zinc-100">
        To Do
      </h1>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <span className="text-sm text-zinc-400">
          Organize your life
        </span>
      </div>
      {
        !token && (
          <Alert className="mt-12">
            <Terminal className="h-4 w-4" />
            <AlertTitle>You are not logged in!</AlertTitle>
            <AlertDescription>
              To save your data in the cloud and access it from any device, please {' '}
              <Link className="text-white hover:text-sky-600" href="/auth/login">log in to your account</Link>.
            </AlertDescription>
          </Alert>
        )
      }
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
      <ToDoList list={list} handleRemoveTask={handleRemoveTask} updateTask={updateTask}/>
    </Fragment>
  );
}
