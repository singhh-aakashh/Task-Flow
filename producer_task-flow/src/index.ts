import { PrismaClient } from '@prisma/client';
import Redis from "ioredis";



const prisma = new PrismaClient();

const redis = new Redis({
    password: 'eLiaz1tGtZ9hUumOEEEAhV8umqPuL4ZO',
        host: 'redis-18240.c114.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 18240
    
});


  const streamName = "zap-events"

const producer = async () =>{

    while(true){
        try {
            const pendingRows = await prisma.zapRunOutBox.findMany({
                where:{},
                take:10
            })
           
            for (const row of pendingRows) {
                console.log(`zap Id is ${row.zapRunId}`);
                console.log(typeof row.zapRunId);  

                await redis.xadd(streamName, '*', 
                    "zapRunId",row.zapRunId,  
                    "stage", 1 
                );

                console.log(`Event added to ${streamName}`);
            }
            await prisma.zapRunOutBox.deleteMany({
                where:{
                    id:{
                        in:pendingRows.map(x=>x.id)
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

producer().catch(console.error);