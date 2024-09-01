'use client';
import FieldSet from "./Fieldset";
import { StyleSheet, View } from "react-native-web";
// array=[] colour={} startX={} startY={} label=""
const Table = (props) => {
// Takes array of [{title: '', points: {x: '', y:''}}]
  return(
    <FieldSet label={props.label} labelBgColor={props.colour} fontSize={15} labelColor="white" borderColor={props.colour} width="min-content" height={props.height}>
      <View style={styles.inside}>
      {props.array.map((table, i) => {
        return(
          <table key={i} style={styles(props).table}>
            <tbody>
              {table.title!=null&&
              <tr style={styles(props).tr}> 
                <th style={styles(props).titleTh}>{table.title}</th>
              </tr>
              } 
              <tr style={styles(props).tr}> 
                <th style={styles(props).th}>Relative</th>
                <th style={styles(props).th}>Absolute</th>
              </tr>
              <tr style={styles(props).tr}>
                <td style={styles(props).td} >
                ({table.points.x},{table.points.y})
                </td>
                <td style={styles(props).td} >
                ({Number(table.points.x)+Number(props.startX)},{Number(table.points.y)+Number(props.startY)})
                </td>
              </tr>
             </tbody>
            </table>
          )
        })}
      </View>
    </FieldSet>
  )
};

export default Table;

const styles = (props) => StyleSheet.create({
  inside: {
    display: 'flex',
    flexDirection: 'row'
  },
  table: {
    color: '#fff',
    marginTop: 5
  },
  tr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTh: {
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    width:114,
    height: 25,
    backgroundColor: props.colour,
    marginLeft: '-3px',
    marginRight: '-3px',
  },
  th: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-8px',
    marginLeft: '-3px',
    marginRight: '-3px',
    borderRadius:6,
    fontSize: 11,
    width: 60,
    height: 25,
    backgroundColor: props.colour
  },
  td: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: `0.5px dashed ${props.colour}`,
    marginTop: '-3px',
    borderRadius: 6,
    fontSize: 12,
    color: props.colour,
    width: 57,
    height: 25
  }
})