import Draggable from "react-draggable"; 
import { newCommand, newActions, control, fill, end } from "@/lib/store";
import { useSnapshot } from "valtio";
import { useState, useEffect } from "react";

const DraggablePoint = (props) => {
  const newSnap = useSnapshot(newCommand.command);
const [position, setPosition] = useState({x:0, y:0});
useEffect(()=>{
  if(props.type==='firstControl'){
    setPosition({
      x: newSnap.firstControl.x,
      y: newSnap.firstControl.y
    })
  } else if(props.type==='secondControl'){
    setPosition({
      x: newSnap.secondControl.x,
      y: newSnap.secondControl.y
    })
  } else { setPosition({
      x: newSnap.endPoint.x,
      y: newSnap.endPoint.y
    })
  }
},[])
  const controlSnap = useSnapshot(control);const fillSnap= useSnapshot(fill)

  const endSnap = useSnapshot(end);

  const onDrag = (event, data) => {
    console.log("onDrag");
    console.log("position.x", position.x + data.deltaX);
    console.log("position.y", position.y + data.deltaY);
    if(event.target.id==='firstControl'){newActions.setFirstControl(position.x + data.deltaX, position.y + data.deltaY)
    } else if(props.type==='secondControl'){
    newActions.setSecondControl(position.x + data.deltaX, position.y + data.deltaY)
    } else {
    newActions.setEndPoint(position.x + data.deltaX, position.y + data.deltaY)
    }
    setPosition({
      x: position.x + data.deltaX,
      y: position.y + data.deltaY
    });
  };

  const onDragStop = (event, data) => {
    console.log("onDragStop");
    console.log("position.x", position.x);
    console.log("position.y", position.y);
  };
    const r = controlSnap.size;
    
    return (
      <Draggable x={position.x} y={position.y} onDrag={onDrag} onStop={onDragStop}>
        <circle cx={props.cx} cy={props.cy} r={r} stroke={controlSnap.color} strokeOpacity={controlSnap.opacity} fill={controlSnap.color} fillOpacity={controlSnap.opacity} />
      </Draggable>
    ) 
};

export default DraggablePoint;