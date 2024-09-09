'use client';
import { StyleSheet, View } from 'react-native-web';
import Svg, { G, Rect, Defs, Pattern, Line } from "react-native-svg-web";
import { GridBorder } from './panels/Panels';
import { useLayoutEffect, useState } from 'react';

const Grid = (props, {children}) => {

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  const [width, height] = useWindowSize();
  const size = (width<height?width:height)>400?400:(width<height?width:height)

  const viewBox = `0 0 ${size} ${size}`;
  
  return(
    <GridBorder>
    <View style={styles.grid}>
      <Svg id={props.id} width={size} height={size} viewBox={viewBox} x="0" y="0" onMouseMove={props.onMouseMove?props.onMouseMove:null} onMouseLeave={props.onMouseLeave?props.onMouseLeave:null}>
        <Defs>
          <Pattern
          id="LinePattern"
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="10"
          height="10"
          viewBox="0 0 10 10">
            <Line x1="0" y1="0" x2="0" y2={size} stroke='#bbb' />
            <Line x1="0" y1="0" x2={size} y2="0" stroke='#bbb' />
          </Pattern>
          <Pattern
          id="ThickLinePattern"
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="50"
          height="50"
          viewBox="0 0 50 50">
            <Line x1="0" y1="0" x2="0" y2={size} stroke='#bbb' strokeWidth="5" />
            <Line x1="0" y1="0" x2={size} y2="0" stroke='#bbb' strokeWidth="5" />
            <Rect fill="#777" fillOpacity="0.1" x="0" y="0" width={size} height={size}>
            </Rect>
          </Pattern>
        </Defs>
        <G>
          <Rect fill="url(#LinePattern)" stroke="#bbb" strokeWidth="2" x="0" y="0" width={size} height={size} />
          <Rect fill="url(#ThickLinePattern)" stroke="#bbb" strokeWidth="5" x="0" y="0" width={size} height={size} />
        </G>
        {children}
      </Svg>
    </View>
    </GridBorder>
  )
};

export default Grid;

const styles = StyleSheet.create({
    grid:{
        backgroundColor: '#ebebeb',
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        padding: 5                               
    }
})