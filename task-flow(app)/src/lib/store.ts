import {create} from "zustand"
import { v4 as uuidv4 } from 'uuid';
  
interface ZapStep{
    id:string,
    stepType: "TRIGGER" | "ACTION",
    triggerId?:string,
    actionId?:string,
    metaData?:any,
    orderPosition:number,
}



interface ZapStore {
    id:string,
    userId:number,
    name:string,
    zapSteps:ZapStep[]
    setName:(name:string) =>void,
    addZapStep:() => void,
    setZapStepTrigger:(zapStepId: string, triggerId: string) => void
    setZapStepAction:(zapStepId: string, actionId: string) => void
    setZapStepActionMetaData:(ZapStepId:string,metaData:any) => void
}

export const useZapStore = create<ZapStore>((set)=>({
    id:uuidv4(),
    name:"Untitled Taskflow",
    setName:(name)=>set({name}) ,
    userId:1,
    zapSteps:[{
        id:uuidv4(),
        orderPosition:0,
        stepType:"TRIGGER",
        metaData:{},
    },
    {
        id:uuidv4(),
        orderPosition:1,
        stepType:"ACTION",
        metaData:{},
    }],
    addZapStep: () =>
        set((state) => ({
          zapSteps: [
            ...state.zapSteps,
            {
              id: uuidv4(),
              orderPosition: state.zapSteps.length,
              stepType: "ACTION",
              metaData:{},
            },
          ],
        })),
    setZapStepTrigger:(zapStepId,triggerId)=>set((state)=>({
        zapSteps:state.zapSteps.map((step)=> step.id === zapStepId?{...step,triggerId:triggerId}:step)
    })),
    setZapStepAction:(zapStepId,actionId)=>set((state)=>({
        zapSteps:state.zapSteps.map((step)=>step.id===zapStepId?{...step,actionId:actionId}:step)
    })),
    setZapStepActionMetaData:(zapStepId,metadata)=>set((state)=>({
        zapSteps:state.zapSteps.map((step)=>step.id===zapStepId?{...step,metaData:metadata}:step)
    }))
}))

interface OptionsType {
    actions:{
    id:string,
    name:string,
    image:string,
    }[],
    triggers:{
        id:string,
        name:string,
        image:string,
    }[]
}

export const useOptions = create<OptionsType>(()=>({
    actions:[{
        id:"f5b7612d-4482-4bc2-9bb6-3c076accea5f",
        image:"https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-email-mail-application-vector-png-image_9183278.png",
        name:"Email"
    }],
    triggers:[{
        id:"645f2f25-b132-4d98-a715-ab501e8f8186",
        image:"https://plugins.jetbrains.com/files/16984/260965/icon/pluginIcon.png",
        name:"Webhook"
    }]
}))

