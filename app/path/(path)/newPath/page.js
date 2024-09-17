'use client';
import ChoosePath from "@/components/ui/choosePath";
import Title from "@/components/layouts/title";
import { StyledDiv } from "@/components/ui/panels/Panels";
import { useEffect } from "react";

export default async function NewPath() {
  useEffect(() => {
    localStorage.removeItem("path")
  }, [])



  return (
  <div className="flex flex-col items-center">
    <Title title="New Path"/>

    <div className=" flex flex-row items-center p-6">
    <StyledDiv className="flex flex-col items-center justify-center bg-sky-400 p-2 rounded-[1.4pc]">
      <div  className="p-4 w-full bg-stone-200 rounded-xl">
        <ChoosePath/>
      </div>
    </StyledDiv>
    </div>
  </div>
  );
}