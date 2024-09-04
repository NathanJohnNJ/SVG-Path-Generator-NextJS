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

      console.log(useWindowSize()[0])
  const [width, height] = useWindowSize();
if(width<='770'){
  return(
    <View style={styles.main}>
      <HorizontalPanel heading="Path">
        
        <View id="commandPanel" style={smallStyles.horizontalView}>

        <div style={smallStyles.gridDiv}>
            <Grid id="mainGrid" size={400} mainWidth={450}>
              <PathFromArray path={path} setSelected={setSelected} size={400} />
            </Grid>
            
            <PathText />
            </div>
            <View style={styles.column}>
              <CommandPanel heading="Commands" selected={selected} />
              <InfoPanel selected={selected} />
            </View>
          </View>
        <div id="configDiv" className="-mt-32 -mb-8 -ml-[50px]">
          <ConfigPanel heading="Config" className="flex flex-row scale-75" />
        </div>
      </HorizontalPanel>
    </View>
  )}else{
    return(
      <View style={styles.main}>
        <HorizontalPanel heading="Path">
          <div id="configDiv" className="w-full md:w-min flex  h-full">
            <ConfigPanel heading="Config" className="flex flex-row w-full h-full" />
          </div>
          <View id="gridView" style={styles.gridView} className="bg-black w-screen">
            <Grid id="mainGrid" size={400} mainWidth={450}>
              <PathFromArray path={path} setSelected={setSelected} size={400} />
            </Grid>
            <PathText style={{width: '100%'}}/>
          </View>
          <View style={styles.column}>
            <View id="commandPanel">
            <CommandPanel heading="Commands" selected={selected} />
            </View>
            <InfoPanel selected={selected} />
          </View>
        </HorizontalPanel>
      </View>
    )
  }
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
    marginTop: '-140px',
    marginLeft: '-125px',
    marginRight: '-67.5px',
    scale: 0.7
  },
})