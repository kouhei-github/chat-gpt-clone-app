import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

type ClientType = {
  clientId: string;
  clientSecret: string;
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    } as ClientType),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)
