import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body) {
    try {
      //WIP: fix user id
      const zap = await db.zap.create({
        data: {
          id: body.id,
          userId: body.userId,
          name: body.name,
          zapSteps: {
            create: body.zapSteps.map((step: any) =>
              step.orderPosition === 0
                ? {
                    id: step.id,
                    stepType: step.stepType,
                    orderPosition: step.orderPosition,
                    triggerId: step.triggerId,
                  }
                : {
                    id: step.id,
                    stepType: step.stepType,
                    orderPosition: step.orderPosition,
                    actionId: step.actionId,
                  }
            ),
          },
        },
      });
      return Response.json(zap);
    } catch (error) {
      console.log(error);
      return Response.json(error);
    }
  }
  else{
    return Response.json({msg:"req body is not"})
  }
}
