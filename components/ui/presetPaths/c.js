'use client';
import { View, StyleSheet, Pressable } from "react-native-web";
import { Path } from "react-native-svg-web";
import Grid from "../Grid";
import { PresetsHeading, Article } from "../panels/Panels";
import { PresetsRainbowPanel } from '../panels/RainbowPanel';
import { stroke, fill, newActions } from "@/lib/store";
import { useSnapshot } from "valtio";

const CPresets = () => {
    const strokeSnap = useSnapshot(stroke);
    const fillSnap = useSnapshot(fill);

    const first = {
      type:'c',
      commandId: 0,
      startPoint: {x: 20, y: 20},
      firstControl: {x:25, y:50}, 
      secondControl:{x: 75, y:50},
      endPoint: {x: 100, y: 0}
    }
    const second = {
      type:'c',
      commandId: 0,
      startPoint: {x: 0, y: 50},
      firstControl: {x:50, y:50}, 
      secondControl:{x: 100, y:-50},
      endPoint: {x: 125,y: 0},
    }
    const third = {
      type:'c',
      commandId: 0,
      startPoint: {x: 20, y: 20},
      firstControl: {x:25, y:50}, 
      secondControl:{x: 75, y:0},
      endPoint: {x: 100, y: 75},
    }
    const fourth = {
      type:'c',
      commandId: 0,
      startPoint: {x: 70, y: 20},
      firstControl: {x:25, y:50}, 
      secondControl:{x: -25, y:100},
      endPoint: {x: -50, y: 75},
    }
    const presetArray = [first, second, third, fourth];
    
    function getD(command){
      return `M${command.startPoint.x},${command.startPoint.y}c${command.firstControl.x},${command.firstControl.y} ${command.secondControl.x},${command.secondControl.y} ${command.endPoint.x},${command.endPoint.y}`
    }

    function select(command){
    const grid = document.getElementById('newGrid');
    newActions.setStartPoint(command.startPoint.x, command.startPoint.y)
    newActions.setFirstControl(command.firstControl.x, command.firstControl.y);
    newActions.setSecondControl(command.secondControl.x, command.secondControl.y);
    newActions.setEndPoint(command.endPoint.x, command.endPoint.y);
    const svgns = "http://www.w3.org/2000/svg";
    const currentPath = document.createElementNS(svgns, 'path');
    currentPath.setAttributeNS(null, "id", 'path');
    currentPath.setAttributeNS(null, 'stroke', strokeSnap.color);
    currentPath.setAttributeNS(null, 'stroke-width', strokeSnap.width);
    currentPath.setAttributeNS(null, 'stroke-opacity', strokeSnap.opacity);
    currentPath.setAttributeNS(null, 'fill', fillSnap.color);
    currentPath.setAttributeNS(null, 'fill-opacity', fillSnap.opacity);
    currentPath.setAttributeNS(null, 'd', `M${command.startPoint.x},${command.startPoint.y}c${command.firstControl.x},${command.firstControl.y} ${command.secondControl.x},${command.secondControl.y} ${command.endPoint.x},${command.endPoint.y}`);

    const path = document.getElementById('path');
    if(!path){
      grid.appendChild(currentPath);
    }else {
      grid.replaceChild(currentPath, path);
    }
  }
  return(
    <PresetsRainbowPanel style={styles.rainbow}>
        <PresetsHeading>
          Preset Commands
        </PresetsHeading>
      <View id="presetsViewBeforeMap">
      {
        presetArray.map((command, i) => {
          return(
            <Pressable id={i} style={styles.pressable} key={i+20} onPress={()=>select(command)} >
              <Grid size="150" mainWidth="180" id="miniGrid" key={i}>
                <Path d={getD(command)} fill={fillSnap.color} key={i+10} fillOpacity={fillSnap.opacity} stroke={strokeSnap.color} strokeWidth={strokeSnap.width} strokeOpacity={strokeSnap.opacity} />
              </Grid>
            </Pressable>
          )
        })
      }
      </View>
    </PresetsRainbowPanel>
  )
};

export default CPresets;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    },
  pressable:{
    scale: 0.5,
    margin: -35,
    borderRadius: 18,
    borderColor: "#ccf",
    boxShadow: "-2px 2px 8px #9c9c9c",
    width: 'min-content',
    alignSelf: 'center'
  }
});