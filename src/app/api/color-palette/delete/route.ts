import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function DELETE(request: NextRequest) {
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

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing palette ID." },
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM color_palettes 
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json(
        {
          error: "Palette not found or you don't have permission to delete it.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Palette deleted successfully." });
  } catch (error: any) {
    console.error("Delete palette error:", error);
    return NextResponse.json(
      { error: error.message || "[!] Something went wrong." },
      { status: 500 }
    );
  }
}
