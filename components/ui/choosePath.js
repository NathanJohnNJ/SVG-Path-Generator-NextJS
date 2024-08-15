'use client';
import {Text, View, StyleSheet, TextInput } from 'react-native-web';
import { useState } from 'react';
import GridButton from './GridButton';
import Link from 'next/link';

export default function ChoosePath(props) {
  const [startX, setStartX] = useState(50);
  const [startY, setStartY] = useState(50);

  const cPath = {
    type:'c',
    name: 'Curve',                                                      
    commandId: 0,
    startPoint: { 
      x: startX,
      y: startY
    },
    controlPoints: [
      {
        d1: { 
          x: 25,
          y: 50
        }
      },
      {
        d2: { 
          x: 75,
          y: -50
        }
      }
    ],
     endPoint: { 
      x: 100,
      y: 0
    }
}

const qPath = {
    type: 'q',
    name: 'Quadratic',
    name2: 'Bézier',
    name3: 'Curve',
    commandId: 0,
    startPoint: { 
      x: startX,
      y: startY
    },
    controlPoints: [
      {
        d1: { 
          x: 25,
          y: 50
        }
      }
    ],
    endPoint: { 
      x: 50,
      y: 0
    }
}

const lPath = {
    type: 'l',
    name: 'Line',
    commandId: 0,
    startPoint: { 
      x: startX,
      y: startY
    },
    endPoint: { 
      x: 50,
      y: 50
    }
}

const hPath = {
    type: 'h',
    name: 'Horizontal',
    name2: 'Line',
    commandId: 0,
    startPoint: { 
      x: startX,
      y: startY
    },
    endPoint: { 
      x: 50,
      y: 0
    }
}

const vPath = {
    type: 'v',
    name: 'Vertical',
    name2: 'Line',
    commandId: 0,
    startPoint: { 
      x: startX,
      y: startY
    },
    endPoint: { 
      x: 0,
      y: 50
    }
}

const curves = [cPath, qPath];
const lines = [hPath, lPath, vPath];

  return (
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
      <Text style={styles.subHeading}>
        (This is just to get you started and can be edited later)
      </Text>
      <View style={styles.row}>
        {
          curves.map((command, i) => {
            const gridID = `grid${command.type}`;
            let d;
            if(command.type==="c"){
              d = `M${startX},${startY}${command.type}${command.controlPoints[0].d1.x},${command.controlPoints[0].d1.y} ${command.controlPoints[1].d2.x},${command.controlPoints[1].d2.y} ${command.endPoint.x},${command.endPoint.y}`;
            } else if(command.type==="q"){
              d = `M${startX},${startY}${command.type}${command.controlPoints[0].d1.x},${command.controlPoints[0].d1.y} ${command.endPoint.x},${command.endPoint.y}`;
            }   else {
              d = `M${startX},${startY}${command.type}${command.endPoint.x},${command.endPoint.y}`;
            }
            return(
              <Link
              href="/viewPath">
                <GridButton command={command} id={gridID} d={d} key={i} config={props.config}/>
              </Link>
            )
          })}
          </View>
          <View style={styles.row}>
          {lines.map((command, i) => {
            const gridID = `grid${command.type}`
            let d;
            if(command.type==="h"){
              d = `M${startX},${startY}${command.type}${command.endPoint.x}`;
            } else if(command.type==="v"){
              d = `M${startX},${startY}${command.type}${command.endPoint.y}`;
            } else {
              d = `M${startX},${startY}${command.type}${command.endPoint.x},${command.endPoint.y}`;
            }
            return(
              <Link
              href="/viewPath">
                <GridButton command={command} id={gridID} d={d} key={i} config={props.config}/>
              </Link>
            )
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    textDecorationLine: 'underline'
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
    marginTop: 10,
    marginBottom: 10
  }
})
