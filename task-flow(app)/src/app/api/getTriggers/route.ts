import { db } from "@/lib/db";

export async function GET(){
    try {
        const trigger = await db.trigger.findMany({})
        return Response.json(trigger)
    } catch (error) {
        console.log(error)
        return Response.json(error)
    }
}