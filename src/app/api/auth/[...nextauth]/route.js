import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { Connection } from "@/Utils/DbConnection";
import User from "@/Models/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
      ],
      secret:  'IamVeryHandsome',
    callbacks: {
        async signIn({account, profile, user, credentials }) {
            try {
                await Connection();
                const userExists  = await User.findOne({email: profile.email});

                if (!userExists ) {
                    await User.create({
                        email : profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.image
                    })
                    
                }
                return true;
                
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        async session({session}) {
            try {
                
                const SessionUser = await User.findOne({email: session.user.email});

                session.user.id = SessionUser._id.toString();

                return session;


            } catch (error) {
                console.log(error);
            }
        }
    }
    
})

export { handler as GET, handler as POST }