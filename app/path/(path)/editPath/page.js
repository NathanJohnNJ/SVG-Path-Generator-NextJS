'use client';
import Title from "@/components/layouts/title";
import { useState } from "react";
import Link from "next/link";
import { StyledDiv } from "@/components/ui/panels/Panels";
import { RainbowButton } from "@/components/ui/panels/RainbowPanel";
import { setPath, setStartX, setStartY } from "@/lib/store";
import { startingX, startingY, convertToPathArray } from "@/components/forms/InputPath";
export default function EditPath() {
  const [input, setInput] = useState('');

  function clickHandle(){
    const pathArray = convertToPathArray(input);
    setPath(pathArray);
    const startX = startingX(input);
    setStartX(startX);
    const startY = startingY(input);
    setStartY(startY);
  }

  return (
    <div className="flex flex-col items-center h-[64vh]">
      <Title title="Edit Path" />
      <div className=" flex flex-row items-center p-4">
        <StyledDiv className="flex flex-col items-center justify-center bg-sky-400 p-2 rounded-[1.4pc]">
          <form className="flex flex-col items-center w-full justify-center bg-zinc-100 p-4 rounded-[1pc]">
            <p className="text-zinc-800 text-sm w-[90%] text-center">Enter the 'd' attribute from an existing SVG Path then hit the 'Sumit Path' button to see the path on a grid where you will be able to edit the individual commands in the path to get the perfect shape. You'll also be able to customise the style of the path including 'stroke' and 'fill' attributes, with more options coming soon . . .</p>
            <input value={input} onChange={(e) => setInput(e.target.value)} className="text-black m-4 bg-zinc-200 rounded-md"/>
            <RainbowButton onClick={clickHandle}>
              <Link href="/path/viewPath" onClick={clickHandle}>
                Submit Path!
              </Link>
            </RainbowButton>
          </form>
        </StyledDiv>
      </div>
    </div>
  );
}