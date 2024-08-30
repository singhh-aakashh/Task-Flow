"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
   
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from '@/components/ui/drawer'
import { useModal } from "@/providers/modal-provider"
import { useEffect, useState } from "react"
import ShowOption from "./show-options"
import { useZapStore } from "@/lib/store"
import { getAction, getAvailableAction, getAvailableTrigger, getTrigger, getwebhookdata } from "@/lib/database"

interface PropType{
  stepType:"ACTION"|"TRIGGER",
  id:string,
  trigger?:string|null,
  action?:string|null
}
  export default function WorkFlowCard({stepType,id,trigger,action}:PropType){
    const zapState = useZapStore()
    const [selectedOption,setSelectedOption] = useState<any>()
    const [availableTrigger,setAvailableTrigger]=useState<any>()
    const [availableAction,setAvailableAction]=useState<any>()

    useEffect(()=>{
       const fetch = async () =>{
        const triggers = await getAvailableTrigger()
          setAvailableTrigger(triggers)
          const actions = await getAvailableAction()
          setAvailableAction(actions)
       }
       fetch()
    },[])

    useEffect(()=>{
      console.log("trigger from card ",trigger)
      if(trigger){
        console.log("inside if condition")
       
         getTrigger(trigger).then(res => setSelectedOption(res))
        }
       
    },[trigger])

    useEffect(()=>{
      if(action){
       
         getAction(action).then(res => setSelectedOption(res))
        }
       
    },[action])

    const {setOpen} = useModal();
    const handle =() =>{
      setOpen(
       <ShowOption cardId={id} stepType={stepType} Options={stepType==="TRIGGER"?availableTrigger:availableAction}/>
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
   { selectedOption&& <Button variant={"outline"} onClick={()=>setOpen(<CustomModal name={selectedOption.name}/>)}>{selectedOption.name}</Button>}
  </CardContent>

</Card>
    )
  }

  function CustomModal({name}:{name:string}){
    const [data,setData]= useState<any>();
    const [key,setKey]=useState<any>();
    const {isOpen,setClose} =useModal()
    const handleClose = () => setClose()
    const getdata = async() =>{
      const webdata = await getwebhookdata()
      setData(webdata?.data)
      console.log(data)
      setKey(Object.keys(data))
      
    }
    return(
      <Drawer
      open={isOpen}
      onClose={handleClose}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-5xl text-center">{name}</DrawerTitle>
          <DrawerDescription className="text-center flex flex-col items-center gap-4 h-96 overflow-scroll">
            {/* try :: https://localhost:3000/api/webhook <Button onClick={getdata}>Test</Button> */}
          </DrawerDescription>
          {/* {
           key?.map((k:any)=><Button>{k}</Button>)
          } */}
        </DrawerHeader>
        <DrawerFooter className="flex flex-col gap-4 bg-background border-t-[1px] border-t-muted">
          <DrawerClose>
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleClose}
            >
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    )
  }