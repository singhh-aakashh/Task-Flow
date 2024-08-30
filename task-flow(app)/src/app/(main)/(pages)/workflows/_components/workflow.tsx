"use client";
import WorkFlowCard from "./workflow-card";
import { useZapStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Workflow() {
  const zapState = useZapStore();
  return (
    <div className="flex flex-col p-10 min-h-[40rem] gap-4 bg-dot-slate-800 ">
      <Input
        value={zapState.name}
        className="w-52 text-xl"
        onChange={(e) => zapState.setName(e.target.value)}
      />
      <div className="flex justify-center items-center flex-col gap-5">
        {zapState?.zapSteps.map((zap, index) => (
          <WorkFlowCard
            key={index}
            id={zap.id}
            trigger={zap?.triggerId}
            action={zap?.actionId}
            stepType={zap.stepType}
          />
        ))}
        <Button
          variant={"outline"}
          size={"icon"}
          className="mx-auto"
          onClick={() => zapState.addZapStep()}
        >
          <Plus />
        </Button>
        <Button
        variant={"outline"}
        onClick={()=>console.log(zapState)}>
         console
        </Button>
      </div>
    </div>
  );
}
