
import React, { useState } from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CopyPlus, Trash2 } from 'lucide-react'
import { deleteZap } from '@/lib/database'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

type Props = {
  title: string,
  zapId:string,
  zapSteps:any,
  isActive:boolean
}

const TaskFlowCard = ({
  title,
  zapId,
  zapSteps,
  isActive
}: Props) => {
  const {toast} = useToast();
  const router = useRouter();
  const [isdisable,setIsdisable]=useState<boolean>(false)
  const webhookUrl = `http://127.0.0.1:8787/hook/${zapId}`
    const [toggle,setToggle]=useState<boolean>(isActive)
    console.log("zapsteps",zapSteps[0].trigger.image)

    const handleCopy =async () =>{
     await navigator.clipboard.writeText(webhookUrl)
    }
    const handleDelete = async () => {
      setIsdisable(true)
     const res = await deleteZap(zapId)
      if(res?.msg){
        toast({title:res.msg})
      }
      if(res?.status==="success"){
        router.push("/dashboard")
      }
      setIsdisable(false)
    }

  return (
    <Card className="flex w-full items-center justify-between">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
            {
                zapSteps?.map((step:any)=>
                    <img
                    src={step?.orderPosition===0? step.trigger.image:step.action.image}
                    alt={title}
                    className="object-contain h-11 w-11"
                  />
                )
            }
          
        </div>
        <div>
          <CardTitle className="text-lg"><Link href={`/workflows/${zapId}`}>{title}</Link></CardTitle>
          <div className='flex mt-4 items-center gap-4'>
          <CardDescription>{webhookUrl}</CardDescription>
          <Button onClick={handleCopy} variant={'outline'} ><CopyPlus/></Button>
          </div>
          
        </div>
      </CardHeader>
      <div className="flex  items-center gap-4 p-4">
         
          <Switch checked={toggle} onCheckedChange={()=>setToggle(!toggle)} />
            <Button variant={"outline"} onClick={handleDelete} disabled={isdisable}><Trash2/></Button>
      </div>
    </Card>
  )
}

export default TaskFlowCard
