import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const {id,email_addresses} = body?.data
        const email = email_addresses[0].email_address
       const newUser=  await db.user.upsert({
            where:{clerkId:id},
            update:{
                email,
            },
            create:{
                clerkId:id,
                email
            }
        })
        return new NextResponse('User updated in db successfully',{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse('Error updating in db ',{status:500})
    }
}