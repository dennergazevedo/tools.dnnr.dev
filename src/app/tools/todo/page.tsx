
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import ToDoForm from "./form";
import { cookies } from 'next/headers'
import { TodoContextProvider } from "./context";
import ToDoList from "./list";
import { api } from "@/utils/request";

export interface ToDoItem {
  id: string;
  completed: boolean;
  description: string;
}

async function fetchTodos(token: string): Promise<ToDoItem[]> {
  'use server'
  if (!token) return [];

  try {
    const { data: responseData } = await api.get(`/api/todo/list?token=${token}`);

    if (!responseData?.length) {
      throw new Error("Failed to fetch todos");
    }

    return responseData?.map((todoItem: ToDoItem) => ({
      id: todoItem.id,
      description: todoItem.description,
      completed: todoItem.completed,
    }));
  } catch (error) {
    console.error("[!] Something went wrong", error);
    return [];
  }
}

export default async function ToDo() {
  const cookieStore = cookies();
  const token = cookieStore.get('@dnnr:authToken')?.value
  const todos = await fetchTodos(String(token));

  return (
    <TodoContextProvider todos={todos}>
      <h1 className="text-3xl font-medium text-zinc-100">
        To Do
      </h1>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <span className="text-sm text-zinc-400">
          Organize your life
        </span>
      </div>
      {!token && (
        <Alert className="mt-12">
          <Terminal className="h-4 w-4" />
          <AlertTitle>You are not logged in!</AlertTitle>
          <AlertDescription>
            To save your data in the cloud and access it from any device, please{" "}
            <Link className="text-white hover:text-sky-600" href="/auth/login">log in to your account</Link>.
          </AlertDescription>
        </Alert>
      )}
      <ToDoForm todos={todos} />
      <ToDoList />
    </TodoContextProvider>
  );
}
