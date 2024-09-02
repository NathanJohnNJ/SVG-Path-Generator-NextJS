import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native-web';
import Grid from './Grid';
import { path, selected, selectedActions, control, end, stroke, fill } from '@/lib/store';
import { useSnapshot } from 'valtio';

const GridWithDrag = (props) => {
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();
    const [selectedElement, setSelectedElement] = useState(null);
    const viewbox = `0 0 ${props.size} ${props.size}`;
    const selectedSnap = useSnapshot(selected.command);
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
    async function drag(evt) {
      if (selectedElement) {
        evt.preventDefault();
        let coord = getMousePosition(evt);
        let xCoord = Math.round( ( coord.x - offsetX ));
        let yCoord = Math.round( ( coord.y - offsetY ));
        if(selectedSnap.type==='h'){
          selectedElement.setAttributeNS(null, "cx", xCoord);
          selectedElement.setAttributeNS(null, 'r', endSnap.size*1.5);
          selectedActions.setEndPoint(xCoord-50, 0);
          document.getElementById('createGrid').removeChild(document.getElementById('path'));
          drawPath();
        }else if (selectedSnap.type==="v"){
          selectedElement.setAttributeNS(null, "cy", yCoord);
          selectedElement.setAttributeNS(null, 'r', endSnap.size*1.5);
          selectedActions.setEndPoint(0, yCoord-100);
          document.getElementById('createGrid').removeChild(document.getElementById('path'));
          drawPath();
        }else if (selectedSnap.type==="t"){
          selectedElement.setAttributeNS(null, "cx", xCoord);
          selectedElement.setAttributeNS(null, "cy", yCoord);
          selectedElement.setAttributeNS(null, 'r', endSnap.size*1.5);
          selectedActions.setEndPoint(xCoord-50-path[selectedSnap.commandId-1].endPoint.x, yCoord-100-path[selectedSnap.commandId-1].endPoint.y);
          document.getElementById('createGrid').removeChild(document.getElementById('path'));
          drawPath();
        }else{
          selectedElement.setAttributeNS(null, "cx", xCoord);
          selectedElement.setAttributeNS(null, "cy", yCoord);  
          if(selectedElement.id==="firstControl") {
            selectedElement.setAttributeNS(null, 'r', controlSnap.size*1.5);
            selectedActions.setFirstControl(xCoord-50, yCoord-100);
            document.getElementById('createGrid').removeChild(document.getElementById('path'));
            drawPath();
          } else if(selectedElement.id==="secondControl") {
            selectedElement.setAttributeNS(null, 'r', controlSnap.size*1.5);
            selectedActions.setSecondControl(xCoord-50, yCoord-100);
            document.getElementById('createGrid').removeChild(document.getElementById('path'));
            drawPath();
          } else {
            selectedActions.setEndPoint(xCoord-50, yCoord-100);
            selectedElement.setAttributeNS(null, 'r', endSnap.size*1.5);
            document.getElementById('createGrid').removeChild(document.getElementById('path'));
            drawPath();
          }
        }
      }
    }
    function endDrag() {
      if(!selectedElement===null){
        document.getElementById('endPoint').setAttributeNS(null, 'r', endSnap.size);
        document.getElementById('firstControl').setAttributeNS(null, 'r', controlSnap.size);
        document.getElementById('secondControl').setAttributeNS(null, 'r', controlSnap.size);
        setSelectedElement(null);
      }else{
        setSelectedElement(null);
      }
    }
    function letGo(){
      document.getElementById('endPoint').setAttributeNS(null, 'r', endSnap.size);
      document.getElementById('firstControl')?document.getElementById('firstControl').setAttributeNS(null, 'r', controlSnap.size):null;
      document.getElementById('secondControl')?document.getElementById('secondControl').setAttributeNS(null, 'r', controlSnap.size):null
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
        currentPath.setAttributeNS(null, 'stroke', strokeSnap.color);
        currentPath.setAttributeNS(null, 'stroke-width', strokeSnap.width);
        currentPath.setAttributeNS(null, 'stroke-opacity', strokeSnap.opacity);
        currentPath.setAttributeNS(null, 'fill', fillSnap.color);
        currentPath.setAttributeNS(null, 'fill-opacity', fillSnap.opacity);
        if(selectedSnap.type==='q'){
          currentPath.setAttributeNS(null, 'd', `M50,100q${selectedSnap.firstControl.x},${selectedSnap.firstControl.y} ${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`)
        }else if(selectedSnap.type==='c'){
          currentPath.setAttributeNS(null, 'd', `M50,100c${selectedSnap.firstControl.x},${selectedSnap.firstControl.y} ${selectedSnap.secondControl.x},${selectedSnap.secondControl.y} ${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`)
        }else if(selectedSnap.type==='s'){
          currentPath.setAttributeNS(null, 'd', `M50,100s${selectedSnap.secondControl.x},${selectedSnap.secondControl.y} ${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`)
        }else if(selectedSnap.type==='l'){
          currentPath.setAttributeNS(null, 'd', `M50,100l${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`)
        }else if(selectedSnap.type==='v'){
          currentPath.setAttributeNS(null, 'd', `M50,100v${selectedSnap.endPoint.y}`)
        }else if(selectedSnap.type==='h'){
          currentPath.setAttributeNS(null, 'd', `M50,100h${selectedSnap.endPoint.x}`)
        }else if(selectedSnap.type==='t'){
          currentPath.setAttributeNS(null, 'd', `M50,100q${path[selectedSnap.commandId-1].controlPoints[0].value},${path[selectedSnap.commandId-1].controlPoints[1].value} ${path[selectedSnap.commandId-1].endPoint.x},${path[selectedSnap.commandId-1].endPoint.y}t${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`)
        }
      grid.appendChild(currentPath)
    }

    useEffect(() => {
      drawPath()
    }, [])

    if(selectedSnap.type==='q'){
      const title1 = `Control Point: ${selectedSnap.firstControl.x},${selectedSnap.firstControl.y}`
      const title2 = `End Point: ${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`
      
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} mainWidth={Number(props.size)+20} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="firstControl" cx={selectedSnap.firstControl.x+50} cy={selectedSnap.firstControl.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.drag} r={controlSnap.size}  fill={controlSnap.color} fillOpacity={controlSnap.opacity}>
              <title>
                {title1}
              </title>
            </circle>
            <circle className="draggable" id="endPoint" cx={selectedSnap.endPoint.x+50} cy={selectedSnap.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()} style={styles.end} fill={endSnap.color} fillOpacity={endSnap.opacity} r={endSnap.size} >
              <title>
                {title2}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selectedSnap.type==='t'){
      const title = `End Point: ${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} mainWidth={Number(props.size)+20} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="endPoint" cx={selectedSnap.endPoint.x+50+path[selectedSnap.commandId-1].endPoint.x} cy={selectedSnap.endPoint.y+100+path[selectedSnap.commandId-1].endPoint.y} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.end} fill={endSnap.color} fillOpacity={endSnap.opacity} r={endSnap.size} >
              <title>
                {title}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selectedSnap.type==='l'){
      const title = `End Point: ${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} mainWidth={Number(props.size)+20} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="endPoint" cx={selectedSnap.endPoint.x+50} cy={selectedSnap.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.end} fill={endSnap.color} fillOpacity={endSnap.opacity} r={endSnap.size} >
              <title>
                {title}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selectedSnap.type==='v'){
        const title = `End Point: 50,${selectedSnap.endPoint.y}`
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} mainWidth={Number(props.size)+20} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="endPoint" cx="50" cy={selectedSnap.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.end} fill={endSnap.color} fillOpacity={endSnap.opacity} r={endSnap.size} >
              <title>
                {title}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selectedSnap.type==='h'){
      const title = `End Point: ${selectedSnap.endPoint.x},100`
      
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} mainWidth={Number(props.size)+20} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="endPoint" cx={selectedSnap.endPoint.x+50} cy="100" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.end} fill={endSnap.color} fillOpacity={endSnap.opacity} r={endSnap.size} >
              <title>
                {title}
              </title>
            </circle>   
          </Grid>
        </View>
      )
    }else if(selectedSnap.type==='c'){
      const title1 = `First Control Point: ${selectedSnap.firstControl.x},${selectedSnap.firstControl.y}`
      const title2 = `Second Control Point: ${selectedSnap.secondControl.x},${selectedSnap.secondControl.y}`
      const title3 = `End Point: ${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`
      
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} mainWidth={Number(props.size)+20} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="firstControl" cx={selectedSnap.firstControl.x+50} cy={selectedSnap.firstControl.y+100} r={controlSnap.size} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()} style={styles.drag} fill={controlSnap.color} fillOpacity={controlSnap.opacity}>
              <title>
                {title1}
              </title>
            </circle>
            <circle className="draggable" id="secondControl" cx={selectedSnap.secondControl.x+50} cy={selectedSnap.secondControl.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()} style={styles.drag} fill={controlSnap.color} fillOpacity={controlSnap.opacity} r={controlSnap.size} >
              <title>
                {title2}
              </title>
            </circle>
            <circle className="draggable" id="endPoint" cx={selectedSnap.endPoint.x+50} cy={selectedSnap.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()} style={styles.end} fill={endSnap.color} fillOpacity={endSnap.opacity} r={endSnap.size} >
              <title>
                {title3}
              </title>
            </circle>
          </Grid>
        </View>
      )
    }else if(selectedSnap.type==='s'){
      const title2 = `Second Control Point: ${selectedSnap.secondControl.x},${selectedSnap.secondControl.y}`
      const title3 = `End Point: ${selectedSnap.endPoint.x},${selectedSnap.endPoint.y}`
  
      return(
        <View style={styles.container}>
          <Grid id='createGrid' size={props.size} mainWidth={Number(props.size)+20} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            <circle className="draggable" id="secondControl" cx={selectedSnap.secondControl.x+50} cy={selectedSnap.secondControl.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()}   style={styles.drag} fill={controlSnap.color} fillOpacity={controlSnap.opacity} r={controlSnap.size} >
              <title>
                {title2}
              </title>
            </circle>
            <circle className="draggable" id="endPoint" cx={selectedSnap.endPoint.x+50} cy={selectedSnap.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} onMouseLeave={() => letGo()} style={styles.end} fill={endSnap.color} fillOpacity={endSnap.opacity} r={endSnap.size} >
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
