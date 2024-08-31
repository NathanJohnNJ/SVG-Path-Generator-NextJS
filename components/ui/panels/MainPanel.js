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
        <ConfigPanel heading="Config" fullPath={props.fullPath} />
        <View style={styles.gridView}>
          <Grid id="mainGrid" size={400} mainWidth={450}>
            <PathFromArray path={path} setSelected={setSelected} size={400} />
          </Grid>
          <PathText />
        </View>
        <View style={styles.column}>
          <CommandPanel heading="Commands" />
          <InfoPanel selected={selected} />
        </View>
      </HorizontalPanel>
    </View>
  )
}
export default MainPanel;

const styles = StyleSheet.create({
  panel: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  gridView:{
    flex:1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    display: 'flex',
    flexDirection: 'column'
  }
})