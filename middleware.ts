import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // ✅ Only protect /dashboard
  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!token && isProtected) {
    // Not logged in → redirect to login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token && (pathname === "/auth/login" || pathname === "/auth/signup")) {
    // Already logged in → redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware only to these routes
export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/signup"],
};
