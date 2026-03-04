import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("@dnnr:authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Token not provided." },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
      };
      return NextResponse.json({
        data: {
          id: decoded.id,
          email: decoded.email,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
        },
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("User verification error:", error);
    return NextResponse.json(
      { error: error.message || "[!] Something went wrong." },
      { status: 500 }
    );
  }
}
