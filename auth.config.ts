import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return Response.redirect(new URL("/statistic", nextUrl));
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/statistic");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/statistic", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  secret: "iDMher/IXJhrZUuVH/zedY7C1vXFIYIQWhzlqT8i+4Y=",
} satisfies NextAuthConfig;
