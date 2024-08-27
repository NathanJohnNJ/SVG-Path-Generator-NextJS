// 'use client';
// import { Path } from 'react-native-svg-web';
// import { createContext, useContext, useState, useEffect } from 'react';
// import PathFromArray from './pathFromArray';

// const PathContext = createContext();

// export default function PathFromArray() {
//   const [path, setPath] = useState([
//     {
//       type:'c',
//       name: 'Curve',       
//       commandId: 0,
//       startPoint: { 
//         x: 50,
//         y: 50
//       },
//       controlPoints: [
//         {
//           d1: { 
//             x: 25,
//             y: 50
//           }
//         },
//         {
//           d2: { 
//             x: 75,
//             y: -50
//           }
//         }
//       ],
//        endPoint: { 
//         x: 100,
//         y: 0
//       }
//     }
//   ]);
//   useEffect(()=> {
//     console.log(path)
//   })
//   return (
//     <PathContext.Provider value={[ path, setPath ]}>
//       <FullPath />
//     </PathContext.Provider>
//   );
// }

// const FulPath = (props) => {
//   const [path, setPath] = useContext(PathContext)

//   return(
//       <Path d={props.fullPath} id="mainPath" stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeWidth={props.strokeWidth} />
//   )
// };
