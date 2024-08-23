import { getPath } from "@/lib/mongodb/path/mongodb";

const path = await getPath();
const pathFromMap = path.map((command) => {
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

export const fullPath = `M50,50${pathFromMap}`;

const absolutePathFromMap = path.map((command) => {
  if (command.type==='c'){
    return(
      `${command.type}${command.controlPoints[0].d1.x+command.startPoint.x},${command.controlPoints[0].d1.y+command.startPoint.y} ${command.controlPoints[1].d2.x+command.startPoint.x},${command.controlPoints[1].d2.y+command.startPoint.y} ${command.endPoint.x+command.startPoint.x},${command.endPoint.y+command.startPoint.y}`
    )
  } else if (command.type==='q'){
    return(
      `${command.type}${command.controlPoints[0].d1.x+command.startPoint.x},${command.controlPoints[0].d1.y+command.startPoint.y} ${command.endPoint.x+command.startPoint.x},${command.endPoint.y+command.startPoint.y}`
    )
  } else if (command.type==='s'){
    return(
      `${command.type}${command.controlPoints[0].d2.x+command.startPoint.x},${command.controlPoints[0].d2.y+command.startPoint.y} ${command.endPoint.x+command.startPoint.x},${command.endPoint.y+command.startPoint.y}`
    )
  } else if (command.type==='h'){
    return(
      `${command.type}${command.endPoint.x+command.startPoint.x}`
    )
  } else if (command.type==='v'){
    return(
      `${command.type}${command.endPoint.y+command.startPoint.y}`
    )
  }else{
    return(
      `${command.type}${command.endPoint.x+command.startPoint.x},${command.endPoint.y+command.startPoint.y}`
    )
  }
});
 
export const absolutePath = `M50,50${absolutePathFromMap}`