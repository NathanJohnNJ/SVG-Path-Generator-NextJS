'use client';
import { selected, control, end, editCommand } from '@/lib/store';
import { useSnapshot } from 'valtio';
import GridWithDrag from '@/components/ui/gridWithDrag';
import Table from '@/components/ui/Tables';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native-web';
import Title from '@/components/layouts/title';
import Link from 'next/link';

export default function EditCommand() {
  const snap = useSnapshot(selected);
  const controlSnap = useSnapshot(control);
  const endSnap = useSnapshot(end);
  const [hover, setHover] = useState({sub: false, can: false, edit:false, change:false, com:false, dx1: false, dy1: false, dx2: false, dy2: false,  x: false, y:false});


  function hoverFunc(i){
    const newHover = { ...hover, [i]: true}
    setHover(newHover)
  }
  function resetHover(){
    setHover({sub: false, can: false, edit:false, change:false, com:false, dx1: false, dy1: false, x: false, y:false, dx2: false, dy2: false,})
  }

  function addToPath(){
    let newCommand;
    if(selected.type==='c'){
      newCommand = {
        type: selected.type,
        commandId: selected.commandId ,
        startPoint: {
          x: selected.startPoint.x, 
          y: selected.startPoint.y
        },
        controlPoints: [
          {
            d1: { 
              x: firstControl.x,
              y: firstControl.y
            }
          },
          {
            d2: { 
              x: secondControl.x,
              y: secondControl.y
            }
          }
        ],
        endPoint: {
          x: endPoint.x,
          y: endPoint.y
        },
      };
    } else if(selected.type === 'q'){
      newCommand = {
        type: selected.type,
        commandId: selected.commandId ,
        startPoint: {
          x: selected.startPoint.x, 
          y: selected.startPoint.y
        },
        controlPoints: [{
          d1: { 
            x: firstControl.x,
            y: firstControl.y
          }
        }],
        endPoint: {
          x: endPoint.x, 
          y: endPoint.y
        },
      };
    } else if(selected.type === 's'){
      newCommand = {
        type: selected.type,
        commandId: selected.commandId,
        startPoint: {
          x: selected.startPoint.x, 
          y: selected.startPoint.y
        },
        controlPoints: [{
          d2: { 
            x: secondControl.x,
            y: secondControl.y
          }
        }],
        endPoint: {
          x: endPoint.x, 
          y: endPoint.y
        }
      };
    } else if(selected.type === 't'){
      newCommand = {
        type: selected.type,
        commandId: selected.commandId ,
        startPoint: {x: selected.startPoint.x, y: selected.startPoint.y},
        endPoint: {x: endPoint.x, y: endPoint.y},
      };
    } else if(selected.type==="l"){
      newCommand = {
        type: selected.type,
        commandId: selected.commandId ,
        startPoint: {x: selected.startPoint.x, y: selected.startPoint.y},
        endPoint: {x: endPoint.x, y: endPoint.y},
      };
    } else if(selected.type === "h"){
      newCommand = {
        type: selected.type,
        commandId: selected.commandId ,
        startPoint: {x: selected.startPoint.x, y: selected.startPoint.y},
        endPoint: {x: endPoint.x, y: 0},
      };
    } else if(selected.type === "v"){
      newCommand = {
        type: selected.type,
        commandId: selected.commandId ,
        startPoint: {x: selected.startPoint.x, y: selected.startPoint.y},
        endPoint: {x: 0, y: endPoint.y},
      };
    }
    editCommand(selected.commandId, newCommand);
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title title="Edit" />
        <Title title={`Command: ${selected.type}`} />
      </View>
      <View style={styles.row}>
        <GridWithDrag size="350" resetHover={resetHover} hoverFunc={hoverFunc}/>
        {snap.type==='c' && <Table label="Control Points" array={[{title: 'd1', points: {x: snap.firstControl.x, y: snap.firstControl.y}}, {title: 'd2', points: {x: snap.secondControl.x, y: snap.secondControl.y}}]} colour={controlSnap.color} startX={snap.startPoint.x} startY={snap.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
        {snap.type==='q' && <Table label="Control Points" array={[{title: 'd1', points: {x: snap.firstControl.x, y: snap.firstControl.y}}]} colour={controlSnap.color} startX={snap.startPoint.x} startY={snap.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
        {snap.type==='s' && <Table label="Control Points" array={[{title: 'd2', points: {x: snap.secondControl.x, y: snap.secondControl.y}}]} colour={controlSnap.color} startX={snap.startPoint.x} startY={snap.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>}
        <Table label="End Point" array={[{title: null, points: {x: snap.endPoint.x, y: snap.endPoint.y}}]} colour={endSnap.color} startX={snap.startPoint.x} startY={snap.startPoint.y} hoverFunc={hoverFunc} resetHover={resetHover} hover={hover}/>
      </View>
      <View style={styles.subCan}>
        <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Confirm Changes!</Text>
        <Link href="/path/viewPath" onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Link>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  row:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subCan: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: 350
  },
  submitButton: {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width:'fit-content',
    height:25,
    padding:3,
    color:'#4e4e4e',
    backgroundColor: '#6c6c6c',
    textShadow: '-1px 1px 1px #4e4e4e',
    fontSize: 18,
    borderColor: '#4e4e4e',
    borderWidth: 2,
    borderRadius: 6,
    margin: 5,
    textAlign: 'center'
  },
  submitHover: {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width:'fit-content',
    height:25,
    padding:3, 
    color:'#ffffff',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: '#4e4e4e',
    textShadow: '-1px 1px 1px #ffffff',
    fontSize: 18,
    cursor: 'pointer',
    margin:5,
    textAlign: 'center'
  },
  cancelButton: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width:'fit-content',
    height:25,
    padding:5,
    backgroundColor: '#d4d4d4',
    boxShadow: '-1px 1px 1px #333',
    borderRadius: 6,
    margin:5,
    color:'#cc1402',
    textShadow: '-0.6px -0.5px 1px #681402',
    fontSize: 18,
    textAlign: 'center',
  },
  cancelHover: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width:'fit-content',
    height:25,
    padding:5,
    borderRadius: 6,
    boxShadow: '-1px 1px 1px #777',
    backgroundColor: '#d4d4d4',
    cursor: 'pointer',
    margin:5,
    color:'#aa1402',
    textShadow: 'inset -0.6px -0.5px 1px #681402',
    fontSize: 18,
    textAlign: 'center',
    justifySelf:'center'
  }
})