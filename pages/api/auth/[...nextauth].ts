import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import bcrypt from "bcryptjs";
import OAuthProfile from "../../../types/google/o_auth_profile";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
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
  // secret: process.env.JWT_SECRET,
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  debug: process.env.NEXTAUTH_DEBUG === "true",
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        const { email, name, picture, email_verified }: OAuthProfile = profile;
        let emailVerified;
        if (email_verified) emailVerified = new Date();
        await prisma.user.upsert({
          where: { email: profile.email },
          update: {},
          create: {
            email: email || "",
            name,
            image: picture,
            emailVerified,
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
    async jwt({ token, user }) {
      if (!user) {
        token.user = await prisma.user.findUnique({
          where: {
            email: token.email || "",
          },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
          },
        });
      } else {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/dashboard", // on successfully signin
    signOut: "/auth/login", // on signout redirects users to a custom login page.
    error: "/auth/error", // displays authentication errors
    newUser: "/auth/login", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

// export default NextAuth(NextAuthOptions);
export default NextAuth(authOptions);
