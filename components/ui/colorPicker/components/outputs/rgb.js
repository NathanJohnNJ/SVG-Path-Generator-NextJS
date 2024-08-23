'use client';
import { useEffect } from "react";
import { ColourCode } from "colour-codes";
const RGB = (props) => {
  const { color, currentColor } = props;
  let rgbColour;
  color?rgbColour=ColourCode(color, 'rgb'):rgbColour=ColourCode(currentColor, 'rgb');
  let bgColour;
  color?bgColour=color:bgColour=currentColor

  return (
    <div className="flex justify-start items-center w-40 text-xs
    rounded-md py-1.5 border h-6" style={{borderColor: `${bgColour}`}}>
      <span className="flex justify-center items-center  text-slate-400 mr-2 py-1.5 w-10 h-6 rounded-tl-md rounded-bl-md" style={{backgroundColor: `${bgColour}`}}>RGB</span>
      <span className="w-20 text-center text-slate-300 whitespace-nowrap">{`${rgbColour}`}</span> 
    </div>
  )
};

export default RGB;