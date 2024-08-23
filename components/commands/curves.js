'use client';
import { useState } from 'react';
import GridWithDrag from '../gridWithDrag';
import { Text, View, Modal } from 'react-native-web';
import { EndTable, ControlTables } from '../Tables';
import { styles } from './styles';
// import Help from '../help';
import Presets from '../presetPaths/l';

const [hover, setHover] = useState({sub: false, can: false, q:false, t:false, c:false, s:false, x:false, y:false, dx1:false, dy1: false, dx2: false, dy2: false});
const startX = props.path[props.pathID].endPoint.x + props.path[props.pathID].startPoint.x;
const startY = props.path[props.pathID].endPoint.y + props.path[props.pathID].startPoint.y;

function hoverFunc(i){
  if (i==='dx1'||i==='dy1'){
    const newHover = { ...hover, dx1:true, dy1:true}
    setHover(newHover)
  }else if (i==='dx2'||i==='dy2'){
    const newHover = { ...hover, dx2:true, dy2:true}
    setHover(newHover)
  }else if (i==='x'||i==='y'){
    const newHover = { ...hover, x:true, y:true}
    setHover(newHover)
  }else{
    const newHover = { ...hover, [i]: true}
    setHover(newHover)
  }
}
function resetHover(){
  setHover({sub: false, can: false, q:false, t:false, c:false, s:false, x:false, y:false, dx1:false, dy1: false, dx2: false, dy2: false})
}

export const C = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
 
  function openModal(){
    props.setFirstCtrl({x:25, y:50})
    props.setSecondCtrl({x:75, y:50})
    props.setEndPoint({x:100, y:0})
    setModalIsOpen(true)
  }
  function closeModal(){
    setModalIsOpen(false)
  }

  const first = {
    type:'c',
    id: props.pathID+1,
    startPoint: {x: 50, y: 50},
    controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}, {key: 'dx2', value:75}, {key: 'dy2', value:50}],
    endPoint: {x: 100, y: 0}
  }
  const [defaultPath, setDefaultPath] = useState(first);

  function addToPath(){
      
  const cPath = {
    type: 'c',
    id: props.pathID+1,
    startPoint: {x: startX, y: startY},
    controlPoints: [{key: 'dx1', value:props.firstCtrl.x}, {key: 'dy1', value:props.firstCtrl.y}, {key: 'dx2', value:props.secondCtrl.x}, {key: 'dy2', value:props.secondCtrl.y}],
    endPoint: {x: props.endPoint.x,y: props.endPoint.y}
    };
    const newPath = [...props.path, cPath];
    props.setPath(newPath);
    props.setPathID(props.pathID+1);
    setModalIsOpen(false);
  }
  
  return (
    <View style={styles.outerContainer}>
      <Text onClick={openModal} onMouseOver={() => hoverFunc('c')} onMouseLeave={resetHover} style={hover.c?styles.hover:styles.button}>
        C
      </Text>
      <Modal
      animationType="slide"
      transparent={false}
      visible={modalIsOpen}
      onRequestClose={closeModal}
      >
        <View style={styles.row}>
          <Presets pathID={props.pathID} defaultPath={defaultPath} setDefaultPath={setDefaultPath} stroke={props.stroke} strokeWidth={props.strokeWidth} setFirstCtrl={props.setFirstCtrl} setSecondCtrl={props.setSecondCtrl} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} secondCtrl={props.secondCtrl} endPoint={props.endPoint} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} />
          <View style={styles.middleSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                New C Command
              </Text>
            </View>
            <View style={styles.container}>
              <GridWithDrag size="250" path={defaultPath} firstCtrl={props.firstCtrl} startPoint={props.startPoint} setStartPoint={props.setStartPoint} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc}/>
            </View>
          </View>
          <View style={styles.container}>
            {/* <Help url="https://svgwg.org/svg2-draft/paths.html#PathDataCubicBezierCommands" /> */}
            <ControlTables type="c" labelBgColor="#fff" fontSize={15} labelColor={props.control.colour} borderColor={props.control.colour} firstCtrl={props.firstCtrl} secondCtrl={props.secondCtrl} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
            <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.end.colour} borderColor={props.end.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
          </View>
        </View>
        <View style={styles.subCan}>
          <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
          <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
        </View>
      </Modal>
    </View>
  )
};

export const S = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
 
  function openModal(){
    props.setSecondCtrl({x:75, y:50})
    props.setEndPoint({x:100, y:0})
    setModalIsOpen(true)
  }
  function closeModal(){
    setModalIsOpen(false)
  }
  const first = {
    type:'s',
    id: props.pathID+1,
    startPoint: {x: 50, y: 50},
    controlPoints: [{key: 'dx2', value:75}, {key: 'dy2', value:50}],
    endPoint: {x: 100, y: 0},
  }

  function addToPath(){
    const sPath = {
    type: 's',
    id: props.pathID+1,
    startPoint: {x: startX, y: startY},
    controlPoints: [{key: 'dx2', value:props.secondCtrl.x}, {key: 'dy2', value:props.secondCtrl.y}],
    endPoint: {x: props.endPoint.x,y: props.endPoint.y}
    }
    const newPath = [...props.path, sPath]
    props.setPath(newPath)
    props.setPathID(props.pathID+1)  
    setModalIsOpen(false) 
  }

  return (
    <View style={styles.outerContainer}>
      <Text onClick={openModal} onMouseOver={() => hoverFunc('s')} onMouseLeave={resetHover} style={hover.s?styles.hover:styles.button}>
        S
      </Text>
      <Modal
      animationType="slide"
      transparent={false}
      visible={modalIsOpen}
      onRequestClose={closeModal}
      >
        <View style={styles.row}>
          <View style={styles.middleSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                New S Command
              </Text>
            </View>
            <View style={styles.container}>
              <GridWithDrag size="250" path={first} startPoint={props.startPoint} setStartPoint={props.setStartPoint} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc}/>
            </View>
          </View>
          <View style={styles.container}>
            {/* <Help url="https://svgwg.org/svg2-draft/paths.html#PathDataCubicBezierCommands" /> */}
            <ControlTables type="s" labelBgColor="#fff" fontSize={15} labelColor={props.control.colour} borderColor={props.control.colour} secondCtrl={props.secondCtrl} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
            <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.end.colour} borderColor={props.end.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
          </View>
        </View>
        <View style={styles.subCan}>
          <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
          <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
        </View>
      </Modal>
    </View>
  )
};

export const Q = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
    function openModal(){
      props.setFirstCtrl({x:25, y:50})  
      props.setEndPoint({x:50, y:0})
      setModalIsOpen(true)
    }
    function closeModal(){
      setModalIsOpen(false)
    }

    const first = {
      type: 'q',
      id: props.pathID+1,
      startPoint: {x: 50, y: 50},
      controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}],
      endPoint: {x:50, y: 0}
    }
    const [defaultPath, setDefaultPath] = useState(first);

    function addToPath(){
      const qPath = {
        type: 'q',
        id: props.pathID+1,
        startPoint: {x: startX, y: startY},
        controlPoints: [{key: 'dx1', value:props.firstCtrl.x}, {key: 'dy1', value:props.firstCtrl.y}],
        endPoint: {x: props.endPoint.x,y: props.endPoint.y}
      } 
      
      const newPath = [...props.path, qPath]
      props.setPath(newPath)
      props.setPathID(props.pathID+1)
      setModalIsOpen(false)
  }

  return (
    <View style={styles.outerContainer}>
      <Text onClick={openModal} onMouseOver={() => hoverFunc('q')} onMouseLeave={resetHover} style={hover.q?styles.hover:styles.button}>
        Q
      </Text>
      <Modal
      animationType="slide"
      transparent={false}
      visible={modalIsOpen}
      onRequestClose={closeModal}
      >
        <View style={styles.row}>
          <Presets pathID={props.pathID} defaultPath={defaultPath} setDefaultPath={setDefaultPath} stroke={props.stroke} strokeWidth={props.strokeWidth} setFirstCtrl={props.setFirstCtrl} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} endPoint={props.endPoint} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} />
          <View style={styles.middleSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                New Q Command
              </Text>
            </View>
            <View style={styles.container}>
              <GridWithDrag size="250" path={defaultPath} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} />
            </View>
          </View>
          <View style={styles.container}>
            <Help url="https://svgwg.org/svg2-draft/paths.html#PathDataQuadraticBezierCommands" />
            <ControlTables type="q" labelBgColor="#fff" fontSize={15} labelColor={props.control.colour} borderColor={props.control.colour} firstCtrl={props.firstCtrl} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
            <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.end.colour} borderColor={props.end.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
          </View>
        </View>
        <View style={styles.subCan}>
          <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
          <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
        </View>
      </Modal>
    </View>
  )
};

export const T = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal(){ 
      props.setEndPoint({x:50, y:0})
      setModalIsOpen(true)
  }
  function closeModal(){
      setModalIsOpen(false)
  }

  const defaultPath = {
      type: 't',
      id: props.pathID+1,
      startPoint: {x: 50, y: 50},
      endPoint: {x:50, y: 0},
  }

  function addToPath(){
    const tPath = {
      type: 't',
      id: props.pathID+1,
      startPoint: {x: startX, y: startY},
      endPoint: {x: props.endPoint.x,y: props.endPoint.y}
    } 
    const newPath = [...props.path, tPath]
    props.setPath(newPath)
    props.setPathID(props.pathID+1)
    setModalIsOpen(false)
  }
 
  return (
    <View style={styles.outerContainer}>
      <Text onClick={openModal} onMouseOver={() => hoverFunc('t')} onMouseLeave={resetHover}  style={hover.t?styles.hover:styles.button}>T</Text>
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalIsOpen}
        onRequestClose={closeModal}
        >
          <View style={styles.row}>
            <View style={styles.middleSection}>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>New T Command</Text>
          </View>
            <View style={styles.container}>
              <GridWithDrag size="250" path={defaultPath} pathID={props.pathID} fullPath={props.path} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} />
            </View> 
          </View>
          <View style={styles.container}>
          {/* <Help url="https://svgwg.org/svg2-draft/paths.html#PathDataQuadraticBezierCommands" /> */}
            <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.end.colour} borderColor={props.end.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
          </View>
        </View>
        <View style={styles.subCan}>
          <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.tub?styles.submitHover:styles.submitButton}>Add to path!</Text>
          <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
        </View>
      </Modal>
    </View>
  )
};
