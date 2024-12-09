import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({ 
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        newUser: '/auth/new-account', // New users will be directed here on first sign in (leave the property out if not of interest)
        error: '/auth/error',
        verifyRequest: '/auth/verify-request', // (used for check email message)
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

                console.log({ email, password });

            //buscar el correo 

            //comparar las contrasenas

            //regresar el usuario


            return null
            },
          }),
     ]

})

