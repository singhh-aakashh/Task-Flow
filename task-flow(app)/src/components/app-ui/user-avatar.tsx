"use client"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { getCurrentUser } from "@/lib/database"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { logout } from "@/actions/logout"
import { useRouter } from "next/navigation"
import { CircleUser } from "lucide-react"
  
export  function UserAvatar() {
  const router = useRouter();
    const [user,setUser] = useState<any>();
    useEffect(()=>{
        const fetch = async () =>{
            const checkuser = await getCurrentUser();
            setUser(checkuser)
        }
        fetch()
    },[])

    const handle = async () =>{
      await logout();
      router.push("/sign-in")
    }
   
    return (
        <Popover>
  <PopoverTrigger>
    <Avatar>
        <AvatarFallback>{user?.name ? <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
              </Button>:""}</AvatarFallback>
      </Avatar>
      </PopoverTrigger>
  <PopoverContent className="mt-7 mr-3 p-4 space-y-4 flex flex-col ">
    <div className="text-xl flex justify-between font-medium mx-2">
        <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
        {user?.name}
    </div>
    <Button variant={"outline"} onClick={handle}>logout</Button>
    </PopoverContent>
</Popover>
    
    )
  }
  