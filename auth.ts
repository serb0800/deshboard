import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

const USERNAME = "username";
const PASSWORD = "password";

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize({ username, password }) {
//         if (username && password) {
//           if (username === USERNAME && password === PASSWORD) return {};
//           return null;
//         }

//         return null;
//       },
//     }),
//   ],
// });

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ username, password }) {
        if (username && password) {
          if (username === USERNAME && password === PASSWORD) {
            return { id: "1000", name: "John Doe" };
          }

          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
