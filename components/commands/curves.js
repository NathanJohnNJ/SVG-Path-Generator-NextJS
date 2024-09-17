import { useState } from 'react';
import { Text, View, Modal, StyleSheet } from 'react-native-web';
import { path, addToPath, fill, stroke, control, end, newCommand, newActions } from '@/lib/store';
import { useSnapshot } from 'valtio';
// import InfoPanel from '../ui/panels/InfoPanel';
// import { styles } from './styles';
// import Link from 'next/link';
// import Heading from '../layouts/heading';
// // import Help from '../help';
// // import Presets from '../presetPaths/l';


export const C = (props) => {

  function setCCommand(){
    const newShowPresets= { ...props.showPresets, ['c']: true }
    props.setShowPresets(newShowPresets)
    // newActions.setType('c');
    // newActions.setStartPoint(50, 50);
    // newActions.setFirstControl(25, 50);
    // newActions.setSecondControl(75, 50);
    // newActions.setEndPoint(100, 0);
    // console.log('showPresets is: ', props.showPresets)
  }
  return(
    <p onClick={setCCommand} className="font-sans text-rose-500 bg-zinc-300 w-12 h-12 flex items-center justify-center hover:text-rose-400 text-[28px] hover:bg-zinc-600 hover:font-semibold cursor-pointer border-2 border-zinc-600 hover:border-zinc-300 rounded-xl" style={styles.button}>
        C
      </p>
  )
}
// // export const S = (props) => {
// //   const [modalIsOpen, setModalIsOpen] = useState(false);
 
// //   function openModal(){
// //     props.setSecondCtrl({x:75, y:50})
// //     props.setEndPoint({x:100, y:0})
// //     setModalIsOpen(true)
// //   }
// //   function closeModal(){
// //     setModalIsOpen(false)
// //   }
// //   const first = {
// //     type:'s',
// //     id: pathSnap.commands.length+1,
// //     startPoint: {x: 50, y: 50},
// //     controlPoints: [{key: 'dx2', value:75}, {key: 'dy2', value:50}],
// //     endPoint: {x: 100, y: 0},
// //   }

// //   function addToPath(){
// //     const sPath = {
// //     type: 's',
// //     id: pathSnap.commands.length+1,
// //     startPoint: {x: startX, y: startY},
// //     controlPoints: [{key: 'dx2', value:props.secondCtrl.x}, {key: 'dy2', value:props.secondCtrl.y}],
// //     endPoint: {x: props.endPoint.x,y: props.endPoint.y}
// //     }
// //     const newPath = [...path, sPath]
// //     props.setPath(newPath)
// //     props.setPathID(pathSnap.commands.length+1)  
// //     setModalIsOpen(false) 
// //   }

// //   return (
// //     <View style={styles.outerContainer}>
// //       <Text onClick={openModal} onMouseOver={() => hoverFunc('s')} onMouseLeave={resetHover} style={hover.s?styles.hover:styles.button}>
// //         S
// //       </Text>
// //       <Modal
// //       animationType="slide"
// //       transparent={false}
// //       visible={modalIsOpen}
// //       onRequestClose={closeModal}
// //       >
// //         <View style={styles.row}>
// //           <View style={styles.middleSection}>
// //             <View style={styles.titleContainer}>
// //               <Text style={styles.title}>
// //                 New S Command
// //               </Text>
// //             </View>
// //             <View style={styles.container}>
// //               <GridWithDrag size="250" path={first} startPoint={props.startPoint} setStartPoint={props.setStartPoint} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc}/>
// //             </View>
// //           </View>
// //           <View style={styles.container}>
// //             {/* <Help url="https://svgwg.org/svg2-draft/paths.html#PathDataCubicBezierCommands" /> */}
// //             <ControlTables type="s" labelBgColor="#fff" fontSize={15} labelColor={props.controlSnap.colour} borderColor={props.controlSnap.colour} secondCtrl={props.secondCtrl} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
// //             <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.endSnap.colour} borderColor={props.endSnap.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
// //           </View>
// //         </View>
// //         <View style={styles.subCan}>
// //           <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
// //           <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
// //         </View>
// //       </Modal>
// //     </View>
// //   )
// // };

// // export const Q = (props) => {
// //   const [modalIsOpen, setModalIsOpen] = useState(false);
// //     function openModal(){
// //       props.setFirstCtrl({x:25, y:50})  
// //       props.setEndPoint({x:50, y:0})
// //       setModalIsOpen(true)
// //     }
// //     function closeModal(){
// //       setModalIsOpen(false)
// //     }

// //     const first = {
// //       type: 'q',
// //       id: pathSnap.commands.length+1,
// //       startPoint: {x: 50, y: 50},
// //       controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}],
// //       endPoint: {x:50, y: 0}
// //     }
// //     const [defaultPath, setDefaultPath] = useState(first);

// //     function addToPath(){
// //       const qPath = {
// //         type: 'q',
// //         id: pathSnap.commands.length+1,
// //         startPoint: {x: startX, y: startY},
// //         controlPoints: [{key: 'dx1', value:props.firstCtrl.x}, {key: 'dy1', value:props.firstCtrl.y}],
// //         endPoint: {x: props.endPoint.x,y: props.endPoint.y}
// //       } 
      
// //       const newPath = [...path, qPath]
// //       props.setPath(newPath)
// //       props.setPathID(pathSnap.commands.length+1)
// //       setModalIsOpen(false)
// //   }

// //   return (
// //     <View style={styles.outerContainer}>
// //       <Text onClick={openModal} onMouseOver={() => hoverFunc('q')} onMouseLeave={resetHover} style={hover.q?styles.hover:styles.button}>
// //         Q
// //       </Text>
// //       <Modal
// //       animationType="slide"
// //       transparent={false}
// //       visible={modalIsOpen}
// //       onRequestClose={closeModal}
// //       >
// //         <View style={styles.row}>
// //           {/* <Presets pathID={pathSnap.commands.length} defaultPath={defaultPath} setDefaultPath={setDefaultPath} stroke={props.stroke} strokeWidth={props.strokeWidth} setFirstCtrl={props.setFirstCtrl} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} endPoint={props.endPoint} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} /> */}
// //           <View style={styles.middleSection}>
// //             <View style={styles.titleContainer}>
// //               <Text style={styles.title}>
// //                 New Q Command
// //               </Text>
// //             </View>
// //             <View style={styles.container}>
// //               <GridWithDrag size="250" path={defaultPath} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} />
// //             </View>
// //           </View>
// //           <View style={styles.container}>
// //             <Help url="https://svgwg.org/svg2-draft/paths.html#PathDataQuadraticBezierCommands" />
// //             <ControlTables type="q" labelBgColor="#fff" fontSize={15} labelColor={props.controlSnap.colour} borderColor={props.controlSnap.colour} firstCtrl={props.firstCtrl} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
// //             <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.endSnap.colour} borderColor={props.endSnap.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
// //           </View>
// //         </View>
// //         <View style={styles.subCan}>
// //           <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
// //           <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
// //         </View>
// //       </Modal>
// //     </View>
// //   )
// // };

// // export const T = (props) => {
// //   const [modalIsOpen, setModalIsOpen] = useState(false);
// //   function openModal(){ 
// //       props.setEndPoint({x:50, y:0})
// //       setModalIsOpen(true)
// //   }
// //   function closeModal(){
// //       setModalIsOpen(false)
// //   }

// //   const defaultPath = {
// //       type: 't',
// //       id: pathSnap.commands.length+1,
// //       startPoint: {x: 50, y: 50},
// //       endPoint: {x:50, y: 0},
// //   }

// //   function addToPath(){
// //     const tPath = {
// //       type: 't',
// //       id: pathSnap.commands.length+1,
// //       startPoint: {x: startX, y: startY},
// //       endPoint: {x: props.endPoint.x,y: props.endPoint.y}
// //     } 
// //     const newPath = [...path, tPath]
// //     props.setPath(newPath)
// //     props.setPathID(pathSnap.commands.length+1)
// //     setModalIsOpen(false)
// //   }
 
// //   return (
// //     <View style={styles.outerContainer}>
// //       <Text onClick={openModal} onMouseOver={() => hoverFunc('t')} onMouseLeave={resetHover}  style={hover.t?styles.hover:styles.button}>T</Text>
// //         <Modal
// //         animationType="slide"
// //         transparent={false}
// //         visible={modalIsOpen}
// //         onRequestClose={closeModal}
// //         >
// //           <View style={styles.row}>
// //             <View style={styles.middleSection}>
// //             <View style={styles.titleContainer}>
// //             <Text style={styles.title}>New T Command</Text>
// //           </View>
// //             <View style={styles.container}>
// //               <GridWithDrag size="250" path={defaultPath} pathID={pathSnap.commands.length} fullPath={path} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} />
// //             </View> 
// //           </View>
// //           <View style={styles.container}>
// //           {/* <Help url="https://svgwg.org/svg2-draft/paths.html#PathDataQuadraticBezierCommands" /> */}
// //             <EndTable label="End Point" labelBgColor="#fff" fontSize={15} labelColor={props.endSnap.colour} borderColor={props.endSnap.colour} endPoint={props.endPoint} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} hover={hover}/>
// //           </View>
// //         </View>
// //         <View style={styles.subCan}>
// //           <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.tub?styles.submitHover:styles.submitButton}>Add to path!</Text>
// //           <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
// //         </View>
// //       </Modal>
// //     </View>
// //   )
// // };



const styles= StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    width: 'min-content',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    display: 'flex',
    margin: 10
  },
  button: {
    margin: 2,
    textShadow: '-2px 1.5px 3.5px rgba(0, 0, 0, 0.75)'
  },
  subCan: {
    display: 'flex',
    flexDirection: 'row',
  }
})