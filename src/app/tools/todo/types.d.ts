import { ToDoItem } from "./page";

export type TodoContextProviderProps = {
  todos: ToDoItem[]
  children: any
};

export interface TodoContextProps{
  saveTodo: (item: ToDoItem) => Promise<void>
  deleteTodo: (item: ToDoItem) => Promise<void>
  addTask: (inputValue: string) => void
  removeTask: (removedItem: ToDoItem) => void
  updateTask: (item: ToDoItem) => void
  saveLocalTodos: (newTodos: ToDoItem[]) => void
  setList: React.Dispatch<React.SetStateAction<ToDoItem[]>>
  list: ToDoItem[]
}