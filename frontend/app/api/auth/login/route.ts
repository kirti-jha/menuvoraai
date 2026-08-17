import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/neon";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const authResult = await authenticateUser(email, password);

    if (authResult.success) {
      return NextResponse.json({
        success: true,
        message: "Sign in successful!",
        user: authResult.user,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: authResult.message || "Invalid credentials. Please try again.",
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred.",
      },
      { status: 500 }
    );
  }
}
