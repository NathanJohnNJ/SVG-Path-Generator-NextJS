import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native-web';
import Grid from './Grid';
import { path, selected, selectedActions, control, end, stroke, fill } from '@/lib/store';

const GridWithDrag = (props) => {
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();
    const [selectedElement, setSelectedElement] = useState(null);
    const viewbox = `0 0 ${props.size} ${props.size}`;

    function getMousePosition(evt) {
      const svg = evt.target
      const CTM = svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }
    async function drag(evt) {
      if (selectedElement) {
        evt.preventDefault();
        let coord = getMousePosition(evt);
        let xCoord = Math.round( ( coord.x - offsetX ));
        let yCoord = Math.round( ( coord.y - offsetY ));
        if(selected.type==='h'){
          selectedElement.setAttributeNS(null, "cx", xCoord);
          selectedElement.setAttributeNS(null, 'r', end.size*1.5);
          selectedActions.setEndPoint({x:xCoord-50, y:0});
          document.getElementById('createGrid').removeChild(document.getElementById('path'));
          drawPath();
        }else if (selected.type==="v"){
          selectedElement.setAttributeNS(null, "cy", yCoord);
          selectedElement.setAttributeNS(null, 'r', end.size*1.5);
          selectedActions.setEndPoint({x:0, y:yCoord-100});
          document.getElementById('createGrid').removeChild(document.getElementById('path'));
          drawPath();
        }else if (selected.type==="t"){
          selectedElement.setAttributeNS(null, "cy", yCoord);
          selectedElement.setAttributeNS(null, 'r', end.size*1.5);
          selectedActions.setEndPoint({x:xCoord-50-path[selected.commandId-1].endPoint.x, y:yCoord-100-path[selected.commandId-1].endPoint.y});
          document.getElementById('createGrid').removeChild(document.getElementById('path'));
          drawPath();
        }else{
          selectedElement.setAttributeNS(null, "cx", xCoord);
          selectedElement.setAttributeNS(null, "cy", yCoord);  
          if(selectedElement.id==="firstControl") {
            selectedElement.setAttributeNS(null, 'r', control.size*1.5);
            selectedActions.setFirstControl({x:xCoord-50, y:yCoord-100});
            props.hoverFunc('dx1');
            props.hoverFunc('dy1');
            document.getElementById('createGrid').removeChild(document.getElementById('path'));
            drawPath();
          } else if(selectedElement.id==="secondControl") {
            selectedElement.setAttributeNS(null, 'r', control.size*1.5);
            selectedActions.setSecondControl({x:xCoord-50, y:yCoord-100});
            props.hoverFunc('dx2');
            props.hoverFunc('dy2');
            document.getElementById('createGrid').removeChild(document.getElementById('path'));
            drawPath();
          } else {
            selectedActions.setEndPoint({x:xCoord-50, y:yCoord-100});
            selectedElement.setAttributeNS(null, 'r', end.size*1.5);
            props.hoverFunc('x');
            props.hoverFunc('y');
            document.getElementById('createGrid').removeChild(document.getElementById('path'));
            drawPath();
          }
        }
      }
    }
    function endDrag() {
      if(!selectedElement===null){
        document.getElementById('endPoint').setAttributeNS(null, 'r', end.size);
        document.getElementById('firstControl').setAttributeNS(null, 'r', control.size);
        document.getElementById('secondControl').setAttributeNS(null, 'r', control.size);
        setSelectedElement(null);
        props.resetHover()
      }else{
        setSelectedElement(null);
        props.resetHover()
      }
    }
    function letGo(){
      document.getElementById('endPoint').setAttributeNS(null, 'r', end.size);
      document.getElementById('firstControl')?document.getElementById('firstControl').setAttributeNS(null, 'r', control.size):null;
      document.getElementById('secondControl')?document.getElementById('secondControl').setAttributeNS(null, 'r', control.size):null
    }
    function startDrag(evt) {
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
      const grid = document.getElementById('createGrid');
      const currentPath = document.createElementNS(svgns, 'path');
        currentPath.setAttributeNS(null, "id", 'path');
        currentPath.setAttributeNS(null, 'stroke', stroke.color);
        currentPath.setAttributeNS(null, 'stroke-width', stroke.width);
        currentPath.setAttributeNS(null, 'stroke-opacity', stroke.opacity);
        currentPath.setAttributeNS(null, 'fill', fill.color);
        currentPath.setAttributeNS(null, 'fill-opacity', fill.opacity);
        if(selected.type==='q'){
          currentPath.setAttributeNS(null, 'd', `M50,100q${selected.firstControl.x},${selected.firstControl.y} ${selected.endPoint.x},${selected.endPoint.y}`)
        }else if(selected.type==='c'){
          currentPath.setAttributeNS(null, 'd', `M50,100c${selected.firstControl.x},${selected.firstControl.y} ${selected.secondControl.x},${selected.secondControl.y} ${selected.endPoint.x},${selected.endPoint.y}`)
        }else if(selected.type==='s'){
          currentPath.setAttributeNS(null, 'd', `M50,100s${selected.secondControl.x},${selected.secondControl.y} ${selected.endPoint.x},${selected.endPoint.y}`)
        }else if(selected.type==='l'){
          currentPath.setAttributeNS(null, 'd', `M50,100l${selected.endPoint.x},${selected.endPoint.y}`)
        }else if(selected.type==='v'){
          currentPath.setAttributeNS(null, 'd', `M50,100v${selected.endPoint.y}`)
        }else if(selected.type==='h'){
          currentPath.setAttributeNS(null, 'd', `M50,100h${selected.endPoint.x}`)
        }else if(selected.type==='t'){
          currentPath.setAttributeNS(null, 'd', `M50,100q${path[selected.commandId-1].controlPoints[0].value},${path[selected.commandId-1].controlPoints[1].value} ${path[selected.commandId-1].endPoint.x},${path[selected.commandId-1].endPoint.y}t${selected.endPoint.x},${selected.endPoint.y}`)
        }
      grid.appendChild(currentPath)
    }

    useEffect(() => {
      drawPath()
    }, [])

    if(selected.type==='q'){
      const title1 = `Control Point: ${selected.firstControl.x},${selected.firstControl.y}`
      const title2 = `End Point: ${selected.endPoint.x},${selected.endPoint.y}`
      
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="firstControl" cx={selected.firstControl.x+50} cy={selected.firstControl.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.drag} r={control.size}  fill={control.color} fillOpacity={control.opacity}>
              <title>
                {title1}
              </title>
            </circle>
            <circle className="draggable" id="endPoint" cx={selected.endPoint.x+50} cy={selected.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()} style={styles.end} fill={end.color} fillOpacity={end.opacity} r={end.size} >
              <title>
                {title2}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selected.type==='t'){
      const title = `End Point: ${selected.endPoint.x},${selected.endPoint.y}`
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="endPoint" cx={selected.endPoint.x+50+path[selected.commandId-1].endPoint.x} cy={selected.endPoint.y+100+path[selected.commandId-1].endPoint.y} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.end} fill={end.color} fillOpacity={end.opacity} r={end.size} >
              <title>
                {title}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selected.type==='l'){
      const title = `End Point: ${selected.endPoint.x},${selected.endPoint.y}`
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="endPoint" cx={selected.endPoint.x+50} cy={selected.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.end} fill={end.color} fillOpacity={end.opacity} r={end.size} >
              <title>
                {title}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selected.type==='v'){
        const title = `End Point: 50,${selected.endPoint.y}`
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="endPoint" cx="50" cy={selected.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.end} fill={end.color} fillOpacity={end.opacity} r={end.size} >
              <title>
                {title}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selected.type==='h'){
      const title = `End Point: ${selected.endPoint.x},100`
      
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="endPoint" cx={selected.endPoint.x+50} cy="100" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.end} fill={end.color} fillOpacity={end.opacity} r={end.size} >
              <title>
                {title}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selected.type==='c'){
      const title1 = `First Control Point: ${selected.firstControl.x},${selected.firstControl.y}`
      const title2 = `Second Control Point: ${selected.secondControl.x},${selected.secondControl.y}`
      const title3 = `End Point: ${selected.endPoint.x},${selected.endPoint.y}`
      
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="firstControl" cx={selected.firstControl.x+50} cy={selected.firstControl.y+100} r={control.size} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.drag} fill={control.color} fillOpacity={control.opacity}>
              <title>
                {title1}
              </title>
            </circle>
            <circle className="draggable" id="secondControl" cx={selected.secondControl.x+50} cy={selected.secondControl.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.drag} fill={control.color} fillOpacity={control.opacity} r={control.size} >
              <title>
                {title2}
              </title>
            </circle>
            <circle className="draggable" id="endPoint" cx={selected.endPoint.x+50} cy={selected.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.end} fill={end.color} fillOpacity={end.opacity} r={end.size} >
              <title>
                {title3}
              </title>
            </circle>
          </Grid>
        </View>
      )
    }else if(selected.type==='s'){
      const title2 = `Second Control Point: ${selected.secondControl.x},${selected.secondControl.y}`
      const title3 = `End Point: ${selected.endPoint.x},${selected.endPoint.y}`
  
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="secondControl" cx={selected.secondControl.x+50} cy={selected.secondControl.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.drag} fill={control.color} fillOpacity={control.opacity} r={control.size} >
              <title>
                {title2}
              </title>
            </circle>
            <circle className="draggable" id="endPoint" cx={selected.endPoint.x+50} cy={selected.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()} style={styles.end} fill={end.color} fillOpacity={end.opacity} r={end.size} >
              <title>
                {title3}
              </title>
            </circle>
          </Grid>
      </View>
    )
  }
};

export default GridWithDrag;
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    cornerRadius: 18
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
