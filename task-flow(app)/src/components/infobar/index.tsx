'use client'
import React, { useEffect } from 'react'
import { ModeToggle } from '../global/mode-toggle'
import { Book, Headphones, Search } from 'lucide-react'
import Templates from '../icons/cloud_download'
import { Input } from '@/components/ui/input'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { UserButton } from '@clerk/nextjs'


type Props = {}

const InfoBar = (props: Props) => {


  return (
    <div className="flex flex-row justify-between gap-6 items-center px-4 py-4 w-full dark:bg-black ">
    <p className="text-xl sm:text-3xl font-bold relative z-1 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
        Task Flow
      </p>
      <div className='flex flex-row  gap-6 items-center'>
      <span className="flex items-center rounded-full bg-muted px-4">
        <Search />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent"
        />
      </span>
     
      <UserButton />
    </div>
    </div>
  )
}


export default InfoBar