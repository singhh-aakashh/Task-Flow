import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useZapStore } from "@/lib/store";
import { useModal } from "@/providers/modal-provider";

import React from "react";

type Props = {
  Options:
    {
      id: string;
      name: string;
      image: string;
    }[],
    cardId:string,
    stepType:"ACTION"|"TRIGGER"
};

const ShowOption = ({ Options , cardId , stepType}: Props) => {
  const { isOpen, setClose } = useModal();


  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Trigger</DialogTitle>
        </DialogHeader>
       {
        Options?.map((option) => <OptionCard stepType={stepType} id={option.id} cardId={cardId} name={option.name} image={option.image}/>)
       }
      </DialogContent>
    </Dialog>
  );
};

export default ShowOption;


interface OptionCardProp{
  name:string,
  image:string,
  cardId:string,
  id:string,
  stepType:"ACTION"|"TRIGGER"
}
function OptionCard({name,image,cardId,id,stepType}:OptionCardProp){
const {setClose} = useModal();
const zapState = useZapStore()
const handle = () =>{
  if(stepType==="ACTION"){
  zapState.setZapStepAction(cardId,id)
  }else{
    zapState.setZapStepTrigger(cardId,id)
  }
  setClose();
}
  return(
    <button onClick={handle}>
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-black dark:border-gray-700 dark:hover:bg-dot-zinc-700">
      <h5 className="mb-2 flex gap-4 items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <img src={image} className="h-10 w-10"/>
       {name}
      </h5>
    </div>
    </button>
   
  )
}
