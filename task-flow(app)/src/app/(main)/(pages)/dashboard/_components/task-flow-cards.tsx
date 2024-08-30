
import { ConnectionTypes } from '@/lib/types'
import React, { useState } from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { boolean } from 'zod'
import { Button } from '@/components/ui/button'

type Props = {
  title: string,
  webhook:string,
  zapSteps:any,
  isActive:boolean
}

const TaskFlowCard = ({
  webhook,
  title,
  zapSteps,
  isActive
}: Props) => {
    const [toggle,setToggle]=useState<boolean>(isActive)
    console.log("zapsteps",zapSteps)
  return (
    <Card className="flex w-full items-center justify-between">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
            {
                zapSteps?.map((step:any)=>{
                    <Image
                    src={step?.orderPosition===0? step.trigger.image:step.action.image}
                    alt={title}
                    height={30}
                    width={30}
                    className="object-contain"
                  />
                })
            }
          
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{webhook}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex  items-center gap-4 p-4">
         
          <Switch checked={toggle} onCheckedChange={()=>setToggle(!toggle)} />
            <Button variant={"outline"}>Edit</Button>
      </div>
    </Card>
  )
}

export default TaskFlowCard
