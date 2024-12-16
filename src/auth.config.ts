import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/new-account", // New users will be directed here on first sign in (leave the property out if not of interest)
    error: "/auth/error",
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },


  callbacks: {

    jwt({ token, user }) {
      if( user ) {
        token.data = user;
      }

      console.log({token,user})

      return token;
    },

    session({ session, token, user }) {
      session.user= token.data as any;

      return session;

    },
  },




  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        //buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) return null;

        //comparar las contrasenas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        //regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
});
