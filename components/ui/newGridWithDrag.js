import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native-web';
import React from 'react';
import Grid from './Grid';
import { G, Circle } from 'react-native-svg-web';
import { path, newCommand, newActions, control, end, stroke, fill } from '@/lib/store';
import { useSnapshot } from 'valtio';
import { Draggable } from 'react-draggable';
import DraggablePoint from './DraggablePoint';

// const Points = () => {
//   function endDrag() {
//       if(!selectedElement===null){
//         setSelectedElement(null);
//       }else{
//         setSelectedElement(null);
//       }
//     }
    
    // function startDrag(evt) {
    // console.log(evt.classList);
    //   evt.preventDefault()
    //   if (evt.target.classList.contains('draggable')) {
    //     setSelectedElement(evt.target);
    //     let offset = getMousePosition(evt);
    //     let numX = offset.x - parseFloat(evt.target.getAttributeNS(null, "cx"))
    //     let numY = offset.y - parseFloat(evt.target.getAttributeNS(null, "cy"))
    //     setOffsetX(Math.round( ( numX + Number.EPSILON ) * 100 ) / 100)
    //     setOffsetY(Math.round( ( numY + Number.EPSILON ) * 100 ) / 100)
    //   }
    // }
    // const newSnap = useSnapshot(newCommand.command);
    // const endSnap = useSnapshot(end);
        // if(newSnap.type==='c'){  
      // const title1 = `First Control Point: ${newSnap.firstControl.x},${newSnap.firstControl.y}`
      // const title2 = `Second Control Point: ${newSnap.secondControl.x},${newSnap.secondControl.y}`
      // const title3 = `End Point: ${newSnap.endPoint.x},${newSnap.endPoint.y}`

      // const svgns = "http://www.w3.org/2000/svg"
      // const grid = document.getElementById('newGrid');
      // const circle1 = document.createElementNS(svgns, 'circle');
      //   circle1.title = {title1};
      //   circle1.classList.add('draggable');
      //   circle1.setAttributeNS(null, "id", 'd1');
      //   circle1.setAttributeNS(null, 'stroke', controlSnap.color);
      //   circle1.setAttributeNS(null, 'stroke-opacity', controlSnap.opacity);
      //   circle1.setAttributeNS(null, 'fill', controlSnap.color);
      //   circle1.setAttributeNS(null, 'fill-opacity', controlSnap.opacity);
      //   circle1.setAttributeNS(null, 'cx', newSnap.firstControl.x+50);
      //   circle1.setAttributeNS(null, 'cy', newSnap.firstControl.y+100);
      //   circle1.setAttributeNS(null, 'r', controlSnap.size);
      //   circle1.addEventListener('mousedown', (evt) => startDrag(evt));
      //   circle1.addEventListener('mouseup', endDrag);
      
      // const circle2 = document.createElementNS(svgns, 'circle');
      //   circle2.title = {title2};
      //   circle2.classList.add('draggable');
      //   circle2.setAttributeNS(null, "id", 'd2');
      //   circle2.setAttributeNS(null, 'stroke', controlSnap.color);
      //   circle2.setAttributeNS(null, 'stroke-opacity', controlSnap.opacity);
      //   circle2.setAttributeNS(null, 'fill', controlSnap.color);
      //   circle2.setAttributeNS(null, 'fill-opacity', controlSnap.opacity);
      //   circle2.setAttributeNS(null, 'cx', newSnap.secondControl.x+50);
      //   circle2.setAttributeNS(null, 'cy', newSnap.secondControl.y+100);
      //   circle2.setAttributeNS(null, 'r', controlSnap.size);
      //   circle2.addEventListener('mousedown', (evt) => startDrag(evt));
      //   circle2.addEventListener('mouseup', endDrag);
      
      // const circle3 = document.createElementNS(svgns, 'circle');
      //   circle3.classList.add('draggable');
      //   circle3.title = {title3};
      //   circle3.setAttributeNS(null, "id", 'end');
      //   circle3.setAttributeNS(null, 'stroke', endSnap.color);
      //   circle3.setAttributeNS(null, 'stroke-opacity', endSnap.opacity);
      //   circle3.setAttributeNS(null, 'fill', endSnap.color);
      //   circle3.setAttributeNS(null, 'fill-opacity', endSnap.opacity);
      //   circle3.setAttributeNS(null, 'cx', newSnap.endPoint.x+50);
      //   circle3.setAttributeNS(null, 'cy', newSnap.endPoint.y+100);
      //   circle3.setAttributeNS(null, 'r', endSnap.size);
      //   circle3.addEventListener('mousedown', (evt) => startDrag(evt));
      //   circle3.addEventListener('mouseup', endDrag);
      
      // grid.appendChild(circle1);
      // grid.appendChild(circle2);
      // grid.appendChild(circle3);
      // console.log('working')
    //   return(
    //   <Draggable onStart={(evt)=>startDrag(evt)} onStop={endDrag}>
    //     <Circle id="end" cx={newSnap.endPoint.x+50} cy={newSnap.endPoint.y+100} r={endSnap.size} stroke={endSnap.color} strokeOpacity={endSnap.opacity} fill={endSnap.color} fillOpacity={endSnap.opacity} />
    //   </Draggable>
    //   )

    // }
    
const NewGridWithDrag = (props, {children}) => {
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();
    const [selectedElement, setSelectedElement] = useState(null);
    const viewbox = `0 0 ${props.size} ${props.size}`;
    const newSnap = useSnapshot(newCommand.command);
    const endSnap = useSnapshot(end);
    const controlSnap = useSnapshot(control);
    const strokeSnap = useSnapshot(stroke);
    const fillSnap = useSnapshot(fill);

    function getMousePosition(evt) {
      const svg = evt.target
      const CTM = svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }
    function drag(evt) {
      console.log(selectedElement);
      if (selectedElement) {
        evt.preventDefault();
        let coord = getMousePosition(evt);
        let xCoord = Math.round( ( coord.x - offsetX ));
        let yCoord = Math.round( ( coord.y - offsetY ));
        if(newSnap.type==='h'){
          selectedElement.setAttributeNS(null, "cx", xCoord);
          newActions.setEndPoint(xCoord-newSnap.startPoint.x, 0);
          document.getElementById('newGrid').removeChild(document.getElementById('path'));
          drawPath();
        }else if (newSnap.type==="v"){
          selectedElement.setAttributeNS(null, "cy", yCoord);
          newActions.setEndPoint(0, yCoord-newSnap.startPoint.y);
          document.getElementById('newGrid').removeChild(document.getElementById('path'));
          drawPath();
        }else if (newSnap.type==="t"){
          selectedElement.setAttributeNS(null, "cx", xCoord);
          selectedElement.setAttributeNS(null, "cy", yCoord);
          newActions.setEndPoint(xCoord-newSnap.startPoint.x-path[newSnap.commandId-1].endPoint.x, yCoord-newSnap.startPoint.y-path[newSnap.commandId-1].endPoint.y);
          document.getElementById('newGrid').removeChild(document.getElementById('path'));
          drawPath();
        }else{
          selectedElement.setAttributeNS(null, "cx", xCoord);
          selectedElement.setAttributeNS(null, "cy", yCoord);  
          if(selectedElement.id==="d1") {
            selectedElement.setAttributeNS(null, 'r', controlSnap.size*1.5);
            newActions.setFirstControl(xCoord-newSnap.startPoint.x, yCoord-newSnap.startPoint.y);
            document.getElementById('newGrid').removeChild(document.getElementById('path'));
            drawPath();
          } else if(selectedElement.id==="d2") {
            newActions.setSecondControl(xCoord-newSnap.startPoint.x, yCoord-newSnap.startPoint.y);
            document.getElementById('newGrid').removeChild(document.getElementById('path'));
            drawPath();
          } else {
            newActions.setEndPoint(xCoord-newSnap.startPoint.x, yCoord-newSnap.startPoint.y);
            document.getElementById('newGrid').removeChild(document.getElementById('path'));
            drawPath();
          }
        }
      }
    }
    function endDrag() {
      if(!selectedElement===null){
        setSelectedElement(null);
      }else{
        setSelectedElement(null);
      }
    }
    
    function startDrag(evt) {
    console.log(evt.classList);
      evt.preventDefault()
      if (evt.target.classList.contains('draggable')) {
        setSelectedElement(evt.target);
        let offset = getMousePosition(evt);
        let numX = offset.x - parseFloat(evt.target.getAttributeNS(null, "cx"))
        let numY = offset.y - parseFloat(evt.target.getAttributeNS(null, "cy"))
        setOffsetX(Math.round( ( numX + Number.EPSILON ) * 100 ) / 100)
        setOffsetY(Math.round( ( numY + Number.EPSILON ) * 100 ) / 100)
      }
    }
    function drawPath(){
      const svgns = "http://www.w3.org/2000/svg"
      const grid = document.getElementById('newGrid');
      const currentPath = document.createElementNS(svgns, 'path');
        currentPath.setAttributeNS(null, "id", 'path');
        currentPath.setAttributeNS(null, 'stroke', strokeSnap.color);
        currentPath.setAttributeNS(null, 'stroke-width', strokeSnap.width);
        currentPath.setAttributeNS(null, 'stroke-opacity', strokeSnap.opacity);
        currentPath.setAttributeNS(null, 'fill', fillSnap.color);
        currentPath.setAttributeNS(null, 'fill-opacity', fillSnap.opacity);
        if(newSnap.type==='q'){
          currentPath.setAttributeNS(null, 'd', `M${newSnap.startPoint.x},${newSnap.startPoint.y}q${newSnap.firstControl.x},${newSnap.firstControl.y} ${newSnap.endPoint.x},${newSnap.endPoint.y}`)
        }else if(newSnap.type==='c'){
          currentPath.setAttributeNS(null, 'd', `M${newSnap.startPoint.x},${newSnap.startPoint.y}c${newSnap.firstControl.x},${newSnap.firstControl.y} ${newSnap.secondControl.x},${newSnap.secondControl.y} ${newSnap.endPoint.x},${newSnap.endPoint.y}`)
        }else if(newSnap.type==='s'){
          currentPath.setAttributeNS(null, 'd', `M${newSnap.startPoint.x},${newSnap.startPoint.y}s${newSnap.secondControl.x},${newSnap.secondControl.y} ${newSnap.endPoint.x},${newSnap.endPoint.y}`)
        }else if(newSnap.type==='l'){
          currentPath.setAttributeNS(null, 'd', `M${newSnap.startPoint.x},${newSnap.startPoint.y}l${newSnap.endPoint.x},${newSnap.endPoint.y}`)
        }else if(newSnap.type==='v'){
          currentPath.setAttributeNS(null, 'd', `M${newSnap.startPoint.x},${newSnap.startPoint.y}v${newSnap.endPoint.y}`)
        }else if(newSnap.type==='h'){
          currentPath.setAttributeNS(null, 'd', `M${newSnap.startPoint.x},${newSnap.startPoint.y}h${newSnap.endPoint.x}`)
        }else if(newSnap.type==='t'){
          currentPath.setAttributeNS(null, 'd', `M${newSnap.startPoint.x},${newSnap.startPoint.y}q${path[newSnap.commandId-1].controlPoints[0].value},${path[newSnap.commandId-1].controlPoints[1].value} ${path[newSnap.commandId-1].endPoint.x},${path[newSnap.commandId-1].endPoint.y}t${newSnap.endPoint.x},${newSnap.endPoint.y}`)
        }
        document.getElementById('path') && grid.removeChild(document.getElementById('path'));
      grid.appendChild(currentPath);
    }

    useEffect(() => {
      newCommand.command.type!=null?
      drawPath():<></>
    }, [newCommand])

    
    // else if(newSnap.type==='s'){
    //   const title1 = `Second Control Point: ${newSnap.secondControl.x},${newSnap.secondControl.y}`
    //   const title2 = `End Point: ${newSnap.endPoint.x},${newSnap.endPoint.y}`

    //   const svgns = "http://www.w3.org/2000/svg"
    //   const grid = document.getElementById('newGrid');
      
    //   const circle1 = document.createElementNS(svgns, 'circle');
    //     circle1.title = {title1};
    //     circle1.classList.add('draggable');
    //     circle1.setAttributeNS(null, "id", 'd2');
    //     circle1.setAttributeNS(null, 'stroke', controlSnap.color);
    //     circle1.setAttributeNS(null, 'stroke-opacity', controlSnap.opacity);
    //     circle1.setAttributeNS(null, 'fill', controlSnap.color);
    //     circle1.setAttributeNS(null, 'fill-opacity', controlSnap.opacity);
    //     circle1.setAttributeNS(null, 'cx', newSnap.firstControl.x);
    //     circle1.setAttributeNS(null, 'cy', newSnap.firstControl.y);
    //     circle1.setAttributeNS(null, 'r', controlSnap.size);
    //     circle1.addEventListener('mousedown', (evt) => startDrag(evt));
    //     circle1.addEventListener('mouseup', endDrag);
      
    //   const circle2 = document.createElementNS(svgns, 'circle');
    //     circle2.title = {title2}
    //     circle2.classList.add('draggable');
    //     circle2.setAttributeNS(null, "id", 'end');
    //     circle2.setAttributeNS(null, 'stroke', endSnap.color);
    //     circle2.setAttributeNS(null, 'stroke-opacity', endSnap.opacity);
    //     circle2.setAttributeNS(null, 'fill', endSnap.color);
    //     circle2.setAttributeNS(null, 'fill-opacity', endSnap.opacity);
    //     circle2.setAttributeNS(null, 'cx', newSnap.endPoint.x);
    //     circle2.setAttributeNS(null, 'cy', newSnap.endPoint.y);
    //     circle2.setAttributeNS(null, 'r', endSnap.size);
    //     circle2.addEventListener('mousedown', (evt) => startDrag(evt));
    //     circle2.addEventListener('mouseup', endDrag);
      
    //   grid.appendChild(circle1);
    //   grid.appendChild(circle2);
      
    // } else if(newSnap.type==='q'){
    //   const title1 = `First Control Point: ${newSnap.firstControl.x},${newSnap.firstControl.y}`
    //   const title2 = `End Point: ${newSnap.endPoint.x},${newSnap.endPoint.y}`

    //   const svgns = "http://www.w3.org/2000/svg"
    //   const grid = document.getElementById('newGrid');
      
      
    //   const circle1 = document.createElementNS(svgns, 'circle');
    //     circle1.title = {title1};
    //     circle1.classList.add('draggable');
    //     circle1.setAttributeNS(null, "id", 'd1');
    //     circle1.setAttributeNS(null, 'stroke', controlSnap.color);
    //     circle1.setAttributeNS(null, 'stroke-opacity', controlSnap.opacity);
    //     circle1.setAttributeNS(null, 'fill', controlSnap.color);
    //     circle1.setAttributeNS(null, 'fill-opacity', controlSnap.opacity);
    //     circle1.setAttributeNS(null, 'cx', newSnap.firstControl.x);
    //     circle1.setAttributeNS(null, 'cy', newSnap.firstControl.y);
    //     circle1.setAttributeNS(null, 'r', controlSnap.size);
    //     circle1.addEventListener('mousedown', (evt) => startDrag(evt));
    //     circle1.addEventListener('mouseup', endDrag);
      
    //   const circle2 = document.createElementNS(svgns, 'circle');
    //     circle2.title = {title2};
    //     circle2.classList.add('draggable');
    //     circle2.setAttributeNS(null, "id", 'end');
    //     circle2.setAttributeNS(null, 'stroke', endSnap.color);
    //     circle2.setAttributeNS(null, 'stroke-opacity', endSnap.opacity);
    //     circle2.setAttributeNS(null, 'fill', endSnap.color);
    //     circle2.setAttributeNS(null, 'fill-opacity', endSnap.opacity);
    //     circle2.setAttributeNS(null, 'cx', newSnap.endPoint.x);
    //     circle2.setAttributeNS(null, 'cy', newSnap.endPoint.y);
    //     circle2.setAttributeNS(null, 'r', endSnap.size);
    //     circle2.addEventListener('mousedown', (evt) => startDrag(evt));
    //     circle2.addEventListener('mouseup', endDrag);
      
    //   grid.appendChild(circle1);
    //   grid.appendChild(circle2);
      
    // }else if(newSnap.type==='l' || newSnap.type==='v' || newSnap.type==='h'){
    //   const title = `End Point: ${newSnap.endPoint.x},${newSnap.endPoint.y}`

    //   const svgns = "http://www.w3.org/2000/svg"
    //   const grid = document.getElementById('newGrid');
      
    //   const circle = document.createElementNS(svgns, 'circle');
    //     circle.title = {title};
    //     circle.classList.add('draggable');
    //     circle.setAttributeNS(null, "id", 'end');
    //     circle.setAttributeNS(null, 'stroke', endSnap.color);
    //     circle.setAttributeNS(null, 'stroke-opacity', endSnap.opacity);
    //     circle.setAttributeNS(null, 'fill', endSnap.color);
    //     circle.setAttributeNS(null, 'fill-opacity', endSnap.opacity);
    //     circle.setAttributeNS(null, 'cx', newSnap.endPoint.x);
    //     circle.setAttributeNS(null, 'cy', newSnap.endPoint.y);
    //     circle.setAttributeNS(null, 'r', endSnap.size);
    //     circle.addEventListener('mousedown', (evt) => startDrag(evt));
    //     circle.addEventListener('mouseup', endDrag);
    //   grid.appendChild(circle);
      
    // }
    // else if(newSnap.type==='t'){
    //   const title = `End Point: ${newSnap.endPoint.x},${newSnap.endPoint.y}`
    //   return(
    //     <View style={styles.container}>
    //       <Grid id='newGrid' size={props.size} mainWidth={Number(props.size)+20} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
    //         <circle className="draggable" id="endPoint" cx={newSnap.endPoint.x+50+path[newSnap.commandId-1].endPoint.x} cy={newSnap.endPoint.y+100+path[newSnap.commandId-1].endPoint.y} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag}    style={styles.end} fill={endSnap.color} fillOpacity={endSnap.opacity} r={endSnap.size} >
    //           <title>
    //             {title}
    //           </title>
    //         </circle>   
    //       </Grid>
    //     </View>
    //   )
    // }
    return (
      <View style={styles.container}>
        <Grid id='newGrid' size={props.size} mainWidth={Number(props.size)+20} viewBox={viewbox}>
          <DraggablePoint type="firstControl" cx={newSnap.firstControl.x+newSnap.startPoint.x} cy={newSnap.firstControl.y+newSnap.startPoint.y}  />
          <DraggablePoint type="secondControl" cx={newSnap.secondControl.x+newSnap.startPoint.x} cy={newSnap.secondControl.y+newSnap.startPoint.y}  />
          <DraggablePoint type="endPoint" cx={newSnap.endPoint.x+newSnap.startPoint.x} cy={newSnap.endPoint.y+newSnap.startPoint.y}  />
          {/* <DraggablePoint type="firstControl"  /> */}
        </Grid>
      </View>
    )
};

export default NewGridWithDrag;
    
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  drag:{
    cursor: "move",
    zIndex: 999
  },
  end: {
    cursor: "move",
    zIndex:999
  }
})      
