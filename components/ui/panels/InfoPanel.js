'use client';
import { InfoStyledPanel } from "./Panels";
import { View } from 'react-native-web';
import Table from '../Tables';
import { useState } from "react";
import { useSnapshot } from "valtio";
import { end, control, selected } from '@/lib/store';

const InfoPanel = (props) => {
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
      {props.selected  &&
        <InfoStyledPanel>
          <View>
          {selectedSnap.type==='c' && <Table label="Control Points" array={[{title: 'd1', points: {x: selectedSnap.firstControl.x, y: selectedSnap.firstControl.y}}, {title: 'd2', points: {x: selectedSnap.secondControl.x, y: selectedSnap.secondControl.y}}]} colour={controlSnap.color} startX={selectedSnap.startPoint.x} startY={selectedSnap.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
          {selectedSnap.type==='q' && <Table label="Control Points" array={[{title: 'd1', points: {x: selectedSnap.firstControl.x, y: selectedSnap.firstControl.y}}]} colour={controlSnap.color} startX={selectedSnap.startPoint.x} startY={selectedSnap.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
          {selectedSnap.type==='s' && <Table label="Control Points" array={[{title: 'd2', points: {x: selectedSnap.secondControl.x, y: selectedSnap.secondControl.y}}]} colour={controlSnap.color} startX={selectedSnap.startPoint.x} startY={selectedSnap.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
          <Table label="End Point" array={[{title: null, points: {x: selectedSnap.endPoint.x, y: selectedSnap.endPoint.y}}]} colour={endSnap.color} startX={selectedSnap.startPoint.x} startY={selectedSnap.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>
          </View>
        </InfoStyledPanel>
      } 
    </>
  )
};

export default InfoPanel;