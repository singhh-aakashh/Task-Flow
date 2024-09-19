import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = cookies().get("userId")?.value;
  if (body&&userId) {
    try {
      const zap = await db.zap.create({
        data: {
          id: body.id,
          userId: userId,
          name: body.name,
          zapSteps: {
            create: body.zapSteps.map((step: any) =>
              step.orderPosition === 0
                ? {
                    id: step.id,
                    stepType: step.stepType,
                    orderPosition: step.orderPosition,
                    triggerId: step.triggerId,
                    metaData:JSON.stringify(step.metaData)||"{}"
                  }
                : {
                    id: step.id,
                    stepType: step.stepType,
                    orderPosition: step.orderPosition,
                    actionId: step.actionId,
                    metaData:JSON.stringify(step.metaData)
                  }
            ),
          },
        },
      });
      return Response.json({status:"success",zap});
    } catch (error) {
      console.log(error);
      return Response.json({status:"failed",error});
    }
  }
  else{
    return Response.json({status:"failed",msg:"req body is not"})
  }
}
