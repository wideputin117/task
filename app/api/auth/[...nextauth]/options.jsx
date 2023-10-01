 
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
   providers: [

         CredentialsProvider({
            name:"Credentials",
            credentials: {
                username: {
                    label:"Username",
                    type: "text",
                    placeholder: "your-name"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Type your password",
                },
            },
            async authorize(credentials){
                // this is where i retrive user data
                const user = { id:"1", name: "userAdmin", password: "admin123"}
                if(credentials?.username === user.name && credentials?.password === user.password){
                    return user
                }
                else{
                    return null
                }
            }
         })

    ],
}
