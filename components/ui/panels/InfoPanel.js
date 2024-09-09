'use client';
import { InfoStyledPanel } from "./Panels";
import { View, StyleSheet } from 'react-native-web';
import Table from '../Tables';
import { useState } from "react";
import { useSnapshot } from "valtio";
import { end, control, selected } from '@/lib/store';

const InfoPanel = () => {
  const endSnap = useSnapshot(end);
  const controlSnap = useSnapshot(control);
  const selectedSnap = useSnapshot(selected)

  const [hover, setHover] = useState({sub: false, can: false, end: false, d1: false, d2: false});
  function hoverFunc(i){
      const newHover = { ...hover, [i]: true}
      setHover(newHover)
  }

  function resetHover(){
    setHover({sub: false, can: false, end:false, d1:false, d2: false})
  }

  return (
    <>
      {selectedSnap.command.type != null &&
        <InfoStyledPanel id="infoPanel">
          <View style={styles.tables}>
          {selectedSnap.command.type==='c' && <Table label="Control Points" array={[{title: 'd1', points: {x: selectedSnap.command.firstControl.x, y: selectedSnap.command.firstControl.y}}, {title: 'd2', points: {x: selectedSnap.command.secondControl.x, y: selectedSnap.command.secondControl.y}}]} colour={controlSnap.color} startX={selectedSnap.command.startPoint.x} startY={selectedSnap.command.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
          {selectedSnap.command.type==='q' && <Table label="Control Points" array={[{title: 'd1', points: {x: selectedSnap.command.firstControl.x, y: selectedSnap.command.firstControl.y}}]} colour={controlSnap.color} startX={selectedSnap.command.startPoint.x} startY={selectedSnap.command.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
          {selectedSnap.command.type==='s' && <Table label="Control Points" array={[{title: 'd2', points: {x: selectedSnap.command.secondControl.x, y: selectedSnap.command.secondControl.y}}]} colour={controlSnap.color} startX={selectedSnap.command.startPoint.x} startY={selectedSnap.command.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
          <Table label="End Point" height={80} array={[{title: null, points: {x: selectedSnap.command.endPoint.x, y: selectedSnap.command.endPoint.y}}]} colour={endSnap.color} startX={selectedSnap.command.startPoint.x} startY={selectedSnap.command.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>
          </View>
        </InfoStyledPanel>
      } 
    </>
  )
};

export default InfoPanel;

const styles = StyleSheet.create({
  tables:{
    display: 'flex',
    flexDirection: 'row'
  }
})