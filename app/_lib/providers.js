import { supabase } from "./supabase";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
      params: {
        prompt: "select_account",
        access_type: "offline",
        response_type: "code",
      },
    },
  }),
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const { email, password } = credentials;

      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("provider", "credentials")
        .single();

      console.log(error);

      if (!user || !user.password_hash) return null;

      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) return null;

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      };
    },
  }),
];
