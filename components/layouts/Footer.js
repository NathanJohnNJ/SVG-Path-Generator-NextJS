// 'use client';
// import { View, Text, StyleSheet } from 'react-native-web';
// import { Svg, Path, ForeignObject, G, Defs, LinearGradient, Stop } from 'react-native-svg-web';
// import { useState, useLayoutEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const Footer = ( props ) => {
    
//     function useWindowSize() {
//         const [size, setSize] = useState([0, 0]);
//         useLayoutEffect(() => {
//           function updateSize() {
//             setSize([window.innerWidth, window.innerHeight]);
//           }
//           window.addEventListener('resize', updateSize);
//           updateSize();
//           return () => window.removeEventListener('resize', updateSize);
//         }, []);
//         return size;
//       }

//     const [width, height] = useWindowSize();
//     const viewbox = `0 0 ${width} ${height}`;
//     const myPath = `M${width},${height}h-${width}v-150 c${width/12},-20 ${width/6},20 ${width/3},0 s${width/6},20 ${width/3},0s${width/6},-20 ${width/3}z`;

//     return(
//       <div className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
//         <Svg style={styles.footer} className="w-full" x="0" y={height-150} viewbox={viewbox}>
//           <Defs>
//             <LinearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="0%">
//               <Stop offset="0%" stopColor="#eee"  />
//               <Stop offset="50%" stopColor="#aaa" />
//               <Stop offset="100%" stopColor="#444" />
//             </LinearGradient>
//           </Defs>
//           <G>
//             <Path d={myPath} x={width} y={height} fill="url(#grad)" stroke="none" preserveAspectRatio="minXminY meet" width="100%">
//             <ForeignObject x={width/3} y={80} width={width/2} height={120} >
//               <View style={styles.footerMain}>
//               <Link
//                 className="pointer-events-none flex place-items-center gap-2 p-8"
//                 href="https://www.njtd.xyz"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 >
//                   <Image
//                   src="/images/logoBlack.svg"
//                   width={125}
//                   height={125}
//                   className="image"
//                   alt="NJTD Logo"
//                   priority
//                   />
//                 </Link>
//                 <View style={styles.footerText}>
//                   <View style={styles.textLine}>
                    
//                   </View>
//                   <View style={styles.textLine}>
                    
//                   </View>
//                   <View style={styles.textLine}>
//                     
//                   </View>
//                 </View>
                
//               </View>
//             </ForeignObject>
//             </Path>
//           </G>
//         </Svg>
//       </div>
//     )
// };

// export default Footer;


'use client';
import { useState, useLayoutEffect } from "react";
import { Svg, LinearGradient, Path, Text, Defs, Stop, G, ForeignObject } from 'react-native-svg-web';
import Link from "next/link";
import { StyleSheet } from "react-native-web";
import Logo from '@/public/images/logoBlack.svg';
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
  const myPath = `M0,20 c${width/16},60 ${width/8},-40 ${width/4},0 s${width/8},-30 ${width/4},5s${width/8},-40 ${width/4},0s${width/8},-60 ${width/4},10 l0,120 l-${width},0z`;

  return (
    <Svg className="w-full h-fit backdrop-blur-2xl relative">
      <Defs>
        <LinearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#444"  />
          <Stop offset="50%" stopColor="#aaa" />
          <Stop offset="100%" stopColor="#eee" />
        </LinearGradient>
        <LinearGradient id="grad2" x1="0%" x2="100%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#fff" />
          <Stop offset="50%" stopColor="#222" />
          <Stop offset="100%" stopColor="#000" />
        </LinearGradient>
      </Defs>
      <G x="0" y="0" viewBox={viewbox} className="relative">
        <Path x="0" y="0" viewBox={viewbox} fill="url(#grad)" d={myPath} stroke="none" preserveAspectRatio="minXminY meet" width="100%" height={200}/>
        
        <Text x={(width-100)/2} y={60} width="100%" height="100%" dy="10" dx="35" stroke="url(#grad2)" strokeWidth="0.5" fill="url(#grad)" textAnchor="middle" className="font-extrabold text-[16px]  translate-y-4" >
            Thanks for checking out my SVG Path Generator!
            </Text>
        <Text x={(width-100)/2} y={80} width="100%" height="100%" dy="10" dx="35" stroke="url(#grad2)" strokeWidth={0.5} fill="url(#grad)" textAnchor="middle" className=" font-extrabold text-[16px]  translate-y-4" >
          View the rest of my portfolio at {"  "}
          <Link href="https://www.njtd.xyz/portfolio/developer" target="_blank" rel="noreferrer" className="hover:text-xl text-zinc-600 hover:text-zinc-400 translate-y-4" >
            www.njtd.xyz
          </Link>
        </Text>
        <Text x={(width-100)/2} y={100} width="100%" height="100%" dy="10" dx="35" stroke="url(#grad2)" strokeWidth={0.5} fill="url(#grad)" textAnchor="middle" className="font-extrabold text-[16px]  translate-y-4" >
          Or see what I'm currently working on on{" "}
          <Link href="https://github.com/NathanJohnNJ" target="_blank" rel="noreferrer" className="hover:text-xl text-zinc-600 hover:text-zinc-400">
            GitHub
        </Link>
        </Text>
        
        {/* <Link
        className="pointer-events-none absolute right"
        href="https://www.njtd.xyz"
        target="_blank"
        rel="noopener noreferrer"
        >
          <Image
          href="/images/logoBlack.svg"
          width={125}
          height={125}
            alt="NJTD Logo"
            className=""
            />
        </Link> */}
      </G>
      <ForeignObject style={styles.object} x={0} y={0} width="100%" height="100%" viewBox={viewbox}>
        <Image src="/images/greyLogo.png" alt="Logo" height={125} width={125} style={styles.grey} className="translate-y-12"/>
        <Image src="/images/logoBlack.svg" alt="Logo" height={90} width={90} style={styles.image}/>
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
    marginLeft: '7vw',
  },
  image: {
    display: 'flex',
    marginLeft: '61vw',
    marginTop: '-8vh'
  }
})