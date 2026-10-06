import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/login", "/signup"];
const protectedRoutes = ["/dashboard/:path*", "/workspaces/:path*"];

export function proxy(request: NextRequest) {
	// logging
	console.log(`[Proxy] : ${request.method} ${request.nextUrl.pathname}`);

	const sessionCookie = getSessionCookie(request);
	const pathName = request.nextUrl.pathname;

	//optimis check cookie , tetep harus check lagi di page
	if (!sessionCookie && protectedRoutes.includes(pathName)) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	if (sessionCookie && publicRoutes.includes(pathName)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
