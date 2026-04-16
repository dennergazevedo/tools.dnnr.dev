import { Bookmark, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageHeader } from "@/components/ui/page-header";
import Link from "next/link";
import { cookies } from "next/headers";
import { BookmarkContextProvider } from "./context";
import BookmarkForm from "./form";
import BookmarkList from "./list";

export interface BookmarkItem {
  id: string;
  title: string;
  url: string;
}

async function getBookmarks(): Promise<BookmarkItem[]> {
  const cookieStore = cookies();
  const token = cookieStore.get("@dnnr:authToken")?.value;

  if (!token || token === "undefined" || token === "null") return [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/bookmark/list`, {
      headers: {
        Cookie: `@dnnr:authToken=${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "No body");
      console.error(`[getBookmarks] API Error: ${errorBody}`);
      return [];
    }

    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching bookmarks from API:", error);
    return [];
  }
}

export default async function BookmarkManager() {
  const cookieStore = cookies();
  const token = cookieStore.get("@dnnr:authToken")?.value;
  const isLoggedOut = !token || token === "undefined" || token === "null";
  const bookmarks = await getBookmarks();

  return (
    <BookmarkContextProvider bookmarks={bookmarks}>
      <PageHeader
        title="Bookmark Manager"
        description="Save your useful links and access them from anywhere."
        icon={Bookmark}
      />
      {isLoggedOut && (
        <Alert className="mt-12">
          <Terminal className="h-4 w-4" />
          <AlertTitle>You are not logged in!</AlertTitle>
          <AlertDescription>
            Your bookmarks will not be saved. To save your data in the cloud and
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
      <BookmarkForm />
      <BookmarkList />
    </BookmarkContextProvider>
  );
}
