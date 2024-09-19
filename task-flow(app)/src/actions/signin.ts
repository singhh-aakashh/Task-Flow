"use server"

import { db } from "@/lib/db";
import { signinSchema } from "@/lib/types";
import { cookies } from "next/headers";
import { z } from "zod";



export const signin = async (values:z.infer<typeof signinSchema>) => {
    const validate = signinSchema.safeParse(values);
    if(validate.success){
        const {email,password} = validate.data;
        try {
            const checkUser = await db.user.findFirst({
                where:{
                    email
                }
            })
            if(checkUser){
                if(checkUser.password === password){
                    cookies().set("userId",checkUser.id)
                return {status:"success",msg:"User sign in successfully ✅"}
                }
                else{
                    return {status:"failed",msg:"password is wrong ❌"}
                }
            }
            else{
                return {status:"failed",msg:"User does not exists ❌"}
            }
        } catch (error) {
            console.log(error);
            return {status:"failed",msg:"something went wrong ❕"}
        }
    }
    else{
        console.log(validate.error);
        return {status:"failed",msg:"something went wrong ❕"}

    }
}