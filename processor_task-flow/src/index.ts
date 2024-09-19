
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
  },
}>()

app.get("/",(c)=>{
  return c.text("Backend is live...")
})

app.post('/hook/:zapId',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  const body = await c.req.json();
  const zapId = c.req.param('zapId');
  if(zapId){
    
  try {
   
    const tran = await prisma.$transaction(async (tx:any) =>{
      const zapRun = await tx.zapRun.create({
        data:{
          status:'PENDING',
          metaData:body,
          zapId:zapId
        }
      })
      await tx.zapRunOutBox.create({
        data:{
          zapRunId:zapRun.id,
        }
      })
    })
    return c.json({status:"success",msg:"Webhook received"})
  } catch (error) {
    console.log(error);
    return c.json({status:"failed",error})
  }
}
else{
  console.log("zapId is not present in param")
  return c.json({status:"failed"})
}
})

export default app

