import { PrismaClient } from "@prisma/client";
import Redis from "ioredis"
import { processEmail } from "./processEmail";

const redis = new Redis({
        password: 'eLiaz1tGtZ9hUumOEEEAhV8umqPuL4ZO',  
        host: 'redis-18240.c114.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 18240
});

const streamName = "zap-events"

let lastid = "0"

const prisma = new PrismaClient();

const processEvent = async (zapRunId:string) =>{
    if(zapRunId){
        try {
            const zap = await prisma.zapRun.findFirst({
                where:{
                    id:Number(zapRunId)
                },
                include:{
                    zap:{
                        include:{
                            zapSteps:{
                                include:{
                                    trigger:true,
                                    action:true
                                }
                            }
                        }
                    }
                }
            })
            if(zap){
                return zap;
            }
            else{
                console.log("ZapRun is not avaialable for this id")
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    else{
        console.log("zapRunId is not present")
        return null;
    }
}



const consumer = async () =>{
   while(true){
    try {
        console.log("Worker started...")
        const events = await redis.xread("BLOCK",0,"STREAMS",streamName,lastid);
            if(events){
                const[streamKey,eventList] = events[0];
                for(const [id,event] of eventList){
                   
                    console.log(`lastid is ${id} , zapRunId is ${event[1]} , stage is ${event[3]} , type of event`,typeof(event))
                    console.log("processing..")
                    const zap = await processEvent(event[1]);
                    if(zap){
                    
                    // Avoiding trigger
                        if(Number(event[3])!==0){
                        //   console.log("zap meta data is",zap?.metaData)
                            // Finding current action
                            const currentAction = zap.zap.zapSteps.find((action)=>action.orderPosition===Number(event[3]));
                            if(currentAction?.action?.name==='Email'){
                                //converting jsonValue to json
                                if(typeof currentAction.metaData === "string"){
                                    const value = JSON.parse(currentAction.metaData)
                                    await processEmail(value,zap.metaData)
                                }
                           }
                        }
                            // managing stages
                            // console.log("length of zapsteps ",zap?.zap.zapSteps.length)
                            if(Number(event[3])!==((zap?.zap?.zapSteps?.length)-1)){
                                await redis.xadd(streamName,"*", "zapRunId",event[1],  
                                    "stage", Number(event[3])+1 
                                );
                            }
                    }
                    lastid=id
                    await redis.xdel(streamName,lastid)
                }
            }
    } catch (error) {
        console.log(error)
    }
}
}
consumer().catch(console.error)