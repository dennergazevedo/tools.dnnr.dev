import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const id = searchParams.get("id");

    if (!token || !id) {
      return NextResponse.json(
        { error: "Token and ID are required." },
        { status: 400 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET || "fallback-secret";
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

    const deleteQuery = await sql`
      DELETE FROM todos 
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id
    `;

    if (deleteQuery.length === 0) {
      return NextResponse.json(
        { error: "Todo not found or unauthorized." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: { status: "OK" } });
  } catch (error: any) {
    console.error("Todo deletion error:", error);
    return NextResponse.json(
      { error: error.message || "[!] Something went wrong." },
      { status: 500 }
    );
  }
}
