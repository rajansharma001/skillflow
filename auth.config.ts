import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma/prisma";
import bcrypt, { compare, hash } from "bcryptjs";

interface Credentials {
  email: string;
  password: string;
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) throw new Error("email or password missing");

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user) {
          throw new Error("User Not found");
        }
        console.log(user);

        if (!user.password) {
          throw new Error("Password Not found in DB");
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error("Password did not match");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
