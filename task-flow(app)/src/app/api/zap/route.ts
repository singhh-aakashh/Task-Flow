import { db } from "@/lib/db";

export async function GET(){
    try {
        const zap = await db.user.findUnique({
            where:{
                id:3
            },
            include:{
                zaps:{
                    include:{
                        zapSteps:{
                            select:{
                                id:true,
                                
                                stepType:true,
                                orderPosition:true,
                                action:true,
                                trigger:true
                            }
                        }
                    }
                }
            }
        })
        return Response.json(zap)
    } catch (error) {
        console.log(error)
        return Response.json(error)
    }
}