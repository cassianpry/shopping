import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import bcrypt from "bcrypt"
import db from "@/utils/db"

db.connectDb()

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // OAuth authentication providers...
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email
        const password = credentials.password
        const user = await User.findOne({ email })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return SignInUser({ password, user })
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("E-mail ou senha não conferem.")
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub)
      session.user.id = token.sub || user._id.toSting()
      session.user.role = user.role || "user"
      token.role = user.role || "user"
      return session
    },
  },
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },
  secret: process.env.JWT_SECRET,
})

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Por favor entre com a senha.")
  }
  const testPassword = await bcrypt.compare(password, user.password)
  if (!testPassword) {
    throw new Error("EE-mail ou senha não conferem!")
  }
  return user
}
