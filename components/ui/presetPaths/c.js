'use client';
import { View, StyleSheet, Text, Pressable } from "react-native-web";
import { Path } from "react-native-svg-web";
import Grid from "../Grid";
import { PresetsPanel } from "../panels/Panels";

export const CPresets = (props) => {
    function hoverFunc(id){
        const grid = document.getElementById(id)
        grid.style.backgroundColor = "#acd";
        grid.style.borderColor = "#e9b";
        grid.style.boxShadow = "-1px 1px 10px #000";
    }
    function resetHover(id){
        const grid = document.getElementById(id)
        grid.style.backgroundColor = "#c2c2c2";
        grid.style.borderColor = "#ccf";
        grid.style.boxShadow = "-2px 2px 8px #9c9c9c";
    }

    const first = {
        type:'c',
        commandId: 0,
        startPoint: {x: 50, y: 50},
        firstControl: {x:25, y:50}, 
        secondControl:{x: 75, y:50},
        endPoint: {x: 100, y: 0}
    }
    const second = {
        type:'c',
        commandId: 0,
        startPoint: {x: 50, y: 50},
        firstControl: {x:50, y:50}, 
        secondControl:{x: 100, y:-50},
        endPoint: {x: 125,y: 0},
    }
    const third = {
        type:'c',
        commandId: 0,
        startPoint: {x: 50, y: 50},
        firstControl: {x:25, y:50}, 
        secondControl:{x: 75, y:0},
        endPoint: {x: 100, y: 75},
    }
    const fourth = {
        type:'c',
        commandId: 0,
        startPoint: {x: 50, y: 50},
        firstControl: {x:25, y:50}, 
        secondControl:{x: -25, y:100},
        endPoint: {x: -50, y: 75},
    }
    const presetArray = [first, second, third, fourth];
    function select(command){
      const grid = document.getElementById('newGrid');
      const path = document.getElementById('path');
      newActions.setFirstControl(command.firstControl.x, command.firstControl.y);
      newActions.setSecondControl(command.secondControl.x, command.secondControl.y);
      newActions.setEndPoint(command.endPoint.x, command.endPoint.y);
      const svgns = "http://www.w3.org/2000/svg";
      const currentPath = document.createElementNS(svgns, 'path');
      currentPath.setAttributeNS(null, "id", 'path');
      currentPath.setAttributeNS(null, 'stroke', props.stroke);
      currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth);
      currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity);
      currentPath.setAttributeNS(null, 'fill', props.fill);
      currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity);
      currentPath.setAttributeNS(null, 'd', `M50,100c${command.firstControl.x},${command.firstControl.y} ${command.secondControl.x},${command.secondControl.y} ${command.endPoint.x},${command.endPoint.y}`);
      grid.replaceChild(currentPath, path);   
    }
  return(
    <PresetsPanel>
      {
        presetArray.map((command, i) => {
          return(
            <Pressable id={i} style={styles.pressable} key={i+20} onPress={()=>select(command)} onHoverIn={()=>hoverFunc(command.hoverRef)} onHoverOut={()=>resetHover(command.hoverRef)}>
              <Grid size="150" mainWidth="180" id="miniGrid" key={i}>
                <Path d={command.fullAbsCommand} fill={props.fill} key={i+10} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} />
              </Grid>
            </Pressable>
          )
        })
      }
    </PresetsPanel>
  )
};


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textShadow: '-1px 1px 2px gray, 1px 1px 1px gray',
        marginTop: -20
    },
    mainContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c2c2c2',
        borderColor: '#caf',
        borderWidth: 3,
        borderRadius: 18,
        boxShadow: '-2px 2px 8px #9c9c9c',
        padding: 5,
        height: 800,
        marginTop: 10
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      },
    pressable:{
        scale: 0.5,
        margin: -50,
        borderRadius: 18,
        borderColor: "#ccf",
        boxShadow: "-2px 2px 8px #9c9c9c",
      },
  });