import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("@dnnr:authToken")?.value;

  // Protected routes list
  const protectedRoutes = ["/api/todo", "/api/auth/user"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.json(
      { error: "Unauthorized. Authentication token is missing." },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/todo/:path*", "/api/auth/user"],
};
