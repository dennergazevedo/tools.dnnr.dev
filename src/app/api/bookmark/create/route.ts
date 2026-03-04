import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("@dnnr:authToken")?.value;
    const { id, title, url } = await request.json();

    if (!token || !title || !url) {
      return NextResponse.json(
        { error: "Token, title and URL are required." },
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

    const databaseUrl = process.env.DATABASE_URL!;
    const sql = neon(databaseUrl);

    const result = await sql`
      INSERT INTO bookmarks (id, user_id, title, url)
      VALUES (COALESCE(${id}, gen_random_uuid()), ${userId}, ${title}, ${url})
      RETURNING id, title, url, created_at
    `;

    return NextResponse.json({ data: result[0] });
  } catch (error: any) {
    console.error("Bookmark creation error:", error);
    return NextResponse.json(
      { error: error.message || "[!] Something went wrong." },
      { status: 500 }
    );
  }
}
