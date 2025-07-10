import {  clerkMiddleware, createRouteMatcher, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/onboarding(.*)",
    "/organization(.*)",
    "/project(.*)",
    "/issue(.*)",
]);


    export default clerkMiddleware(
    async (auth, req) => { 
    const { userId, orgId } = await auth();

    if (!userId && isProtectedRoute(req)) {
        const { redirectToSignIn } = await auth();
        return redirectToSignIn();
    }


    if(
        userId &&
        !orgId &&
        req.nextUrl.pathname !== "/onboarding" &&
        req.nextUrl.pathname !== "/"
    ) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return NextResponse.next();
    })

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
