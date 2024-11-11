import clientPromise from "@/libs/mongoConnect"
import client from "@/libs/mongoConnect"
import { User } from "@/models/User"
import { UserInfo } from "@/models/UserInfo"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import bcrypt from 'bcrypt'
import * as mongoose from "mongoose"
import NextAuth, { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(client),
  session: {
    strategy: 'jwt',
    maxAge: 3000,
  },
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          if (!credentials) {
            console.error('Credentials not provided');
            throw new Error('Credentials not provided');
          }
        
          const { email, password } = credentials;
          console.log(`Authorize called with email: ${email}`);
        
          // Ensure MongoDB connection is established
          
            await mongoose.connect(process.env.MONGO_URL);
            console.log('MongoDB connected successfully');
          
        
          const user = await User.findOne({ email });
          if(!user) {
            console.error('User not found',email);
            return null;
          }
          console.log('user found', user);
          
          const passwordOk = await bcrypt.compare(password, user.password);
          if(!passwordOk){
            console.error('Password incorrect');
            return null;
          }

          return {id: user._id.toString(), email: user.email};
        
          // if (passwordOk) {
          //   return user; 
          // }
          
          // Return null if user data could not be retrieved
          // return null
        }
      })
  ]
}
export async function isAdmin () {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if(!userEmail){
    return false
  }
  const userInfo = await UserInfo.findOne({email:userEmail})
  if(!userInfo){
    return false;
  }
  return userInfo.admin;
}
const handler = await NextAuth(authOptions)

// Ensure this part is using `await` if necessary
export {handler as GET, handler as POST}