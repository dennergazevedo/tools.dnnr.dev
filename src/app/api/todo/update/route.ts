import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const token = request.cookies.get("@dnnr:authToken")?.value;
    const { description, completed } = await request.json();

    if (!token || !id) {
      return NextResponse.json(
        { error: "Authentication and ID are required." },
        { status: 400 }
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

    const updateQuery = await sql`
      UPDATE todos 
      SET description = COALESCE(${description}, description),
          completed = COALESCE(${completed}, completed)
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id
    `;

    if (updateQuery.length === 0) {
      console.warn(
        `[TodoUpdate] No rows affected for ID: ${id} and UserID: ${userId}`
      );
      return NextResponse.json(
        { error: "Todo not found or unauthorized." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: { status: "OK" } });
  } catch (error: any) {
    console.error("[TodoUpdate] Error:", error);
    return NextResponse.json(
      { error: error.message || "[!] Something went wrong." },
      { status: 500 }
    );
  }
}
