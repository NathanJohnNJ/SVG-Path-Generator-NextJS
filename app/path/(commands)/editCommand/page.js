'use client';
import { selected, control, end, editCommand } from '@/lib/store';
import { useSnapshot } from 'valtio';
import EditGridWithDrag from '@/components/ui/editGridWithDrag';
import Table from '@/components/ui/Tables';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native-web';
import Title from '@/components/layouts/title';
import Heading from '@/components/layouts/heading';
import Link from 'next/link';

export default function EditCommand() {
  const snap = useSnapshot(selected);
  const controlSnap = useSnapshot(control);
  const endSnap = useSnapshot(end);
  const [hover, setHover] = useState({sub: false, can: false});


  function hoverFunc(i){
    const newHover = { ...hover, [i]: true}
    setHover(newHover)
  }
  function resetHover(){
    setHover({sub: false, can: false})
  }

  function addToPath(){
    let newCommand;
    if(snap.command.type==='c'){
      newCommand = {
        type: snap.command.type,
        commandId: snap.command.commandId ,
        startPoint: {
          x: snap.command.startPoint.x, 
          y: snap.command.startPoint.y
        },
        controlPoints: [
          {
            d1: { 
              x: snap.command.firstControl.x,
              y: snap.command.firstControl.y
            }
          },
          {
            d2: { 
              x: snap.command.secondControl.x,
              y: snap.command.secondControl.y
            }
          }
        ],
        endPoint: {
          x: snap.command.endPoint.x,
          y: snap.command.endPoint.y
        },
      };
    } else if(snap.command.type === 'q'){
      newCommand = {
        type: snap.command.type,
        commandId: snap.command.commandId ,
        startPoint: {
          x: snap.command.startPoint.x, 
          y: snap.command.startPoint.y
        },
        controlPoints: [{
          d1: { 
            x: snap.command.firstControl.x,
            y: snap.command.firstControl.y
          }
        }],
        endPoint: {
          x: snap.command.endPoint.x, 
          y: snap.command.endPoint.y
        },
      };
    } else if(snap.command.type === 's'){
      newCommand = {
        type: snap.command.type,
        commandId: snap.command.commandId,
        startPoint: {
          x: snap.command.startPoint.x, 
          y: snap.command.startPoint.y
        },
        controlPoints: [{
          d2: { 
            x: snap.command.secondControl.x,
            y: snap.command.secondControl.y
          }
        }],
        endPoint: {
          x: snap.command.endPoint.x, 
          y: snap.command.endPoint.y
        }
      };
    } else if(snap.command.type === 't'){
      newCommand = {
        type: snap.command.type,
        commandId: snap.command.commandId ,
        startPoint: {x: snap.command.startPoint.x, y: snap.command.startPoint.y},
        endPoint: {x: snap.command.endPoint.x, y: snap.command.endPoint.y},
      };
    } else if(snap.command.type==="l"){
      newCommand = {
        type: snap.command.type,
        commandId: snap.command.commandId ,
        startPoint: {x: snap.command.startPoint.x, y: snap.command.startPoint.y},
        endPoint: {x: snap.command.endPoint.x, y: snap.command.endPoint.y},
      };
    } else if(snap.command.type === "h"){
      newCommand = {
        type: snap.command.type,
        commandId: snap.command.commandId ,
        startPoint: {x: snap.command.startPoint.x, y: snap.command.startPoint.y},
        endPoint: {x: snap.command.endPoint.x, y: 0},
      };
    } else if(snap.command.type === "v"){
      newCommand = {
        type: snap.command.type,
        commandId: snap.command.commandId ,
        startPoint: {x: snap.command.startPoint.x, y: snap.command.startPoint.y},
        endPoint: {x: 0, y: snap.command.endPoint.y},
      };
    }
    editCommand(snap.command.commandId, newCommand);
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title title="Edit" />
        <Heading heading={`Command: ${snap.command.type}`} color="rgba()" />
      </View>
      <View style={styles.row}>
        <EditGridWithDrag size="350" type="edit" resetHover={resetHover} hoverFunc={hoverFunc}/>
        {snap.command.type==='c' && <Table label="Control Points" array={[{title: 'd1', points: {x: snap.command.firstControl.x, y: snap.command.firstControl.y}}, {title: 'd2', points: {x: snap.command.secondControl.x, y: snap.command.secondControl.y}}]} colour={controlSnap.color} startX={snap.command.startPoint.x} startY={snap.command.startPoint.y} />}
        {snap.command.type==='q' && <Table label="Control Points" array={[{title: 'd1', points: {x: snap.command.firstControl.x, y: snap.command.firstControl.y}}]} colour={controlSnap.color} startX={snap.command.startPoint.x} startY={snap.command.startPoint.y} />}
        {snap.command.type==='s' && <Table label="Control Points" array={[{title: 'd2', points: {x: snap.command.secondControl.x, y: snap.command.secondControl.y}}]} colour={controlSnap.color} startX={snap.command.startPoint.x} startY={snap.command.startPoint.y} />}
        <Table label="End Point" array={[{title: null, points: {x: snap.command.endPoint.x, y: snap.command.endPoint.y}}]} colour={endSnap.color} startX={snap.command.startPoint.x} startY={snap.command.startPoint.y} />
      </View>
      <View style={styles.subCan}>
        <Link href="/path/viewPath" onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Confirm Changes!</Link>
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