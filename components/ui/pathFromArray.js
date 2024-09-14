'use client';
import { Path, G, Defs, ClipPath, Rect, Svg } from "react-native-svg-web";
import { path, stroke, fill, selectedActions } from '@/lib/store'
import { useSnapshot } from "valtio";

const PathFromArray = (props) => {
  const pathSnap = useSnapshot(path);
  const strokeSnap = useSnapshot(stroke);
  const fillSnap = useSnapshot(fill); 
  const hoverWidth = strokeSnap.width*2;

  function hoverFunc(id){
    const i = document.getElementById(id)
    i.setAttributeNS(null, 'stroke-width', hoverWidth)
    i.setAttributeNS(null, 'stroke', strokeSnap.highlight)
    i.setAttributeNS(null, 'fill', fillSnap.highlight)
  }
  function resetHover(id){
    const i = document.getElementById(id)
    i.setAttributeNS(null, 'stroke-width', strokeSnap.width)
    i.setAttributeNS(null, 'stroke', strokeSnap.color)
    i.setAttributeNS(null, 'fill', fillSnap.color)
  }

  function pressFunc(command){
    props.setSelected(command)
    selectedActions.setType(command.type)
    selectedActions.setId(command.commandId)
    selectedActions.setStartPoint(command.startPoint.x, command.startPoint.y);
    selectedActions.setStartPoint(command.startPoint.x, command.startPoint.y);
    selectedActions.setEndPoint(command.endPoint.x, command.endPoint.y);
    if(command.type==='c'){
      selectedActions.setFirstControl(command.firstControl.x, command.firstControl.y);
      selectedActions.setSecondControl(command.secondControl.x, command.secondControl.y);
    } else if(command.type==='q'){
      selectedActions.setFirstControl(command.firstControl.x, command.firstControl.y);
    } else if(command.type==='s'){
      selectedActions.setFirstControl(command.secondControl.x, command.secondControl.y);
    }
  }
  const viewBox = `0 0 ${props.size} ${props.size}`
  return(
    <G id="pathGroup" height={props.size} width={props.size} viewBox={viewBox} >
      {
        pathSnap.commands.map((command, i) => {
          let d;
          if(command.type==="c"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.firstControl.x},${command.firstControl.y} ${command.secondControl.x},${command.secondControl.y} ${command.endPoint.x},${command.endPoint.y}`;
              return(
                <Path d={d} id={command.commandId} key={i} fill={fillSnap.color} fillOpacity={fillSnap.opacity} stroke={strokeSnap.color} strokeWidth={strokeSnap.width} strokeOpacity={strokeSnap.opacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
              )
            } else if(command.type==="q" || command.type==="s"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.firstControl.x},${command.firstControl.y} ${command.endPoint.x},${command.endPoint.y}`;
              return(
                <Path d={d} id={command.commandId} key={i} fill={fillSnap.color} fillOpacity={fillSnap.opacity} stroke={strokeSnap.color} strokeWidth={strokeSnap.width} strokeOpacity={strokeSnap.opacity}  onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
              )
            } else if(command.type==="l"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.x},${command.endPoint.y}`;
              return(
                <Path d={d} id={command.commandId} key={i} fill={fillSnap.color} fillOpacity={fillSnap.opacity} stroke={strokeSnap.color} strokeWidth={strokeSnap.width} strokeOpacity={strokeSnap.opacity}  onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
              )
            } else if(command.type==="v"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.y}`;
              return(
                <Path d={d} id={command.commandId} key={i} fill={fillSnap.color} fillOpacity={fillSnap.opacity} stroke={strokeSnap.color} strokeWidth={strokeSnap.width} strokeOpacity={strokeSnap.opacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
              )
            } else if(command.type==="h"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.x}`;
              return(
                <Path d={d} id={command.commandId} key={i} fill={fillSnap.color} fillOpacity={fillSnap.opacity} stroke={strokeSnap.color} strokeWidth={strokeSnap.width} strokeOpacity={strokeSnap.opacity}  onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
              )
            } 
            else if(command.type==="t"){
              d = `M${pathSnap[command.commandId-1].startPoint.x},${pathSnap[command.commandId-1].startPoint.y}q${pathSnap[command.commandId-1].controlPoints[0].value},${pathSnap[command.commandId-1].controlPoints[1].value} ${pathSnap[command.commandId-1].endPoint.x},${pathSnap[command.commandId-1].endPoint.y}t${command.endPoint.x},${command.endPoint.y}`
              const width = props.size-pathSnap[command.commandId-1].startPoint.x
              return(
              <Svg key={i+200}  height={props.size} width={props.size} viewBox={viewBox} x="0" y="0">
                <Defs>
                  <ClipPath id="clip">
                    <Rect x={pathSnap[command.commandId-1].startPoint.x+pathSnap[command.commandId-1].endPoint.x} y="0" width={width} height={props.size} />
                  </ClipPath>
                </Defs>
                <G id="pathGroup" height={props.size} width={props.size} viewBox={viewBox} key={i+300} >
                  <Path d={d} id={command.commandId} key={i} fill={fillSnap.color} fillOpacity={fillSnap.opacity} stroke={strokeSnap.color} strokeWidth={strokeSnap.width} strokeOpacity={strokeSnap.opacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} clipPath="url(#clip)" />
                </G>
              </Svg>
            )
          }
        })
      }
    </G>
  ) 
};

export default PathFromArray;