import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyUserToken } from "utils/services/auth";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const user_token = req.cookies.get("_token");

  if (url.pathname === "/login" || url.pathname === "/signup") {
    return NextResponse.next();
  } else {
    if (!user_token) {
      return NextResponse.rewrite(new URL("/login", req.url));
    } else {
      const res = verifyUserToken();

      if (!res) {
        return NextResponse.rewrite(new URL("/login", req.url));
      } else {
        return NextResponse.next();
      }
    }
  }
}

export const config = {
  middleware: true,
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
