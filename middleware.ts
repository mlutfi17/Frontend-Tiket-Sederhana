import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id: number;
  email: string;
  role: "admin" | "user";
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  /* =====================
     1. BELUM LOGIN
  ===================== */
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token) {
    return NextResponse.next();
  }

  /* =====================
     2. SUDAH LOGIN
  ===================== */
  let decoded: JwtPayload;

  try {
    decoded = jwtDecode<JwtPayload>(token);
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /* =====================
     3. ROLE CHECK
  ===================== */

  // user mencoba akses admin
  if (pathname.startsWith("/admin") && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // admin membuka halaman user (opsional, tapi rapi)
  if (
    decoded.role === "admin" &&
    (pathname === "/dashboard" || pathname.startsWith("/my-bookings"))
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // sudah login tapi ke login
  if (pathname === "/login") {
    return NextResponse.redirect(
      new URL(
        decoded.role === "admin" ? "/admin/dashboard" : "/dashboard",
        req.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/my-bookings/:path*",
    "/tickets/:path*",
    "/admin/:path*",
    "/login",
  ],
};
