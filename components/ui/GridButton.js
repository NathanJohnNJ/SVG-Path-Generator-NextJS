'use client';
import { View, Text, StyleSheet } from "react-native-web";
import Link from "next/link";
import Grid from "./Grid";
import { Path } from 'react-native-svg-web';
import { addToPath, resetPath, stroke, setStartX, setStartY } from "@/lib/store";

const GridButton = (props) => {
  function hoverFunc(id){
    const i = document.getElementById(id);
    i.style.stroke = stroke.highlight;
    i.style.strokeWidth = stroke.width*2;
  }
  function resetHover(id){
    const i = document.getElementById(id);
    i.style.stroke = stroke.color;
    i.style.strokeWidth = stroke.width;
  }
  function add(command){
    resetPath();
    setStartX(command.startPoint.x);
    setStartY(command.startPoint.y);
    addToPath({ 
      commandId: 0,
      type: 'm',
      startPoint: command.startPoint,
      endPoint: {
        x: 0,
        y: 0
      }
    })
    addToPath(command);
    const pathArray = [
      { 
        commandId: 0,
        type: 'm',
        startPoint: command.startPoint,
        endPoint: {
          x: 0,
          y: 0
        }
      },
      command
    ]
    savePath(command.startPoint.x, command.startPoint.y, pathArray);
  }

  const savePath = (startX, startY, pathArray) => {
    const toSave = {
      startPoint: {
        x: startX,
        y: startY
      },
      commands: pathArray
    };
    localStorage.setItem('path', JSON.stringify(toSave))
  }
  return(
    <View style={styles.gridButton} className="group" onHoverIn={() => hoverFunc(props.id)} onHoverOut={() => resetHover(props.id)} onClick={()=>add(props.command)}>
      <View style={styles.titleSection}>
        <Text style={styles.gridTitle} className="text-sky-900">
          {props.command.name}{"\n"}
          {props.command.name2?props.command.name2:<></>}{" "}
          {props.command.name3?props.command.name3:<></>}
        </Text>
      </View>
      <Link href="/path/viewPath" style={styles.grid} className="group-hover:bg-sky-200 rounded-xl" aria-label="View Path">
        <div className="group-hover:scale-110">
          <Grid size="150" mainWidth="180" id="miniGrid" className="group-hover:scale-110" >
            <Path id={props.id} d={props.d} className="group-hover:scale-110" fill="none" stroke={stroke.color} strokeWidth={stroke.width}/>
          </Grid>
        </div>
      </Link>
    </View>
  )
};

export default GridButton;

const styles = StyleSheet.create({
  gridButton: {
    width: 150,
    height:150,
    backgroundColor: '#def',
    borderColor: '#ccf',
    borderWidth: 3,
    borderRadius: 18,
    boxShadow: '-2px 2px 8px #9c9c9c',
    marginHorizontal: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: -50,
    marginTop: 60
  },
  gridTitle:{
    fontSize: 15,
    fontWeight: 450,
    textAlign: 'center',
    color: '#00006a',
    marginBottom: 5
  },
  grid:{
    scale: 0.5,
  }
})