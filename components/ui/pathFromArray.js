'use client';
import { Path, G, Defs, ClipPath, Rect, Svg } from "react-native-svg-web";
import { addToTableInfo } from "@/lib/mongodb/tables/mongodb";

const PathFromArray = (props) => {
    const hoverWidth = props.strokeWidth*2;
    
    function hoverFunc(id){
      const i = document.getElementById(id)
      i.setAttributeNS(null, 'stroke-width', hoverWidth)
      i.setAttributeNS(null, 'stroke', props.strokeHighlight)
      i.setAttributeNS(null, 'fill', props.fillHighlight)
    }
    function resetHover(id){
      const i = document.getElementById(id)
      i.setAttributeNS(null, 'stroke-width', props.strokeWidth)
      i.setAttributeNS(null, 'stroke', props.strokeColor)
      i.setAttributeNS(null, 'fill', props.fillColor)
    }

    function pressFunc(path){
      props.setSelected(path)
      console.log(props.selected)

      // props.setShowTable(true)
    }
    const viewBox = `0 0 ${props.size} ${props.size}`
    return(
      <G id="pathGroup" height={props.size} width={props.size} viewBox={viewBox} >
        {
            props.path.map((command, i) => {
                let d;
                if(command.type==="c"){
                    d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.controlPoints[0].d1.x},${command.controlPoints[0].d1.y} ${command.controlPoints[1].d2.x},${command.controlPoints[1].d2.y} ${command.endPoint.x},${command.endPoint.y}`;
                    return(
                      <Path d={d} id={command.commandId} key={i} fill={props.fillColor} fillOpacity={props.fillOpacity} stroke={props.strokeColor} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
                    )
                  } else if(command.type==="q" || command.type==="s"){
                    d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.controlPoints[0].d1.x},${command.controlPoints[0].d1.y} ${command.endPoint.x},${command.endPoint.y}`;
                    return(
                      <Path d={d} id={command.commandId} key={i} fill={props.fillColor} fillOpacity={props.fillOpacity} stroke={props.strokeColor} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity}  onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
                    )
                  } else if(command.type==="l"){
                    d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.x},${command.endPoint.y}`;
                    return(
                      <Path d={d} id={command.commandId} key={i} fill={props.fillColor} fillOpacity={props.fillOpacity} stroke={props.strokeColor} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity}  onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
                    )
                  } else if(command.type==="v"){
                    d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.y}`;
                    return(
                      <Path d={d} id={command.commandId} key={i} fill={props.fillColor} fillOpacity={props.fillOpacity} stroke={props.strokeColor} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
                    )
                  } else if(command.type==="h"){
                    d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.x}`;
                    return(
                      <Path d={d} id={command.commandId} key={i} fill={props.fillColor} fillOpacity={props.fillOpacity} stroke={props.strokeColor} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity}  onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
                    )
                  } 
                  else if(command.type==="t"){
                    d = `M${props.path[command.commandId-1].startPoint.x},${props.path[command.commandId-1].startPoint.y}q${props.path[command.commandId-1].controlPoints[0].value},${props.path[command.commandId-1].controlPoints[1].value} ${props.path[command.commandId-1].endPoint.x},${props.path[command.commandId-1].endPoint.y}t${command.endPoint.x},${command.endPoint.y}`
                    const width = props.size-props.path[command.commandId-1].startPoint.x
                    return(
                      <Svg key={i+200}  height={props.size} width={props.size} viewBox={viewBox} x="0" y="0">
                        <Defs>
                          <ClipPath id="clip">
                            <Rect x={props.path[command.commandId-1].startPoint.x+props.path[command.commandId-1].endPoint.x} y="0" width={width} height={props.size} />
                          </ClipPath>
                        </Defs>
                        <G id="pathGroup" height={props.size} width={props.size} viewBox={viewBox} key={i+300} >c
                          <Path d={d} id={command.commandId} key={i} fill={props.fillColor} fillOpacity={props.fillOpacity} stroke={props.strokeColor} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} clipPath="url(#clip)" />
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