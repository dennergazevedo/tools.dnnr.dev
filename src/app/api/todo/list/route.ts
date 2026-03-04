import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("@dnnr:authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }
    let userId: string;

    try {
      const decoded = jwt.verify(token, jwtSecret) as { id: string };
      userId = decoded.id;
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 401 }
      );
    }

    const todos = await sql`
      SELECT id, description, completed FROM todos 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ data: todos });
  } catch (error: any) {
    console.error("Todo list error:", error);
    return NextResponse.json(
      { error: error.message || "[!] Something went wrong." },
      { status: 500 }
    );
  }
}
