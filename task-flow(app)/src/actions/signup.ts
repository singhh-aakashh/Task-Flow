"use server"

import { getUserByEmail } from "@/lib/database";
import { db } from "@/lib/db";
import { signupSchema } from "@/lib/types";
import { cookies } from "next/headers";
import { z } from "zod";


export const signup = async (values:z.infer<typeof signupSchema>) => {
    const validate = signupSchema.safeParse(values);
    if(validate.success){
        const {name,email,password} = validate.data;
        try {
            const checkUser = await getUserByEmail(email);
            if(checkUser){
                return {status:"failed",msg:"User already exists"}
            }
            else{
                const newUser = await db.user.create({
                    data:{
                        email,
                        name,
                        password
                    }
                })
                cookies().set("userId",newUser.id)
                return {status:"success",msg:"User created successfully"}
            }
        } catch (error) {
            console.log(error);
            return {status:"failed",msg:"something went wrong"}
        }
    }
    else{
        console.log(validate.error);
        return {status:"failed",msg:"something went wrong"}

    }
}