import nextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {label: "Name", type: "text", placeholder: "name"},
        email: {label: "Email", type: "text", placeholder: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        connect();

        const {email, password}: any = credentials;
        const user = await User.findOne({email});
        console.log(user);
        if (user) {
          const validPassword = await bcryptjs.compare(password, user.password);
          if (!validPassword) {
            return null;
          }
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user, session}: any) {
      if (user) {
        return {...token, id: user._id, role: user.role};
      }
      return token;
    },
    async session({session, token, user}: any) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.TOKEN_SECRET!,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = nextAuth(authOptions);
export {handler as GET, handler as POST};
