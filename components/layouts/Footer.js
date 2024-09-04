'use client';
import { useState, useLayoutEffect } from "react";
import { Svg, LinearGradient, Path, Text, Defs, Stop, G, ForeignObject } from 'react-native-svg-web';
import Link from "next/link";
import { StyleSheet } from "react-native-web";
import Image from "next/image";

const Footer = () => {
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
  const myPath = `M0,40 c${width/16},60 ${width/8},-40 ${width/4},0 s${width/8},-30 ${width/4},5s${width/8},-40 ${width/4},0s${width/8},-60 ${width/4},10 l0,100 l-${width},0z`;

  return (
    <Svg className="w-full h-fit backdrop-blur-2xl relative">
      <Defs>
        <LinearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#444"  />
          <Stop offset="50%" stopColor="#aaa" />
          <Stop offset="100%" stopColor="#eee" />
        </LinearGradient>
        <LinearGradient id="grad2" x1="100%" x2="0%" y1="100%" y2="0%">
          <Stop offset="0%" stopColor="#222" />
          <Stop offset="50%" stopColor="#444" />
          <Stop offset="100%" stopColor="#222" />
        </LinearGradient>
      </Defs>
      <G x="0" y="0" viewBox={viewbox} className="relative">
        <Path x="0" y="0" viewBox={viewbox} fill="url(#grad)" d={myPath} stroke="none" preserveAspectRatio="minXminY meet" width="100%" height={200}/>
        
        <Text x={((width-100)/2)+40} y={85} width="100%" height="100%" stroke="#333" strokeWidth={0.5} fill="#eee" textAnchor="middle" className="font-extrabold text-[16px]" >
            Thanks for checking out my SVG Path Generator!
            </Text>
        <Text x={((width-100)/2)+75} y={108} width="100%" height="100%" stroke="#333" strokeWidth={0.5} fill="#eee" textAnchor="middle" className=" font-extrabold text-[16px]" >
          View the rest of my portfolio at {" "}
          <Link href="https://www.njtd.xyz/portfolio/developer" target="_blank" rel="noreferrer" className="hover:text-xl" >
            www.njtd.xyz
          </Link>
        </Text>
        <Text x={((width-100)/2)+125} y={131} width="100%" height="100%" stroke="#333" strokeWidth={0.5} fill="#eee" textAnchor="middle" className="font-extrabold text-[16px]" >
          Or see what I'm working on on{" "}
          <Link href="https://github.com/NathanJohnNJ" target="_blank" rel="noreferrer" className="hover:text-xl">
            GitHub{" "}
          </Link>
          lately
        </Text>
      </G>
      <ForeignObject style={styles.object} x={0} y={0} width="100%" height="100%" viewBox={viewbox}>
        <Link
        className="pointer-events-none absolute right"
        href="https://www.njtd.xyz"
        target="_blank"
        rel="noopener noreferrer"
        >
          <Image src="/images/greyLogo.png" alt="Logo" height={125} width={125} style={styles.grey} className="translate-y-12" />
        </Link>
        <Link
        className="pointer-events-none absolute right"
        href="https://www.njtd.xyz"
        target="_blank"
        rel="noopener noreferrer"
        >
          <Image src="/images/logoBlack.svg" alt="Logo" height={90} width={90} style={styles.image} />
        </Link>
      </ForeignObject>
    </Svg>
  )
};

export default Footer;

const styles = StyleSheet.create({
  object:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginLeft: '50vw',
    marginTop: '3vh'
  },
  grey: {
    display: 'flex',
    marginLeft: '6vw',
  },
  image: {
    display: 'flex',
    marginLeft: '85vw',
    marginTop: '23vh'
  }
})