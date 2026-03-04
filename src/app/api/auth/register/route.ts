import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password, firstname, lastname } = await request.json();

    if (!email || !password || !firstname || !lastname) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await sql`
        INSERT INTO users (email, password, "firstname", "lastname")
        VALUES (${email}, ${hashedPassword}, ${firstname}, ${lastname})
      `;
    } catch (dbError: any) {
      if (dbError.message.includes("unique constraint")) {
        return NextResponse.json(
          { error: "User already exists." },
          { status: 400 }
        );
      }
      throw dbError;
    }

    return NextResponse.json({ data: { status: "OK" } });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "[!] Something went wrong." },
      { status: 500 }
    );
  }
}
