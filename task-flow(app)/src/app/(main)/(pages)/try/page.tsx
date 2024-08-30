"use client"
import { Button } from '@/components/ui/button';
import { useZapStore } from '@/lib/store'
import React from 'react'


const page = () => {
    const zapstate = useZapStore();
  return (
    <div className='flex flex-col items-center justify-center gap-4'>{JSON.stringify(zapstate)}
    <Button onClick={()=>zapstate.setName("new Tasck")}>Set Name</Button>
    <Button onClick={()=>zapstate.addZapStep({stepType:'TRIGGER',orderPosition:0,triggerId:"webhook"})}>add zapstep</Button>
   
    </div>
  )
}

export default page