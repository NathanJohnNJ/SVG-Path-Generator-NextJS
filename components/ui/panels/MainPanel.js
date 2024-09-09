'use client';
import { useState, useLayoutEffect } from 'react';
import PathFromArray from "@/components/ui/pathFromArray";
import Grid from '@/components/ui/Grid';
import { HorizontalPanel } from './Panels';
import ConfigPanel from './ConfigPanel';
import CommandPanel from './CommandPanel';
import { StyleSheet, View } from 'react-native-web';
import InfoPanel from './InfoPanel';
import PathText from '../PathText';
import { path } from '@/lib/store';
import { useSnapshot } from 'valtio';

const MainPanel = (props) => {
  const [selected, setSelected] = useState(null);
  const snap= useSnapshot(path);
  
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

//   const [width, height] = useWindowSize();
// if(width<='770'){
//   return(
//     <View style={styles.main}>
//       <HorizontalPanel heading="Path">
//         <div id="cssGrid" className="grid grid-cols-5 grid-flow-rows gap-4">
//           <div id="commandDiv" className="col-start-1 col-end-5 row-start-1 row-end-1">
//         <View id="commandPanel" style={smallStyles.horizontalView} />
//     </div>
//         <div style={smallStyles.gridDiv}>
//             <Grid id="mainGrid" size={400} mainWidth={450}>
//               <PathFromArray path={path} setSelected={setSelected} size={400} />
//             </Grid>
            
//             <PathText />
//             </div>
//             <View style={styles.column}>
//               <CommandPanel heading="Commands" selected={selected} />
//               <InfoPanel selected={selected} />
//             </View>
//         <div id="configDiv" className="-mt-32 -mb-8 -ml-[50px]">
//           <ConfigPanel heading="Config" className="flex flex-row scale-75" />
//         </div>
//         </div>
//       </HorizontalPanel>
//     </View>
//   )}else{
  return(
    <View style={styles.main}>
      <HorizontalPanel heading="Path">
        <div id="cssGrid" className="grid grid-cols-5 grid-rows-7 gap-4 h-[85vh] w-[85vw]">

          <div id="configDiv" className="col-start-1 col-end-2 row-span-5 max-h-[450px]">
            <ConfigPanel heading="Config"  />
          </div>
          
          <div id="gridDiv" className="col-start-2 col-end-5 row-start-1 row-end-auto">   
            <View id="gridView" style={styles.gridView} className="bg-black w-screen">
              <Grid id="mainGrid">
                <PathFromArray path={path} setSelected={setSelected} />
              </Grid>
              <PathText style={{width: '100%'}}/>
            </View>
          </div>
          
          <div id="commandPanel" className="row-start-1 row-end-1 col-start-5 col-end-auto">
            <CommandPanel heading="Commands" selected={selected} />
          </div>
          
          <div id="infoPanel" className="row-start-2 row-end-4 col-start-4 col-end-auto">
            <InfoPanel selected={selected} />
          </div>

        </div>

      </HorizontalPanel>

    </View>
  )
}
export default MainPanel;

const styles = StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  gridView:{
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  
})
const smallStyles = StyleSheet.create({
  horizontalView: {
    display: 'flex',
    flexDirection: 'row'
  },
  gridDiv: {
    // marginTop: '-140px',
    // marginLeft: '-125px',
    // marginRight: '-67.5px',
    // scale: 0.7
  },
})