import { useState } from 'react';
import GridWithDrag from '../gridWithDrag';
import { Text, View, Modal } from 'react-native-web';
import { styles } from './styles';
import { EndTable } from '../Tables';
// import Help from '../help';
import Presets from '../presetPaths/l';

const [hover, setHover] = useState({sub: false, can: false, l:false, v:false, h:false, x:false, y:false});
const startX = props.path[props.pathID].endPoint.x + props.path[props.pathID].startPoint.x;
const startY = props.path[props.pathID].endPoint.y + props.path[props.pathID].startPoint.y;

function hoverFunc(i){
  if (i==='x'||i==='y'){
      const newHover = { ...hover, x:true, y:true}
      setHover(newHover)
  }else{
      const newHover = { ...hover, [i]: true}
      setHover(newHover)
  }
}
function resetHover(){
  setHover({sub: false, can: false, l:false, v:false, h:false, x:false, y:false})
}

export const L = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const startX = props.path[props.pathID].endPoint.x + props.path[props.pathID].startPoint.x;
  const startY = props.path[props.pathID].endPoint.y + props.path[props.pathID].startPoint.y;

  function openModal(){ 
      props.setEndPoint({x:50, y:50})
      setModalIsOpen(true)
  }
  function closeModal(){
      setModalIsOpen(false)
  }

  const first = {
      type: 'l',
      id: props.pathID+1,
      startPoint: {x: 50, y: 50},
      endPoint: {x:50, y: 50}
  }
  const [defaultPath, setDefaultPath] = useState(first);
  
  function addToPath(){
      const lPath = {
          type: 'l',
          id: props.pathID+1,
          startPoint: {x: startX, y: startY},
          endPoint: {x: props.endPoint.x, y: props.endPoint.y}
      } 
      const newPath = [...props.path, lPath]
      props.setPath(newPath)
      props.setPathID(props.pathID+1)  
      setModalIsOpen(false)
  }

  return (
    <View style={styles(props).outerContainer}>
      <Text onClick={openModal}  onMouseOver={() => hoverFunc('l')} onMouseLeave={resetHover} style={hover.l?styles(props).hover:styles(props).button}>L</Text>
      <Modal
      animationType="slide"
      transparent={false}
      visible={modalIsOpen}
      onReluestClose={closeModal}
      >
        <View style={styles(props).row}>
          <Presets pathID={props.pathID} defaultPath={defaultPath} setDefaultPath={setDefaultPath} stroke={props.stroke} strokeWidth={props.strokeWidth} setFirstCtrl={props.setFirstCtrl} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} endPoint={props.endPoint} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} />
          <View style={styles(props).middleSection}>
            <View style={styles(props).titleContainer}>
              <Text style={styles(props).title}>
                New L Command
              </Text>
            </View>
            <View style={styles(props).container}>
              <GridWithDrag size="250" path={defaultPath} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc}   />
            </View>
          </View>
          <View style={styles(props).mainContainer}>
            {/* <Help url="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths" /> */}
            <View style={styles(props).tableContainer}>
              <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.end.colour} borderColor={props.end.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover} />
            </View>
          </View>
        </View>
        <View style={styles(props).subCan}>
          <Text onClick={addToPath}  onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles(props).submitHover:styles(props).submitButton}>
            Add to path!
          </Text>
          <Text onClick={closeModal}  onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles(props).cancelHover:styles(props).cancelButton}>
            Cancel
          </Text>
        </View>
      </Modal>
    </View>
  )
};

export const H = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal(){ 
    props.setEndPoint({x:50, y:0})
    setModalIsOpen(true)
  }
  function closeModal(){
    setModalIsOpen(false)
  }

  const defaultPath = {
    type: 'h',
    id: props.pathID+1,
    startPoint: {x: 50, y: 50},
    endPoint: {x:50, y: 0}
  }
  
  function addToPath(){
    const hPath = {
      type: 'h',
      id: props.pathID+1,
      startPoint: {x: startX, y: startY},
      endPoint: {x: props.endPoint.x, y: props.endPoint.y}
    } 
    const newPath = [...props.path, hPath]
    props.setPath(newPath)
    props.setPathID(props.pathID+1)  
    setModalIsOpen(false)
  }

  return (
    <View style={styles(props).outerContainer}>
      <Text onClick={openModal}  onMouseOver={() => hoverFunc('h')} onMouseLeave={resetHover} style={hover.h?styles(props).hover:styles(props).button}>H</Text>
      <Modal
      animationType="slide"
      transparent={false}
      visible={modalIsOpen}
      onReluestClose={closeModal}
      >
        <Text style={styles(props).title}>New H Command</Text>
        <View style={styles(props).row}>
          <View style={styles(props).container}>
            <GridWithDrag size="250" path={defaultPath} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} resetHover={resetHover} hoverFunc={hoverFunc}/>
          </View>
          <View style={styles(props).mainContainer}>
            {/* <Help url="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths" /> */}
            <View style={styles(props).tableContainer}>
              <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.end.colour} borderColor={props.end.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover} />
            </View>              
          </View>
        </View>
        <View style={styles(props).subCan}>
          <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles(props).submitHover:styles(props).submitButton}>Add to path!</Text>
          <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles(props).cancelHover:styles(props).cancelButton}>Cancel</Text>
        </View>
      </Modal>
    </View>
  )
};

export const V = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
 
  function openModal(){ 
    props.setEndPoint({x:0, y:50})
    setModalIsOpen(true)
  }
  function closeModal(){
    setModalIsOpen(false)
  }

  const defaultPath = {
    type: 'v',
    id: props.pathID+1,
    startPoint: {x: 50, y: 50},
    endPoint: {x:0, y: 50}
  }
  
  function addToPath(){
    const vPath = {
      type: 'v',
      id: props.pathID+1,
      startPoint: {x: startX, y: startY},
      endPoint: {x: props.endPoint.x, y: props.endPoint.y}
    } 
    const newPath = [...props.path, vPath]
    props.setPath(newPath)
    props.setPathID(props.pathID+1)  
    setModalIsOpen(false)
  }

  return (
    <View style={styles(props).outerContainer}>
      <Text onClick={openModal}  onMouseOver={() => hoverFunc('v')} onMouseLeave={resetHover} style={hover.v?styles(props).hover:styles(props).button}>V</Text>
      <Modal
      animationType="slide"
      transparent={false}
      visible={modalIsOpen}
      onReluestClose={closeModal}
      >
        <Text style={styles(props).title}>New V Command</Text>
        <View style={styles(props).row}>  
          <View style={styles(props).container}>
            <GridWithDrag size="250" path={defaultPath} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} />
          </View>
          <View style={styles(props).mainContainer}>
            {/* <Help url="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths" /> */}
            <View style={styles(props).tableContainer}>
              <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.end.colour} borderColor={props.end.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
            </View>
          </View>
        </View>
        <View style={styles(props).subCan}>
          <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles(props).submitHover:styles(props).submitButton}>Add to path!</Text>
          <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles(props).cancelHover:styles(props).cancelButton}>Cancel</Text>
        </View>
      </Modal>
    </View>
  )
};
