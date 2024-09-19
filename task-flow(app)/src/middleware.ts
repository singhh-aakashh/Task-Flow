import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const publicRoutes = ["/","/sign-in","/sign-up"]

export default function middleware(req:NextRequest){
    const userId = cookies().get("userId")?.value;
    const {nextUrl} = req;

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

   if(!userId && !isPublicRoute){
        return Response.redirect(new URL("/sign-in",nextUrl))
    }
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }