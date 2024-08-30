"use server"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"

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

   export const getwebhookdata = async ()=>{
    try {
        const web = await db.webhookData.findFirst({})
        return web
    } catch (error) {
        console.log("error",error)
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

   export const getUserZaps = async (id:number) =>{
    //WIP: extract user
    try {
        const zaps = await db.zap.findMany({
            where:{userId:id},
            include:{
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
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
   }

   export const getCurrentUserId = async () =>{
    const user = await currentUser()
    if(user?.id){
        try {
            const getuser = await db.user.findFirst({where:{clerkId:user.id}})
            if(getuser){
                if('id' in getuser){
                return getuser.id;
                }else{
                    return null;
                }
            }else{
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    else{
        return null;
    }
   }
