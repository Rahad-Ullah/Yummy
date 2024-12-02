/* eslint-disable import/order */
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const authRoutes = ["/login", "/register"];
const roleBasedRoutes = {
  USER: [
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/my-recipes",
    "/dashboard/recipes/add-new",
    /^\/dashboard\/recipes$/,
    /^\/dashboard\/recipes\/edit\/[^/]+$/,
    /^\/recipes\/view\/[^/]+$/,
  ],
  ADMIN: [
    "/dashboard/recipes", // Only admin can access this route
    "/dashboard/recipes/add-new",
    /^\/dashboard\/recipes\/edit\/[^/]+$/,
    /^\/dashboard(?!\/my-recipes).*/,
    /^\/recipes\/view\/[^/]+$/,
  ],
  // add more role here if needed
};

type TRole = keyof typeof roleBasedRoutes;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the current user from the session
  const user = await getCurrentUser();

  if (!user) {
    // Allow unauthenticated access to auth routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  const role = user.role as TRole;

  // Restrict /dashboard/recipes explicitly for USER role
  if (role === "USER" && pathname.match(/^\/dashboard\/recipes$/)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check role-based access
  if (role && roleBasedRoutes[role]) {
    const allowedRoutes = roleBasedRoutes[role];

    const hasAccess = allowedRoutes.some((route) =>
      typeof route === "string" ? pathname === route : pathname.match(route)
    );

    if (hasAccess) {
      return NextResponse.next();
    }
  }

  // Default redirect if access is denied
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/recipes/:path*", "/login", "/register"],
};
