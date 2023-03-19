import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatches = await bcrypt.compareSync(
          password as string,
          user?.password as string,
        );

        if (!passwordMatches) {
          return null;
        }

        return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        const { email, name, picture } = profile;
        const emailVerified = true;
        await prisma.user.upsert({
          where: { email: profile.email },
          update: {},
          create: {
            email,
            name,
            image: picture,
            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            },
          },
        });
      }

      return true;
    },
    jwt({ token, user }) {
      token.user = user;
      return token;
    },
    session({ session, token, user }) {
      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // on successfully signin
    // signOut: "/auth/login", // on signout redirects users to a custom login page.
    // error: "/auth/error", // displays authentication errors
    // newUser: "/auth/login", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

// export default NextAuth(NextAuthOptions);
export default NextAuth(authOptions);
