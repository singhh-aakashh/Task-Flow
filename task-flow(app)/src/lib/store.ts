import {create} from "zustand"
import { v4 as uuidv4 } from 'uuid';
  
interface ZapStep{
    id:string,
    stepType: "TRIGGER" | "ACTION",
    triggerId?:string,
    actionId?:string,
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
}

//WIP: fix userId


export const useZapStore = create<ZapStore>((set)=>({
    id:uuidv4(),
    name:"Untitled Taskflow",
    setName:(name)=>set({name}) ,
    userId:1,
    zapSteps:[{
        id:uuidv4(),
        orderPosition:0,
        stepType:"TRIGGER",
    },
    {
        id:uuidv4(),
        orderPosition:1,
        stepType:"ACTION"
    }],
    addZapStep: () =>
        set((state) => ({
          zapSteps: [
            ...state.zapSteps,
            {
              id: uuidv4(),
              orderPosition: state.zapSteps.length,
              stepType: "ACTION",
            },
          ],
        })),
    setZapStepTrigger:(zapStepId,triggerId)=>set((state)=>({
        zapSteps:state.zapSteps.map((step)=> step.id === zapStepId?{...step,triggerId:triggerId}:step)
    })),
    setZapStepAction:(zapStepId,actionId)=>set((state)=>({
        zapSteps:state.zapSteps.map((step)=>step.id===zapStepId?{...step,actionId:actionId}:step)
    }))
}))

