'use client';
import { useState, useLayoutEffect } from "react";
import { Svg, LinearGradient, Path, Text, Defs, Stop, G } from 'react-native-svg-web';

const Header = () => {
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
  const viewbox = `0 0 ${width} ${height}`;
  const myPath = `M0,0 l${width},0 l0,120 c-${width/16},60 -${width/8},-40 -${width/4},0 s-${width/8},-30 -${width/4},5s-${width/8},-40 -${width/4},0s-${width/8},-60 -${width/4},10z`;

  return (
    <div className="w-full h-fit ">
      <Svg className="w-full h-fit">
        <Defs>
          <LinearGradient id="grad" >
            <Stop offset="0%" stopColor="rgba(68,68,68,0)"  />
            <Stop offset="10%" stopColor="rgba(68,68,68,0)"  />
            <Stop offset="35%" stopColor="#444"  />
            <Stop offset="60%" stopColor="#aaa" />
            <Stop offset="75%" stopColor="#eee" />
            <Stop offset="90%" stopColor="rgba(238,238,238,0)"  />
            <Stop offset="100%" stopColor="rgba(238,238,238,0)"  />
          </LinearGradient>
          <LinearGradient id="grad2" >
            <Stop offset="0%" stopColor="#ddd"  />
            <Stop offset="50%" stopColor="#999" />
            <Stop offset="100%" stopColor="#333" />
          </LinearGradient>
          <LinearGradient id="rainbow" x1="0%" x2="100%" y1="0%" y2="0%">
            <Stop offset="0%" stopColor="blue">
              <animate attributeName="stop-color" dur="25000ms" values="blue;magenta;red;yellow;lightgreen;aqua;lightgreen;yellow;red;magenta;blue" repeatCount="indefinite" />
            </Stop>
            <Stop offset="20%" stopColor="magenta">
              <animate attributeName="stop-color" dur="25000ms" values="magenta;red;yellow;lightgreen;aqua;blue;aqua;lightgreen;yellow;red;magenta" repeatCount="indefinite" />
            </Stop>
            <Stop offset="40%" stopColor="red">
              <animate attributeName="stop-color" dur="25000ms" values="red;yellow;lightgreen;aqua;blue;magenta;blue;aqua;lightgreen;yellow;red" repeatCount="indefinite" />
            </Stop>
            <Stop offset="60%" stopColor="orange">
              <animate attributeName="stop-color" dur="25000ms" values="yellow;lightgreen;aqua;blue;magenta;red;magenta;blue;aqua;lightgreen;yellow" repeatCount="indefinite" />
            </Stop>
            <Stop offset="80%" stopColor="yellow">
              <animate attributeName="stop-color" dur="25000ms" values="lightgreen;aqua;blue;magenta;red;yellow;red;magenta;blue;aqua;lightgreen" repeatCount="indefinite" />
            </Stop>
            <Stop offset="100%" stopColor="greenyellow">
              <animate attributeName="stop-color" dur="25000ms" values="aqua;blue;magenta;red;yellow;lightgreen;yellow;red;magenta;blue;aqua" repeatCount="indefinite" />
            </Stop>
          </LinearGradient>
        </Defs>
        <G x="0" y="0" viewBox={viewbox}>
          <Path x="0" y="0" viewBox={viewbox} fill="url(#grad)" d={myPath} stroke="none" preserveAspectRatio="minXminY meet" width="100%" height={200}/>
          <Text id="svgText" x={(width-100)/2} y={50} width="100%" height="100%" dy="10" dx="130,-2,-2,-5,0,-1,-3,0,-5,0,0,-1,-1,-4,1,-3,-1,-1.5" stroke="url(#rainbow)" strokeWidth={1.5} fill="url(#grad2)" textAnchor="middle" className="font-mono font-extrabold" >
            SVG Path Generator
          </Text>
        </G>
      </Svg>
    </div>
  )
};

export default Header;