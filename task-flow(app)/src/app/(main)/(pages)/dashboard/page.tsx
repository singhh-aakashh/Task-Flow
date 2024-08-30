"use client"
import {  getCurrentUserId, getUserZaps,  } from '@/lib/database';
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TaskFlowCard from './_components/task-flow-cards';


const DashboardPage = () => {
  const [zaps,setZaps]=useState<any>();
  useEffect(()=>{
    const fetchzap = async ()=>{
      const userId = await getCurrentUserId();
      if(userId){
      const Allzaps = await getUserZaps(userId);
      setZaps(Allzaps)
      }
    }
    fetchzap()
  },[])
  console.log("zaps",zaps)

  
  return (
    <div className="relative flex flex-col gap-4">
    <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
      Dashboard
    </h1>
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-6 text-muted-foreground">
        Manage all your Task flow here.
       {
        zaps?.map((zap:any)=> <TaskFlowCard title={zap.name} zapSteps={zap.zapSteps} webhook='hrrp' isActive={zap.isActive} />)
       }
      </section>
    </div>
  </div>
  )
}

export default DashboardPage

// const ShowTable =(zaps:[]) =>{
//   return(
  
//   )
// }