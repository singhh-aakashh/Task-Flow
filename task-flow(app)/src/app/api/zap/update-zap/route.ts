import { db } from "@/lib/db";
import { NextRequest } from "next/server";

// WIP:fix this

export async function POST(req:NextRequest){
    const {workflowId} = await req.json();
    if(workflowId){
        try {
            const updateZap = await db.zap.update({
                where:{
                    id:workflowId
                },
                data:{

                }
            })
        } catch (error) {
            
        }
    }
}