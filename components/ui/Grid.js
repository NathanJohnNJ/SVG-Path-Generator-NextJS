'use client';
import { StyleSheet, View } from 'react-native-web';
import Svg, { G, Rect, Defs, Pattern, Line } from "react-native-svg-web";
import { GridBorder } from './panels/Panels';

const Grid = (props) => {
  const viewBox = `0 0 ${props.size} ${props.size}`;
  
  
  return(
    <GridBorder>
    <View style={[styles.grid, {width: props.mainWidth, height: props.mainWidth}]}>
      <Svg id={props.id} width={props.size} height={props.size} viewBox={viewBox} x="0" y="0" onMouseMove={props.onMouseMove?props.onMouseMove:null} onMouseLeave={props.onMouseLeave?props.onMouseLeave:null}>
        <Defs>
          <Pattern
          id="LinePattern"
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="10"
          height="10"
          viewBox="0 0 10 10">
            <Line x1="0" y1="0" x2="0" y2={props.size} stroke='#bbb'  />
            <Line x1="0" y1="0" x2={props.size} y2="0" stroke='#bbb'  />
          </Pattern>
          <Pattern
          id="ThickLinePattern"
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="50"
          height="50"
          viewBox="0 0 50 50">
            <Line x1="0" y1="0" x2="0" y2={props.size} stroke='#bbb' strokeWidth="5" />
            <Line x1="0" y1="0" x2={props.size} y2="0" stroke='#bbb' strokeWidth="5" />
          </Pattern>
        </Defs>
        <G>
          <Rect fill="url(#LinePattern)" stroke="#bbb" strokeWidth="2" x="0" y="0" width={props.size} height={props.size} />
          <Rect fill="url(#ThickLinePattern)" stroke="#bbb" strokeWidth="5" x="0" y="0" width={props.size} height={props.size} />
        </G>
        {props.children}
      </Svg>
    </View>
    </GridBorder>
  )
};

export default Grid;

const styles = StyleSheet.create({
    grid:{
        backgroundColor: '#f2f2f2',
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        padding: 5                               
    }
})