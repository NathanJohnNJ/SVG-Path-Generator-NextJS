'use client';
import { useState } from 'react';
import PathFromArray from "@/components/ui/pathFromArray";
import Grid from '@/components/ui/Grid';
import { HorizontalPanel } from './Panels';
import ConfigPanel from './ConfigPanel';
import CommandPanel from './CommandPanel';
import { StyleSheet, View } from 'react-native-web';
import InfoPanel from './InfoPanel';
import PathText from '../PathText';
import { path } from '@/lib/store';

const MainPanel = (props) => {
  const [selected, setSelected] = useState(null);

  return(
    <View style={styles.main}>
      <HorizontalPanel heading="Path">
        <div className="w-full md:w-min">
          <ConfigPanel heading="Config" className="flex flex-row w-full" />
        </div>
        <View id="gridView" style={styles.gridView} className="bg-black w-screen">
          <Grid id="mainGrid" size={400} mainWidth={450}>
            <PathFromArray path={path} setSelected={setSelected} size={400} />
          </Grid>
          <PathText />
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
export default MainPanel;

const styles = StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  gridView:{
    // flex:1,
    marginLeft: 50,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})