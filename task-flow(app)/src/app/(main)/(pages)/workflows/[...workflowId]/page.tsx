"use client"
import { getZapById } from '@/lib/database'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Workflow from '../_components/workflow'

type Props = {}

const page = (props: Props) => {
    const {workflowId}  = useParams(); 
    const [zap,setZap] = useState<any>();
    useEffect(()=>{
        const fetchzap = async ()=>{
         
          const zap = await getZapById(workflowId[0]);
          if(zap){
            setZap(zap)
          }
        }
        fetchzap()
      },[])
  return (
    <div className="flex flex-col relative">
    <div className='flex flex-col sticky  top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg border-b'>
    <h1 className="text-4xl  flex items-center  justify-between font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
      Workflows
      <button  className="p-[1px] w-40 relative" >
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
    <Workflow type='New' zap={zap}/>
  </div>
  )
}

export default page