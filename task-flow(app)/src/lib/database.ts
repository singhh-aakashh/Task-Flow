"use server"
import { cookies } from "next/headers"
import { db } from "./db"


export const deleteZap = async (zapId:string) => {
    const userId = cookies().get("userId")?.value;
    if(userId && zapId){
        try {
            const deleteZap = await db.zap.delete({
                where:{
                    id:zapId
                }
            })
            return ({status:"success",msg:"Deleted Successfully"})
        } catch (error) {
            console.log(error);
            return ({status:"failed",msg:"Something went wrong"})
        }
    }
}

export const getCurrentUser = async () =>{
    const userId = cookies().get("userId")?.value;
    if(userId){
        try {
            const user = await db.user.findFirst({
                where:{
                    id:userId
                }
            })
            if(user){
                return user;
            }
            else{
                console.log("user is not present for this id")
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    else{
        console.log("user id is not present")
        return null;
    }
}

    export const getTrigger = async (trigger:string) =>{
    console.log("inside get trigger")
    try {
      const selectedtrigger = await db.trigger.findUnique({where:{id:trigger}})
      console.log("selectedTrigger",selectedtrigger)

      if(selectedtrigger){
      return selectedtrigger
      }
    } catch (error) {
      console.log("eror",error)
      return null;
    }
   }

   export const getUserByEmail = async (email:string) => {
        try {
            const user = await db.user.findFirst({
                where:{
                    email
                },
                select:{
                    id:true,
                    password:true,
                    name:true,
                    email:true
                }
            })
            if(user){
                return user;
            }
            else{
                console.log("User with this email is not present");
                return null;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
   

   export const getZapById = async (zapId:string) =>{
    if(zapId){
        try {
            const zap = await db.zap.findFirst({
                where:{
                    id:zapId
                },
                include:{
                    zapSteps:true
                }
            })
            if(zap){
                return zap;
            }
            else{
                console.log("zap with this zapId is not present")
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    else{
        console.log("zapId is not present")
        return null;
    }
   }

   export const getAction = async (action:string) => {
    try {
        const selectedAction = await db.action.findUnique({where:{id:action}})
        if(selectedAction){
            return selectedAction
        }
        else{
            return null;
        }
    } catch (error) {
        console.log("eror",error)
      return null;
    }
   }



   export const getAvailableAction = async () =>{
    try {
        const actions = await db.action.findMany({})
        return actions
    } catch (error) {
        console.log(error)
        return null;
    }
   }

   export const getAvailableTrigger = async () =>{
    try {
        const triggers = await db.trigger.findMany({})
        return triggers
    } catch (error) {
        console.log(error)
        return null;
    }
   }

   export const getUserZaps = async () =>{
    const userId = cookies().get("userId")?.value;
    if(userId){
    try {
        const zaps = await db.zap.findMany({
            where:{userId:userId},
            select:{
                id:true,
                name:true,
                isActive:true,
                zapSteps:{
                    include:{
                        trigger:true,
                        action:true
                    }
                }
            }
        });
        if(zaps){
            return zaps;
        }
        else{
            console.log("zaps are not present")
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
else{
    console.log("userId is not present")
    return null;
}
   }


