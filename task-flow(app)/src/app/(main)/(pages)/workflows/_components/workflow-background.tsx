import React from "react";
import WorkFlowCard from "./workflow-card";
 
export function WorkflowBackground({children}:{children:React.ReactNode}) {
  return (
    <div className="min-h-[42rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
     
      <div className="flex flex-col gap-8 py-40"> 
      {children}

      </div>
      
    </div>
  );
}