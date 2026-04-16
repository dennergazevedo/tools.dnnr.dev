import { ListChecks, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageHeader } from "@/components/ui/page-header";
import Link from "next/link";
import ToDoForm from "./form";
import { cookies } from "next/headers";
import { TodoContextProvider } from "./context";
import ToDoList from "./list";

export interface ToDoItem {
  id: string;
  completed: boolean;
  description: string;
}

async function getTodos(): Promise<ToDoItem[]> {
  const cookieStore = cookies();
  const token = cookieStore.get("@dnnr:authToken")?.value;

  if (!token || token === "undefined" || token === "null") return [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // In Next.js App Router, we should pass the cookies header
    const response = await fetch(`${baseUrl}/api/todo/list`, {
      headers: {
        Cookie: `@dnnr:authToken=${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "No body");
      console.error(`[getTodos] API Error: ${errorBody}`);
      return [];
    }

    const json = await response.json();
    const items = json.data || [];

    return items.map((todoItem: any) => ({
      id: todoItem.id,
      description: todoItem.description,
      completed: !!todoItem.completed,
    }));
  } catch (error) {
    console.error("Error fetching todos from API:", error);
    return [];
  }
}

export default async function ToDo() {
  const cookieStore = cookies();
  const token = cookieStore.get("@dnnr:authToken")?.value;
  const isLoggedOut = !token || token === "undefined" || token === "null";
  const todos = await getTodos();

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
              className="font-bold text-white underline hover:text-amber-500"
              href="/auth/login"
            >
              log in
            </Link>{" "}
            or{" "}
            <Link
              className="font-bold text-white underline hover:text-amber-500"
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
