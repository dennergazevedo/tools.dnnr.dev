import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ data: { status: "OK" } });
  
  response.cookies.set("@dnnr:authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
