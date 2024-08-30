import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    const body = await req.json();
    console.log("type of body",typeof(body))
    try {
        const web = await db.webhookData.create({
            data:{
                data:body
            }
        })
        return Response.json(web)
    } catch (error) {
        console.log(error)
    return Response.json(error)

    }
}