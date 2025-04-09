import { providers } from "@/app/_lib/providers";
import NextAuth from "next-auth";

const authConfig = {
  providers,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
