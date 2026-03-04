import { ListChecks, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageHeader } from "@/components/ui/page-header";
import Link from "next/link";
import ToDoForm from "./form";
import { cookies } from "next/headers";
import { TodoContextProvider } from "./context";
import ToDoList from "./list";
import { api } from "@/utils/request";

import { sql } from "@/lib/db";
import jwt from "jsonwebtoken";

export interface ToDoItem {
  id: string;
  completed: boolean;
  description: string;
}

async function getTodos(token: string | undefined): Promise<ToDoItem[]> {
  if (!token || token === "undefined" || token === "null") return [];

  const jwtSecret = process.env.JWT_SECRET || "fallback-secret";
  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    const userId = decoded.id;

    const todos = await sql`
      SELECT id, description, completed 
      FROM todos 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return (todos || []).map((todoItem: any) => ({
      id: todoItem.id,
      description: todoItem.description,
      completed: todoItem.completed,
    }));
  } catch (error) {
    console.error("Error fetching todos from DB:", error);
    return [];
  }
}

export default async function ToDo() {
  const cookieStore = cookies();
  const token = cookieStore.get("@dnnr:authToken")?.value;
  const isLoggedOut = !token || token === "undefined" || token === "null";
  const todos = await getTodos(token);

  return (
    <TodoContextProvider todos={todos}>
      <PageHeader
        title="To Do"
        description="Organize your life and keep track of your tasks."
        icon={ListChecks}
      />
      {isLoggedOut && (
        <Alert className="mt-12">
          <Terminal className="h-4 w-4" />
          <AlertTitle>You are not logged in!</AlertTitle>
          <AlertDescription>
            Your tasks will not be saved. To save your data in the cloud and
            access it from any device, please{" "}
            <Link
              className="font-bold text-white underline hover:text-sky-600"
              href="/auth/login"
            >
              log in
            </Link>{" "}
            or{" "}
            <Link
              className="font-bold text-white underline hover:text-sky-600"
              href="/auth/register"
            >
              register
            </Link>
            .
          </AlertDescription>
        </Alert>
      )}
      <ToDoForm todos={todos} />
      <ToDoList />
    </TodoContextProvider>
  );
}
