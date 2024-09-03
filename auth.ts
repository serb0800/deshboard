import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

const USERNAME = "admin@lucrum.li";
const PASSWORD = "oijsd3w4rfwe;o3i2jrsf[09j42tiuerhgqwef";

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
            return { id: "00001", name: "Admin" };
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
