import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session :{
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the credentials object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)
        user = await prisma.user.findFirst({
          where: { 
            email: credentials.email || undefined,
          },
        });
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],

  pages: {          
    signIn: '/pages/login',
  },
  callbacks:{
    async jwt({token, user}){
      if(user){
        token.id=user.id
      }
      return token
    },
    },
  
})