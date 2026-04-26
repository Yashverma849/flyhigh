// Auth temporarily disabled — middleware is a no-op until auth is restored.
import { NextResponse } from "next/server";

export default function middleware() {
  return NextResponse.next();
}

export const config = { matcher: [] };
