'use client';
import { Path, G, Defs, ClipPath, Rect, Svg } from "react-native-svg-web";

const PathFromArray = (props) => {
    const hoverWidth = props.stroke.width*2;

    function hoverFunc(id){
        const i = document.getElementById(id)
        i.setAttributeNS(null, 'stroke-width', hoverWidth)
        i.setAttributeNS(null, 'stroke', props.stroke.highlight)
        i.setAttributeNS(null, 'fill', props.fill.highlight)
    }
    function resetHover(id){
        const i = document.getElementById(id)
        i.setAttributeNS(null, 'stroke-width', props.stroke.width)
        i.setAttributeNS(null, 'stroke', props.stroke.colour)
        i.setAttributeNS(null, 'fill', props.fill.colour)
    }

    function pressFunc(path){
        // props.setInfo(path)
        // props.setShowBtn(true)
        if(path.type==="q" || path.type==="s"){
            props.setFirstCtrl({x: path.controlPoints[0].value, y: path.controlPoints[1].value})
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else if (props.type==="c"){
            props.setFirstCtrl({x: path.controlPoints.dx1, y: path.controlPoints.dy1})
            props.setSecondCtrl({x: path.controlPoints.dx2, y: path.controlPoints.dy2})
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else{
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        }
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
                      <Path d={d} id={command.commandId} key={i} fill={props.fill.colour} fillOpacity={props.fill.opacity} stroke={props.stroke.colour} strokeWidth={props.stroke.width} strokeOpacity={props.stroke.opacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
                    )
                  } else if(command.type==="q" || command.type==="s"){
                    d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.controlPoints[0].d1.x},${command.controlPoints[0].d1.y} ${command.endPoint.x},${command.endPoint.y}`;
                    return(
                      <Path d={d} id={command.commandId} key={i} fill={props.fill.colour} fillOpacity={props.fill.opacity} stroke={props.stroke.colour} strokeWidth={props.stroke.width} strokeOpacity={props.stroke.opacity}  onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
                    )
                  } else if(command.type==="l"){
                    d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.x},${command.endPoint.y}`;
                    return(
                      <Path d={d} id={command.commandId} key={i} fill={props.fill.colour} fillOpacity={props.fill.opacity} stroke={props.stroke.colour} strokeWidth={props.stroke.width} strokeOpacity={props.stroke.opacity}  onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
                    )
                  } else if(command.type==="v"){
                    d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.y}`;
                    return(
                      <Path d={d} id={command.commandId} key={i} fill={props.fill.colour} fillOpacity={props.fill.opacity} stroke={props.stroke.colour} strokeWidth={props.stroke.width} strokeOpacity={props.stroke.opacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
                    )
                  } else if(command.type==="h"){
                    d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.x}`;
                    return(
                      <Path d={d} id={command.commandId} key={i} fill={props.fill.colour} fillOpacity={props.fill.opacity} stroke={props.stroke.colour} strokeWidth={props.stroke.width} strokeOpacity={props.stroke.opacity}  onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} />
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
                        <G id="pathGroup" height={props.size} width={props.size} viewBox={viewBox} key={i+300} >
                          <Path d={d} id={command.commandId} key={i} fill={props.fill.colour} fillOpacity={props.fill.opacity} stroke={props.stroke.colour} strokeWidth={props.stroke.width} strokeOpacity={props.stroke.opacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.commandId)} onMouseLeave={() => resetHover(command.commandId)} clipPath="url(#clip)" />
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