"use client";
import { api } from "@/utils/request";
import React, {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useState,
} from "react";
import { ToDoItem } from "./page";
import { useAuth } from "@/app/auth/context";
import { TodoContextProps, TodoContextProviderProps } from "./types";
import { toast } from "sonner";
import { createUUID } from "@/utils/uuid";

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({
  children,
  todos,
}) => {
  const { token } = useAuth();
  const [list, setList] = useState<ToDoItem[]>(todos);

  const handleSaveTodo = useCallback(
    async (item: ToDoItem) => {
      if (token) {
        try {
          await api.post("/api/todo/create", {
            id: item.id,
            description: item.description,
          });
        } catch (err) {
          toast("Oops!", {
            description: "Your task was not saved in the cloud, try again.",
          });
        }
      } else {
        const currentLocal = JSON.parse(
          localStorage.getItem("@dnnr:todo") || "[]"
        );
        localStorage.setItem(
          "@dnnr:todo",
          JSON.stringify([...currentLocal, item])
        );
      }
    },
    [token]
  );

  const handleUpdateTodo = useCallback(
    async (item: ToDoItem) => {
      if (token) {
        try {
          await api.patch(`/api/todo/update?id=${item.id}`, {
            description: item.description,
            completed: item.completed,
          });
        } catch (err) {
          toast("Oops!", {
            description: "Your task was not updated in the cloud, try again.",
          });
        }
      } else {
        const currentLocal = JSON.parse(
          localStorage.getItem("@dnnr:todo") || "[]"
        );
        const newList = currentLocal.map((i: ToDoItem) =>
          i.id === item.id ? item : i
        );
        localStorage.setItem("@dnnr:todo", JSON.stringify(newList));
      }
    },
    [token]
  );

  const handleDeleteTodo = useCallback(
    async (item: ToDoItem) => {
      if (token) {
        try {
          await api.delete("/api/todo/delete", {
            params: {
              id: item.id,
            },
          });
        } catch (err) {
          toast("Oops!", {
            description: "Your task was not deleted in the cloud, try again.",
          });
        }
      } else {
        const currentLocal = JSON.parse(
          localStorage.getItem("@dnnr:todo") || "[]"
        );
        const newList = currentLocal.filter((i: ToDoItem) => i.id !== item.id);
        localStorage.setItem("@dnnr:todo", JSON.stringify(newList));
      }
    },
    [token]
  );

  const handleAddTask = useCallback(
    (inputValue: string) => {
      if (!inputValue) return;

      const newItem: ToDoItem = {
        id: createUUID(),
        completed: false,
        description: inputValue,
      };

      setList((prev) => [...prev, newItem]);
      handleSaveTodo(newItem);
    },
    [handleSaveTodo]
  );

  const handleRemoveTask = useCallback(
    (removedItem: ToDoItem) => {
      setList((prev) =>
        prev.filter((currentItem) => currentItem.id !== removedItem.id)
      );
      handleDeleteTodo(removedItem);
    },
    [handleDeleteTodo]
  );

  const handleUpdateTask = useCallback(
    (item: ToDoItem) => {
      setList((prev) =>
        prev.map((currentItem) =>
          currentItem.id === item.id ? item : currentItem
        )
      );
      handleUpdateTodo(item);
    },
    [handleUpdateTodo]
  );

  return (
    <TodoContext.Provider
      value={{
        saveTodo: handleSaveTodo,
        deleteTodo: handleDeleteTodo,
        addTask: handleAddTask,
        removeTask: handleRemoveTask,
        updateTask: handleUpdateTask,
        saveLocalTodos: (newTodos) =>
          localStorage.setItem("@dnnr:todo", JSON.stringify(newTodos)),
        setList,
        list,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be used inside a TodoContextProvider");
  }

  return context;
};
