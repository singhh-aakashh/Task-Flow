import { cookies } from "next/headers";
import { NextRequest } from "next/server";

 const publicRoutes = [
  "/"
];

 const authRoutes = [
  "/sign-in",
  "/sign-up"
]

 const apiAuthPrefix = "/api/auth";


export default function middleware(req:NextRequest){
    const userId = cookies().get("userId")?.value;
    const {nextUrl} =req;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute)
        return null;

    if(isAuthRoute){
        if(userId){
            return Response.redirect(new URL("/dashboard",nextUrl))
        }
        return null;
    }
    if(!userId && !isPublicRoute){
        return Response.redirect(new URL("/auth/login",nextUrl))
    }

}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}