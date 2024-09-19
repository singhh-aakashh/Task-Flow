"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

 
import { useModal } from "@/providers/modal-provider"
import { useEffect, useState } from "react"
import ShowOption from "./show-options"
import { getAction, getTrigger } from "@/lib/database"
import DrawerModal from "./drawer-modal"
import { useOptions } from "@/lib/store"


interface PropType{
  stepType:"ACTION"|"TRIGGER",
  id:string,
  trigger?:string|null,
  action?:string|null
}

type  OptionType =  {
  id: string;
  name: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
} | null | undefined


  export default function WorkFlowCard({stepType,id,trigger,action}:PropType){
    const [selectedOption,setSelectedOption] = useState<OptionType>()
    
    const availableOptions = useOptions();
    
    useEffect(()=>{
  
      if(trigger){
        setSelectedOption(availableOptions.triggers.find((tr)=>tr.id===trigger))
        }
    },[trigger])

    useEffect(()=>{
      if(action){
        setSelectedOption(availableOptions.actions.find((ac)=>ac.id===action))
        }
    },[action])

    const {setOpen} = useModal();
    const handle =() =>{
      setOpen(
       <ShowOption cardId={id} stepType={stepType} Options={stepType==="TRIGGER"?availableOptions.triggers:availableOptions.actions}/>
      )
    }
    return(
    <Card className="w-[400px]  flex flex-col "> 
  <CardHeader><button onClick={handle}>
    <CardTitle className="flex gap-4">
     {selectedOption&&<img src={selectedOption.image} className="h-10 w-10"/>} {selectedOption?selectedOption?.name:stepType}
     </CardTitle>
    </button>
  </CardHeader>
  <CardContent>
    {/* Drawer button  */}
   { selectedOption && stepType==="ACTION" && <Button variant={"outline"} onClick={()=>setOpen(<DrawerModal id={id} name={selectedOption.name}/>)}>{trigger? "Test" :selectedOption.name}</Button>}
  </CardContent>

</Card>
    )
  }





 