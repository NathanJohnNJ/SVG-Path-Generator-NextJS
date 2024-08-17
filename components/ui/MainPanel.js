'use client';
import { useState } from 'react';
import PathFromArray from "@/components/ui/pathFromArray";
import Grid from '@/components/ui/Grid';
import { HorizontalPanel } from './HorizontalPanel';
import { ConfigPanel } from './ConfigPanel';
import { StyleSheet, View } from 'react-native-web';

const MainPanel = (props) => {

const [selected, setSelected] = useState(null);
const [showTable, setShowTable] = useState(false);
  return(
    <HorizontalPanel style={styles.panel}>
      <ConfigPanel fill={props.fill} stroke={props.stroke} control={props.control} end={props.end} />
      <View id="gridView">
      <Grid id="mainGrid" size={400} mainWidth={450}>
        <PathFromArray path={props.path} fill={props.fill} stroke={props.stroke} selected={selected} setSelected={setSelected} showTable={showTable} setShowTable={setShowTable} size={400} />
      </Grid>
      </View>
    </HorizontalPanel>
  )
}
export default MainPanel;

const styles = StyleSheet.create({
  panel: {
    display: 'flex',
    flexDirection: 'row'
  }
})