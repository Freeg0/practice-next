import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log(email, password);
  const cookieStore = await cookies();

  if (email === "test@test.com" && password === "test") {
    cookieStore.set("auth", "true");
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();

  // Supprimer le cookie auth
  cookieStore.delete("auth");

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
