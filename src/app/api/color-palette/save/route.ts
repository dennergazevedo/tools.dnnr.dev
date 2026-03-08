import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
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

    const { name, colors } = await request.json();

    if (!name || !colors || !Array.isArray(colors) || colors.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: name or colors." },
        { status: 400 }
      );
    }

    const [palette] = await sql`
      INSERT INTO color_palettes (user_id, name, colors)
      VALUES (${userId}, ${name}, ${colors})
      RETURNING id, name, colors, created_at
    `;

    return NextResponse.json({ data: palette });
  } catch (error: any) {
    console.error("Save palette error:", error);
    return NextResponse.json(
      { error: error.message || "[!] Something went wrong." },
      { status: 500 }
    );
  }
}
