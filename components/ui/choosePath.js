'use client';
import {Text, View, StyleSheet, TextInput } from 'react-native-web';
import GridButton from './GridButton';
import { path, setStartX, setStartY, stroke, fill, control, end } from "@/lib/store";
import { useSnapshot } from 'valtio';

export default function ChoosePath() {
  const startX = useSnapshot(path).startPoint.x;
  const startY = useSnapshot(path).startPoint.y;
  const strokeSnap = useSnapshot(stroke);
  const fillSnap = useSnapshot(fill);
  const controlSnap = useSnapshot(control);
  const endSnap = useSnapshot(end);

  const cPath = {
    type:'c',
    name: 'Curve',
    commandId: 1,
    startPoint: { 
      x: startX,
      y: startY
    },
    firstControl: { 
      x: 25,
      y: 50
    },
    secondControl: { 
      x: 75,
      y: -50
    },
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
    commandId: 1,
    startPoint: { 
      x: startX,
      y: startY
    },
    firstControl: { 
      x: 25,
      y: 50
    },
    endPoint: { 
      x: 50,
      y: 0
    }
  }

  const lPath = {
    type: 'l',
    name: 'Line',
    commandId: 1,
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
    commandId: 1,
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
    commandId: 1,
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
      <View style={styles.row} >
        <Text style={{marginRight: '5px', color: 'grey'}}>x:</Text>
        <TextInput onChangeText={(e)=>setStartX(e)} value={path.startPoint.x} style={{width: '35px', borderColor:'#d1d1d1', borderStyle: 'solid', borderWidth: '2px', marginRight: '5px', color: 'grey'}} className="text-grey"/>
        <Text style={{marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey'}}>y:</Text>
        <TextInput onChangeText={setStartY} value={path.startPoint.y} style={{width: '35px', borderColor:'#d1d1d1', borderStyle: 'solid', borderWidth: '2px', color:'grey'}}  />
      </View>
      <Text style={styles.heading} >
        Choose your starting path...
      </Text>
      <Text style={styles.heading} >
        (This is just to get you started and can be edited later)
      </Text>
      <View style={styles.row}>
        {
          curves.map((command, i) => {
            const gridID = `grid${command.type}`;
            let d;
            if(command.type==="c"){
              d = `M${startX},${startY}${command.type}${command.firstControl.x},${command.firstControl.y} ${command.secondControl.x},${command.secondControl.y} ${command.endPoint.x},${command.endPoint.y}`;
            } else if(command.type==="q"){
              d = `M${startX},${startY}${command.type}${command.firstControl.x},${command.firstControl.y} ${command.endPoint.x},${command.endPoint.y}`;
            }   else {
              d = `M${startX},${startY}${command.type}${command.endPoint.x},${command.endPoint.y}`; 
            }
            return(
              <GridButton command={command} id={gridID} d={d} key={i} stroke={strokeSnap} fill={fillSnap} control={controlSnap} end={endSnap} />
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
              <GridButton command={command} id={gridID} d={d} key={i} stroke={strokeSnap} fill={fillSnap} control={controlSnap} end={endSnap}/>
            )
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
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
    color: 'dimgrey'
  },
  row: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  }
})
