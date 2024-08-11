'use client';
import Grid from "@/components/ui/Grid";
import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native-web';
import Svg, { Path } from 'react-native-svg-web';
import { geologicaSharp } from "@/styles/fonts";
import { useState } from 'react';
import Link from "next/link";
import { sql } from '@vercel/postgres';

function hoverFunc(id){
  const element = document.getElementById(id);
  element.style.stroke = "#000";
}
function resetHover(id){
  const element = document.getElementById(id);
  element.style.stroke = "#44a";
}
const GridButton = (props) => {

  async function addToTable(command){
    let insertedCommand;
    if (command.type==="c"){
      insertedCommand = await Promise.all(
        await sql`
        INSERT INTO pathcommands (type, id, startX, startY, dx1, dy1, dx2, dy2, x, y)
        VALUES (${command.type}, ${command.id}, ${command.startX}, ${command.startY}, ${command.dx1}, ${command.dy1}, ${command.dx2}, ${command.dy2}, ${command.x}, ${command.y});
        `
      );
    } else if (command.type==="q"){
      insertedCommand = await Promise.all(
        await sql`
        INSERT INTO pathcommands (type, id, startX, startY, dx1, dy1, x, y)
        VALUES (${command.type}, ${command.id}, ${command.startX}, ${command.startY}, ${command.dx1}, ${command.dy1}, ${command.x}, ${command.y});
        `
      );
    } else if (command.type==="h"){
      insertedCommand = await Promise.all(
        await sql`
        INSERT INTO pathcommands (type, id, startX, startY, x)
        VALUES (${command.type}, ${command.id}, ${command.startX}, ${command.startY}, ${command.x});
        `
      );
    } else if (command.type==="v"){
      insertedCommand = await Promise.all(
        await sql`
        INSERT INTO pathcommands (type, id, startX, startY, y)
        VALUES (${command.type}, ${command.id}, ${command.startX}, ${command.startY}, ${command.y});
        `
      );
    } else {
      insertedCommand = await Promise.all(
        await sql`
        INSERT INTO pathcommands (type, id, startX, startY, x, y)
        VALUES (${command.type}, ${command.id}, ${command.startX}, ${command.startY}, ${command.x}, ${command.y});
        `
      );
    }
    return insertedCommand;
  }
  
  async function add(command){
    try{
      await sql`BEGIN`;
      await addToTable(command);
      await sql`COMMIT`;
      console.log(`${command} added to database sucessfully.`)
    } catch (error) {
      await sql`ROLLBACK`;
      console.log(error)
    }
  }
  return(
    <Pressable style={styles.gridButton} onHoverIn={() => hoverFunc(props.id)} onHoverOut={() => resetHover(props.id)} onPress={()=>add(props.command)}>
        <Text style={styles.gridTitle}>
          {props.command.name}{"\n"}
          {props.command.name2?props.command.name2:<></>}{" "}
          {props.command.name3?props.command.name3:<></>}
        </Text>
      <Link href="/viewPath" style={styles.grid} class="hover:bg-sky-200 rounded-xl">
        <Grid size="150" mainWidth="180" id="miniGrid" >
          <Path id={props.id} d={props.d} fill="none" stroke="#44a" strokeWidth="5"/>
        </Grid>
      </Link>
    </Pressable>
  )
}
export default function NewPath() {
  const [startX, setStartX] = useState(50);
  const [startY, setStartY] = useState(50);

  const cPath = {
    type:'c',
    name: 'Curve',                                                      
    id: 0,
    startX: startX,
    startY: startY,
    dx1: 25,
    dy1:50,
    dx2: 75,
    dy2: -50,
    x: 100,
    y: 0
}

const qPath = {
    type: 'q',
    name: 'Quadratic',
    name2: 'Bézier',
    name3: 'Curve',
    id: 0,
    startX: startX,
    startY: startY,
    dx1: 25,
    dy1: 50,
    x: 50,
    y: 0
}

const lPath = {
    type: 'l',
    name: 'Line',
    id: 0,
    startX: startX,
    startY: startY,
    x: 50,
    y: 50
}

const hPath = {
    type: 'h',
    name: 'Horizontal',
    name2: 'Line',
    id: 0,
    startX: startX,
    startY: startY,
    x: 50,
    y: 0
}

const vPath = {
    type: 'v',
    name: 'Vertical',
    name2: 'Line',
    id: 0,
    startX: startX,
    startY: startY,
    x: 0,
    y: 50
}

const openingArray = [cPath, qPath, lPath, hPath, vPath];

  return (
    <View>
      <h1 style={styles.title} class="underline decoration-wavy" className={geologicaSharp.className}> New Path </h1>
      <View style={styles.main}>
        <Text style={styles.heading} >
          Choose your starting point...
        </Text>
        <View style={styles.row}>
          <Text style={{marginRight: '5px', color: 'white'}}>x:</Text>
          <TextInput onChangeText={setStartX} value={startX} style={{width: '35px', borderColor:'#d1d1d1', borderStyle: 'solid', borderWidth: '2px', color:'#000', marginRight: '5px', color: 'white'}} />
          <Text style={{marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>y:</Text>
          <TextInput onChangeText={setStartY} value={startY} style={{width: '35px', borderColor:'#d1d1d1', borderStyle: 'solid', borderWidth: '2px', color:'white'}}  />
        </View>
        <Text style={styles.heading}>
          Choose your starting path...
        </Text>
        <View style={styles.row}>
          {
            openingArray.map((command, i) => {
              const ID = `grid${command.type}`
              let d;
              if(command.type==="c"){
                d = `M50,50${command.type}${command.dx1},${command.dy1} ${command.dx2},${command.dy2} ${command.x},${command.y}`;
              } else if(command.type==="q"){
                d = `M50,50${command.type}${command.dx1},${command.dy1} ${command.x},${command.y}`;
              } else if(command.type==="l" || command.type==="v" || command.type==="h"){
                d = `M50,50${command.type}${command.x},${command.y}`;
              }
              return(
                <GridButton command={command} id={ID} d={d} key={i}/>
              )
            })
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    flex:1
  },
  heading: {
    fontSize: 20,
    marginTop: 5,
    display: 'flex',
    alignSelf: 'center', 
    justifySelf: 'center',
    marginBottom: 5,
    color: 'white'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridButton: {
    width: 150,
    height:150,
    backgroundColor: '#def',
    borderColor: '#ccf',
    borderWidth: 3,
    borderRadius: 18,
    boxShadow: '-2px 2px 8px #9c9c9c',
    marginHorizontal: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0
  },
  grid:{
    scale: 0.5,
  },
  gridWithTitle:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  gridTitle:{
    fontSize: 15,
    fontWeight: 450,
    textAlign: 'center',
    color: 'black',
    marginTop: 50,
    marginBottom: -50
  },
})
