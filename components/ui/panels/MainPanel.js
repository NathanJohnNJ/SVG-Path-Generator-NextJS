'use client';
import { useState, useLayoutEffect } from 'react';
import PathFromArray from "@/components/ui/pathFromArray";
import Grid from '@/components/ui/mainGrid';
import { HorizontalPanel, SmallHorizontalPanel } from './Panels';
import ConfigPanel from './ConfigPanel';
import CommandPanel from './CommandPanel';
import { StyleSheet, View } from 'react-native-web';
import InfoPanel from './InfoPanel';
import PathText from '../PathText';

const MainPanel = (props) => {
  const [selected, setSelected] = useState(null);
  
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
if(width<='770'){
  return(
    <View style={styles.main}>
      <SmallHorizontalPanel heading="Path">
        <div id="cssGrid" className="grid grid-cols-4 grid-flow-rows gap-4">
          <div id="commandDiv" className="col-start-1 col-end-3 row-start-1 row-end-2 flex items-center justify-center mt-12">
            <CommandPanel heading="Commands" selected={selected} />
          </div>
          <div id="infoDiv" className="col-start-3 col-end-5 row-start-1 row-end-3 flex items-center justify-center">
            <InfoPanel selected={selected} />
          </div>
          <div id="gridDiv" style={smallStyles.gridDiv} className="col-start-1 col-end-5 row-start-3 row-end-5 flex items-center justify-center">
            <Grid id="mainGrid">
              <PathFromArray setSelected={setSelected} />
            </Grid>
          </div>
          <div id="textDiv" style={smallStyles.gridDiv} className="col-start-1 col-end-5 row-start-5 row-end-6 flex items-center justify-center">
            <PathText />
          </div>
          
          <div id="configDiv" className="flex items-center justify-center col-start-1 col-end-5 row-start-6 row-end-6 -mt-8">
            <ConfigPanel heading="Config" className="flex flex-row scale-75" />
          </div>
        </div>
      </SmallHorizontalPanel>
    </View>
  )}else{
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
                <PathFromArray setSelected={setSelected} />
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
    alignItems: 'center',
    justifyContent: 'center'
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