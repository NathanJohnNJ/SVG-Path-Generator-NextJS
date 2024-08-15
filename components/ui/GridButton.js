'use client';
import { View, Text, StyleSheet } from "react-native-web";
import Link from "next/link";
import Grid from "./Grid";
import { Path } from 'react-native-svg-web';
import { addToPath, deletePath } from "@/lib/mongodb/path/mongodb";


const GridButton = (props) => {
  const stroke = props.config.stroke[0].parameters;
  const fill = props.config.fill[0].parameters;
  const control = props.config.control[0].parameters;
  const end = props.config.end[0].parameters;
  
  function hoverFunc(id){
    const i = document.getElementById(id)
    i.style.stroke = stroke.highlight
    i.style.strokeWidth = stroke.width*2
    i.style.fill = fill.highlight
  }
  function resetHover(id){
    const i = document.getElementById(id)
    i.style.stroke = stroke.colour
    i.style.strokeWidth = stroke.width
    i.style.fill = fill.colour
  }
  function add(command){
    console.log('starting add function')
    deletePath()
    addToPath(command)
    console.log(`${command.type} command added to database sucessfully.`)
  }

  return(
    <View style={styles.gridButton} onHoverIn={() => hoverFunc(props.id)} onHoverOut={() => resetHover(props.id)} onClick={()=>add(props.command)}>
      <View style={styles.titleSection}>
        <Text style={styles.gridTitle} className="text-sky-900">
          {props.command.name}{"\n"}
          {props.command.name2?props.command.name2:<></>}{" "}
          {props.command.name3?props.command.name3:<></>}
        </Text>
      </View>
      <Link href="/viewPath" style={styles.grid} className="hover:bg-sky-200 rounded-xl">
        <Grid size="150" mainWidth="180" id="miniGrid" >
          <Path id={props.id} d={props.d} fill={fill.colour} fillOpacity={fill.opacity} stroke={stroke.colour} strokeWidth={stroke.width}/>
        </Grid>
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
    paddingBottom: 0
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
  },
  grid:{
    scale: 0.5,
  }
})