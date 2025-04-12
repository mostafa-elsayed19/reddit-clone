import { providers } from "@/_lib/providers";
import NextAuth from "next-auth";

const authConfig = {
  providers,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 15 minutes
  },
  jwt: {
    maxAge: 15 * 60, // 15 minutes
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.avatar = user.avatar;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.avatar = token.avatar;
      return session;
    },
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
