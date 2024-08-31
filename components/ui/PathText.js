import { useContext, useEffect } from "react";
import { path } from "@/lib/store";

const PathText = () => {
  console.log(path.commands);
  const pathFromMap = path.commands.map((command) => {
    if (command.type==='c'){
      return(
        `${command.type}${command.controlPoints[0].d1.x},${command.controlPoints[0].d1.y} ${command.controlPoints[1].d2.x},${command.controlPoints[1].d2.y} ${command.endPoint.x},${command.endPoint.y}`
      )
    } else if (command.type==='q'){
      return(
        `${command.type}${command.controlPoints[0].d1.x},${command.controlPoints[0].d1.y} ${command.endPoint.x},${command.endPoint.y}`
      )
    } else if (command.type==='s'){
      return(
        `${command.type}${command.controlPoints[0].d2.x},${command.controlPoints[0].d2.y} ${command.endPoint.x},${command.endPoint.y}`
      )
    } else if (command.type==='h'){
      return(
        `${command.type}${command.endPoint.x}`
      )
    } else if (command.type==='v'){
      return(
        `${command.type}${command.endPoint.y}`
      )
    }else{
      return(
        `${command.type}${command.endPoint.x},${command.endPoint.y}`
      )
    }
  });

  const absolutePathFromMap = path.commands.map((command) => {
    if (command.type==='c'){
      return(
        `${command.type.toUpperCase()}${Number(command.controlPoints[0].d1.x)+Number(command.startPoint.x)},${Number(command.controlPoints[0].d1.y)+Number(command.startPoint.y)} ${Number(command.controlPoints[1].d2.x)+Number(command.startPoint.x)},${Number(command.controlPoints[1].d2.y)+Number(command.startPoint.y)} ${Number(command.endPoint.x)+Number(command.startPoint.x)},${Number(command.endPoint.y)+Number(command.startPoint.y)}`
      )
    } else if (command.type==='q'){
      return(
        `${command.type.toUpperCase()}${Number(command.controlPoints[0].d1.x)+Number(command.startPoint.x)},${Number(command.controlPoints[0].d1.y)+Number(command.startPoint.y)} ${Number(command.endPoint.x)+Number(command.startPoint.x)},${Number(command.endPoint.y)+Number(command.startPoint.y)}`
      )
    } else if (command.type==='s'){
      return(
        `${command.type.toUpperCase()}${Number(command.controlPoints[0].d2.x)+Number(command.startPoint.x)},${Number(command.controlPoints[0].d2.y)+Number(command.startPoint.y)} ${Number(command.endPoint.x)+Number(command.startPoint.x)},${Number(command.endPoint.y)+Number(command.startPoint.y)}`
      )
    } else if (command.type==='h'){
      return(
        `${command.type.toUpperCase()}${Number(command.endPoint.x)+Number(command.startPoint.x)}`
      )
    } else if (command.type==='v'){
      return(
        `${command.type.toUpperCase()}${Number(command.endPoint.y)+Number(command.startPoint.y)}`
      )
    }else{
      return(
        `${command.type.toUpperCase()}${Number(command.endPoint.x)+Number(command.startPoint.x)},${Number(command.endPoint.y)+Number(command.startPoint.y)}`
      )
    }
  });

  const fullPath = `M${path.startPoint.x},${path.startPoint.y}${pathFromMap}`;
  const absolutePath = `M${path.startPoint.x},${path.startPoint.y}${absolutePathFromMap}`

  return (
    <div className="self-center p-2">
      <h2 id="topText" className="group flex text-[9.5px] py-1.5 px-1 hover:text-sm text-blue-600 bg-neutral-50 rounded-2xl p-1 border-slate-600 border-2 m-1"><span className="group p-1 bg-slate-600/15 rounded-md w-max"><span className="group-hover:hidden">Full Relative Path: </span>{fullPath}</span></h2>
      <h2 id="bottomText" className="group flex text-[9.5px] py-1.5 px-1 hover:text-sm  text-blue-600 bg-neutral-50 rounded-2xl p-1 border-slate-600 border-2 m-1"><span className="group p-1 bg-slate-600/15 rounded-md w-max"><span className="group-hover:hidden">Full Absolute Path: </span>{absolutePath}</span></h2>
    </div>
  )
}

export default PathText;