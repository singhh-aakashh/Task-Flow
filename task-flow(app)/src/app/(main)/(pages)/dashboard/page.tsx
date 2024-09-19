"use client"
import {  getUserZaps,  } from '@/lib/database';
import React, { useEffect, useState } from 'react'

import TaskFlowCard from './_components/task-flow-cards';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


type Zap = {
  id: string;
  name: string;
  isActive:boolean;
  zapSteps: {
    trigger: {
      id: string;
      name: string;
      image: string;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    action: {
      id: string;
      name: string;
      image: string;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }[];
};

type ZapArray = Zap[]|null;

const DashboardPage = () => {
  const router = useRouter();
  const [zaps,setZaps]=useState<ZapArray>();
  useEffect(()=>{
    const fetchzap = async ()=>{
      const Allzaps = await getUserZaps();
      setZaps(Allzaps)
    }
    fetchzap()
  },[])

  return (
    <div className="relative flex flex-col gap-4">
    <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
      Dashboard
      <button onClick={()=>router.push("/workflows")} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          <Plus/>
        </span>
      </button>
    </h1>
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-6 text-muted-foreground">
        Manage all your Task flow here.
       {
        zaps?.map((zap:Zap)=><TaskFlowCard title={zap.name} zapSteps={zap.zapSteps} zapId={zap.id} isActive={zap.isActive} />)
       }
      </section>
    </div>
  </div>
  )
}

export default DashboardPage
