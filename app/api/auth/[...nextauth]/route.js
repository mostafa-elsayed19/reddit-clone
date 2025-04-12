import { providers } from "@/_lib/providers";
import { supabase } from "@/_lib/supabase";
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
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        if (!existingUser) {
          const { error } = await supabase
            .from("users")
            .insert({
              username: user.name,
              email: user.email,
              provider: user.provider,
              avatar: user.image,
            })
            .single();

          if (error) console.error("Supabase Insert Error:", error);
        }

        token.id = existingUser.id;
        token.username = existingUser.username;
        token.email = existingUser.email;
        token.avatar = existingUser.avatar;
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
