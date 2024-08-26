'use client';
import { useState } from 'react';
import PathFromArray from "@/components/ui/pathFromArray";
import Grid from '@/components/ui/Grid';
import { HorizontalPanel } from './Panels';
import ConfigPanel from './ConfigPanel';
import CommandPanel from './CommandPanel';
import { StyleSheet, View } from 'react-native-web';
import InfoPanel from './InfoPanel';
import Title from "@/components/layouts/title";

const MainPanel = (props) => {
  const [strokeColor, setStrokeColor] = useState(props.stroke.colour);
  const [strokeWidth, setStrokeWidth] = useState(props.stroke.width);
  const [strokeOpacity, setStrokeOpacity] = useState(props.stroke.opacity);
  const [strokeHighlight, setStrokeHighlight] = useState(props.stroke.highlight);
  const [fillColor, setFillColor] = useState(props.fill.colour);
  const [fillHighlight, setFillHighlight] = useState(props.fill.highlight);
  const [fillOpacity, setFillOpacity] = useState(props.fill.opacity);
  const [controlColor, setControlColor] = useState(props.control.colour);
  const [controlSize, setControlSize] = useState(props.control.size);
  const [controlOpacity, setControlOpacity] = useState(props.control.opacity);
  const [endColor, setEndColor] = useState(props.end.colour);
  const [endSize, setEndSize] = useState(props.end.size);
  const [endOpacity, setEndOpacity] = useState(props.end.opacity);
  const [selected, setSelected] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [stroke, setStroke] = useState(props.stroke);
  const [fill, setFill] = useState(props.fill);
  const [control, setControl] = useState(props.control);
  const [end, setEnd] = useState(props.end);

  return(
    <View style={styles.main}>
      <Title title="Path" />
      <HorizontalPanel heading="Path">
        <ConfigPanel heading="Config" stroke={stroke} setStroke={setStroke} fill={fill} setFill={setFill} control={control} setControl={setControl} end={end} setEnd={setEnd} fullPath={props.fullPath} strokeColor={strokeColor} setStrokeColor={setStrokeColor} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} strokeHighlight={strokeHighlight} setStrokeHighlight={setStrokeHighlight} strokeOpacity={strokeOpacity} setStrokeOpacity={setStrokeOpacity} setFillColor={setFillColor} fillColor={fillColor} fillOpacity={fillOpacity} setFillOpacity={setFillOpacity} fillHighlight={fillHighlight} setFillHighlight={setFillHighlight} controlColor={controlColor} setControlColor={setControlColor} controlSize={controlSize} setControlSize={setControlSize} endColor={endColor} setEndColor={setEndColor} endSize={endSize} setEndSize={setEndSize} endOpacity={endOpacity} setEndOpacity={setEndOpacity} controlOpacity={controlOpacity} setControlOpacity={setControlOpacity} />
        <View id="gridView">
          <Grid id="mainGrid" size={400} mainWidth={450}>
            <PathFromArray path={props.path} fill={fill} stroke={stroke} selected={selected} setSelected={setSelected} showTable={showTable} setShowTable={setShowTable} size={400} strokeColor={strokeColor} strokeWidth={strokeWidth} strokeHighlight={strokeHighlight} strokeOpacity={strokeOpacity} fillColor={fillColor} fillOpacity={fillOpacity} fillHighlight={fillHighlight} />
          </Grid>
        </View>
        <View style={styles.column}>
          <CommandPanel heading="Commands" />
          <InfoPanel selected={selected} control={control} end={end} />
        </View>
      </HorizontalPanel>
    </View>
  )
}
export default MainPanel;

const styles = StyleSheet.create({
  panel: {
    flex:1,
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  }
})