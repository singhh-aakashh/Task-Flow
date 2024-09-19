"use client"
import React, { useState } from 'react'
import Workflow from './_components/workflow'
import axios from "axios"
import { useZapStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

type Props = {}

const Page = () => {
  const [isdisable,setIsdisable]=useState<boolean>(false)
  const router = useRouter();
  const zapState = useZapStore();


  const handlePublish = async () =>{
    setIsdisable(true)
    const res =  await axios.post("/api/create-zap",{
      id:zapState.id,
      name:zapState.name,
      zapSteps:zapState.zapSteps,
    })
    if(res?.data.status === "success"){
      router.push("/dashboard");
    }
   setIsdisable(false)
  }
  return (
    <div className="flex flex-col relative">
      <div className='flex flex-col sticky  top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg border-b'>
      <h1 className="text-4xl  flex items-center  justify-between font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
        Workflows
        <button className="p-[1px] w-40 relative" disabled={isdisable} onClick={handlePublish}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-2 text-xl py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          Publish
        </div>
      </button>
      </h1>
      <p className="pt-2 text-xl sm:text-xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
        Create a new work flow
      </p>
      </div>
      <Workflow type='New'/>
    </div>
  )
}

export default Page