import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
import { AUTH_URL } from "../../../constant";

const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const loginData = {
          username: credentials.username,
          password: credentials.password,
          getProfile: true,
        };

        try {
          return userData;
        } catch (error) {
          console.log(error);
          throw new Error("There was an error on user authentication");
        }
      },
    }),
  ],
   secret: "760195f445131d2fdb6af993548b76c6",
  session: {
    jwt: true,
    maxAge: 1 * 24 * 60 * 60, // Expiration: 1 month
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/home";
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/",
  },
};

export default (req, res) => NextAuth(req, res, options);
