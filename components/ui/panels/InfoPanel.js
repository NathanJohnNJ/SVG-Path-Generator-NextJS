'use client';
import { InfoStyledPanel } from "./Panels";
import { RainbowButton } from "./RainbowPanel";
import { StyleSheet, View, Text, Pressable } from 'react-native-web';
import Link from "next/link";
import Table from '../Tables';
import { useState } from "react";

// Takes array of [{title: '', points: {x: '', y:''}}]
const InfoPanel = (props) => {

  const [hover, setHover] = useState({sub: false, can: false, end: false , d1:false, d2: false});
  function hoverFunc(i){
      const newHover = { ...hover, [i]: true}
      setHover(newHover)
  }

  function resetHover(){
    setHover({sub: false, can: false, end:false, d1:false, d2: false})
  }

  return (
    <InfoStyledPanel>
      {props.selected  &&
      <View style={styles.panel}>

      {props.selected.type==='c' && <Table label="Control Points" array={[{title: 'd1', points: {x: props.selected.controlPoints[0].d1.x, y: props.selected.controlPoints[0].d1.y}}, {title: 'd2', points: {x: props.selected.controlPoints[1].d2.x, y: props.selected.controlPoints[1].d2.y}}]} colour={props.control.colour} startX={props.selected.startPoint.x} startY={props.selected.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
      {props.selected.type==='q' && <Table label="Control Points" array={[{title: 'd1', points: {x: props.selected.controlPoints[0].d1.x, y: props.selected.controlPoints[0].d1.y}}]} colour={props.control.colour} startX={props.selected.startPoint.x} startY={props.selected.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
      {props.selected.type==='s' && <Table label="Control Points" array={[{title: 'd1', points: {x: props.selected.controlPoints[0].d2.x, y: props.selected.controlPoints[0].d2.y}}]} colour={props.control.colour} startX={props.selected.startPoint.x} startY={props.selected.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}

      <Table label="End Point" array={[{title: null, points: {x: props.selected.endPoint.x, y: props.selected.endPoint.y}}]} colour={props.end.colour} startX={props.selected.startPoint.x} startY={props.selected.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>
      
      <RainbowButton>
        <Link
        href='editCommand'
        className="rounded-lg border border-transparent transition-colors text-center text-base"
        >
          Edit  
        </Link>
      </RainbowButton>
      </View>
  } 
    </InfoStyledPanel>
  )
};

export default InfoPanel;

const styles = StyleSheet.create({
  panel:{
  },

})