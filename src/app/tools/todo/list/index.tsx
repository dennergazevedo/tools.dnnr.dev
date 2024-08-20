'use client'
import { Fragment, useCallback, useMemo } from "react"
import { ToDoItem } from "../page"
import { Trash2 } from "lucide-react"
import { useTodo } from "../context"

export default function ToDoList() {
  const { list, removeTask, updateTask } = useTodo();

  const completedTodos = useMemo(() => {
    return list?.filter(todoItem => todoItem.completed) ?? []
  }, [list])

  const incompletedTodos = useMemo(() => {
    return list?.filter(todoItem => !todoItem.completed) ?? []
  }, [list])

  const handleTaskCheckbox = useCallback((todoItem: ToDoItem) => {
    updateTask({
      ...todoItem,
      completed: !todoItem.completed
    })
  }, [updateTask])

  if (!list.length) return <Fragment />

  return (
    <div className="mt-6 ml-auto mr-auto flex flex-col gap-2">
      <div className="mb-4 flex flex-row justify-between items-center">
        <p className="text-zinc-300 flex flex-row items-center gap-2">
          Tasks created
          <span className="flex pr-4 pl-4 bg-zinc-400 bg-opacity-30 rounded-xl text-zinc-300">
            {list.length}
          </span>
        </p>
        <p className="text-zinc-300 flex flex-row items-center gap-2">
          Completed
          <span className="flex pr-4 pl-4 bg-zinc-400 bg-opacity-30 rounded-xl text-zinc-300">
            {completedTodos.length} of {list.length}
          </span>
        </p>
      </div>
      {completedTodos.concat(incompletedTodos).map(todoItem => (
        <div key={todoItem.id} className="flex flex-row items-center group gap-4 border border-zinc-600 bg-zinc-800 rounded-lg p-4 pl-8 pr-8 cursor-pointer hover:bg-zinc-700">
          <input onChange={() => handleTaskCheckbox(todoItem)} className="cursor-pointer" name={String(todoItem.id)} type='checkbox' checked={todoItem.completed} />
          <label className="flex-1 text-zinc-200 cursor-pointer" htmlFor={String(todoItem.id)}>
            {todoItem.description}
          </label>
          <Trash2 onClick={() => removeTask(todoItem)} className="h-4 w-4 flex-shrink-0 text-zinc-500 hover:text-sky-500" />
        </div>
      ))}
    </div>
  )
}
