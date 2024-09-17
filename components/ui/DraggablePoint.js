import Draggable from "react-draggable"; 
import { newCommand, newActions, control, fill, end } from "@/lib/store";
import { useSnapshot } from "valtio";
import { useState, useEffect } from "react";

const DraggablePoint = (props) => {
  const newSnap = useSnapshot(newCommand).command;
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
  const controlSnap = useSnapshot(control);
  const fillSnap= useSnapshot(fill)
  const endSnap = useSnapshot(end);

  const onDrag = (event, data) => {
    console.log("onDrag");
    console.log("position.x", position.x + data.deltaX);
    console.log("position.y", position.y + data.deltaY);
    if(event.target.id==='firstControl'){newActions.setFirstControl(position.x + data.deltaX, position.y + data.deltaY)
      console.log('firstControl')
    } else if(props.type==='secondControl'){
    newActions.setSecondControl(position.x + data.deltaX, position.y + data.deltaY)
    console.log('secondControl')
    } else {
    newActions.setEndPoint(position.x + data.deltaX, position.y + data.deltaY)
    console.log('endPoint')
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
    const fillColor = () => {
      if(props.type==="firstControl" || props.type==="secondControl"){
        return controlSnap.color;
      } else {
        return endSnap.color;
      }
    }
    const fillOpacity = () => {
      if(props.type==="firstControl" || props.type==="secondControl"){
        return controlSnap.opacity;
      } else {
        return endSnap.opacity;
      }
    }
    return (
      <Draggable x={position.x} y={position.y} onDrag={onDrag} onStop={onDragStop}>
        <circle id={props.type} cx={props.cx} cy={props.cy} r={r} stroke={fillColor()} strokeOpacity={controlSnap.opacity} fill={fillColor()} fillOpacity={fillOpacity()} />
      </Draggable>
    ) 
};

export default DraggablePoint;