// CANNOT IMPORT THINGS FROM REACT OR NATIVE SO BUILD COMPONENTS TO IMPORT
'use client';
import { View, StyleSheet, Text } from "react-native-web";
import Title from "@/components/layouts/title";
import NewGridWithDrag from "@/components/ui/newGridWithDrag";
import Table from "@/components/ui/Tables";
import Link from "next/link";
import { C } from '@/components/commands/curves';
import CPresets from '@/components/ui/presetPaths/c';
// import { L, V, H } from '@/components/commands/lines';
import { path, addToPath, fill, stroke, control, end, newCommand, newActions } from '@/lib/store';
import { useSnapshot, subscribe, snapshot } from 'valtio';
import Heading from "@/components/layouts/heading";
import { useState } from "react";
import localforage from "localforage";
import { PresetsRainbowPanel } from "@/components/ui/panels/RainbowPanel";

const AddCommand = () => {
  const [newType, setNewType] = useState('');

  const newSnap = useSnapshot(newCommand);
  subscribe(newCommand, () => {
    localforage.setItem("newCommand", snapshot(newCommand));
    setNewType(newCommand.command.type);
  })
  const [showPresets, setShowPresets] = useState({c:false, l:false, q:false})
  // function displayExtras(){
  //   if ( path[path.length-1].type==="q" || path[path.length-1].type==="t"){
  //     return(
        // <T path={path} setPath={addToPath} pathID={path.length} stroke={stroke} fill={fill} info={info} setInfo={setInfo} endPoint={endPoint} setEndPoint={setEndPoint} end={end} />
  //     )
  //   } else if(path[path.length-1].type==="c"){
  //     return(
  //       <S path={path} setPath={addToPath} pathID={path.length} stroke={stroke} fill={fill} info={info} setInfo={setInfo} endPoint={endPoint} setEndPoint={setEndPoint} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} control={control} end={end} />
  //     )
  //   } else {}
  // }
  const [hover, setHover] = useState({sub: false, can:false})
  function hoverFunc(i){
    const newHover = { ...hover, [i]: true}
    setHover(newHover)
  }
  function resetHover(){
    setHover({sub: false, can: false})
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title title="Add" />
        {
        newType!=''&&<Heading heading={`New '${newType}' Command`} color="rgba()"/>
        }
      </View>
      <View style={styles.row}>
        <View id="presetView" style={styles.presets}>
        {
          showPresets.c?<CPresets />:<></>
        }
        </View>
        <NewGridWithDrag size="350" resetHover={resetHover} hoverFunc={hoverFunc}/>
        {newSnap.type==='c' && <Table label="Control Points" array={[{title: 'd1', points: {x: newSnap.firstControl.x, y: newSnap.firstControl.y}}, {title: 'd2', points: {x: newSnap.secondControl.x, y: newSnap.secondControl.y}}]} colour={controlSnap.color} startX={newSnap.startPoint.x} startY={newSnap.startPoint.y} />}
        {newSnap.type==='q' && <Table label="Control Points" array={[{title: 'd1', points: {x: newSnap.firstControl.x, y: newSnap.firstControl.y}}]} colour={controlSnap.color} startX={newSnap.startPoint.x} startY={newSnap.startPoint.y} />}
        {newSnap.type==='s' && <Table label="Control Points" array={[{title: 'd2', points: {x: newSnap.secondControl.x, y: newSnap.secondControl.y}}]} colour={controlSnap.color} startX={newSnap.startPoint.x} startY={newSnap.startPoint.y} />}
        {newSnap.type!=null&&
        <Table label="End Point" array={[{title: null, points: {x: newSnap.endPoint.x, y: newSnap.endPoint.y}}]} colour={endSnap.color} startX={newSnap.startPoint.x} startY={newSnap.startPoint.y} />}
      </View>
      <PresetsRainbowPanel style={styles.rainbow}>
        <View style={styles.buttons}>
                          <C showPresets={showPresets} setShowPresets={setShowPresets}/>
        </View>
      </PresetsRainbowPanel>
      <View style={styles.subCan}>
        <Link href="/path/viewPath" onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Confirm</Link>
        <Link href="/path/viewPath">
          <p className="">
            Cancel
          </p>
        </Link>
      </View>
      
    </View>
  )
};

export default AddCommand;

const styles= StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  presets:{
    // backgroundColor: 'green',
    width: 100,
    height: 500,
    display: 'flex',
    backgroundColor: 'red'
  },
  buttons: {
    display: 'flex',
    margin: 10
  },
  button: {
    margin: 2,
    textShadow: '-2px 1.5px 3.5px rgba(0, 0, 0, 0.75)'
  },
  rainbow: {
    height: 'min-content'
  },
  subCan: {
    display: 'flex',
    flexDirection: 'row',
  }
})