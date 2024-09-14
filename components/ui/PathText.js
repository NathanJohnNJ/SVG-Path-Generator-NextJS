import { path } from "@/lib/store";

const PathText = () => {
  const pathFromMap = path.commands.map((command) => {
    if (command.type==='c'){
      return(
        `${command.type}${command.firstControl.x},${command.firstControl.y} ${command.secondControl.x},${command.secondControl.y} ${command.endPoint.x},${command.endPoint.y}`
      )
    } else if (command.type==='q'){
      return(
        `${command.type}${command.firstControl.x},${command.firstControl.y} ${command.endPoint.x},${command.endPoint.y}`
      )
    } else if (command.type==='s'){
      return(
        `${command.type}${command.secondControl.x},${command.controlPoints[0].d2.y} ${command.endPoint.x},${command.endPoint.y}`
      )
    } else if (command.type==='h'){
      return(
        `${command.type}${command.endPoint.x}`
      )
    } else if (command.type==='v'){
      return(
        `${command.type}${command.endPoint.y}`
      )
    } else if (command.type==='m' || command.type==='M'){
      return(
        ''
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
        `${command.type.toUpperCase()}${Number(command.firstControl.x)+Number(command.startPoint.x)},${Number(command.firstControl.y)+Number(command.startPoint.y)} ${Number(command.secondControl.x)+Number(command.startPoint.x)},${Number(command.secondControl.y)+Number(command.startPoint.y)} ${Number(command.endPoint.x)+Number(command.startPoint.x)},${Number(command.endPoint.y)+Number(command.startPoint.y)}`
      )
    } else if (command.type==='q'){
      return(
        `${command.type.toUpperCase()}${Number(command.firstControl.x)+Number(command.startPoint.x)},${Number(command.firstControl.y)+Number(command.startPoint.y)} ${Number(command.endPoint.x)+Number(command.startPoint.x)},${Number(command.endPoint.y)+Number(command.startPoint.y)}`
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
    } else if (command.type==='m' || command.type==='M'){
      return(
        ''
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
    <div className="flex flex-col justify-center self-center p-2  items-center w-full">
      <h2 id="topText" className="group w-full font-semibold flex text-[9.75px] py-1 px-3 hover:text-sm text-blue-600 bg-[#ebebeb] rounded-2xl p-1 border-slate-600 border-2 m-1"><span className="group p-1 px-2 bg-slate-600/15 rounded-md w-full"><span className="group-hover:hidden">Full Relative Path: </span>{fullPath}</span></h2>
      <h2 id="bottomText" className="group w-full font-semibold flex text-[9.75px] py-1 px-3 hover:text-sm text-blue-600 bg-[#ebebeb] rounded-2xl p-1 border-slate-600 border-2 m-1"><span className="group p-1 px-2 bg-slate-600/15 rounded-md w-full"><span className="group-hover:hidden">Full Absolute Path: </span>{absolutePath}</span></h2>
    </div>
  )
}

export default PathText;