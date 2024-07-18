import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./app/libs/auth/backend";

export function middleware(req: NextRequest) {
  const token = req.headers.get("authorization") || "";
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const user = decodeToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/profile", "/profile/:path"],
};
