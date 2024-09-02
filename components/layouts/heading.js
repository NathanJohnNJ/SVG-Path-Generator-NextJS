'use client';
import { View, StyleSheet } from 'react-native-web';

const Heading = (props) => {
  return(
    <View style={styles.container}>
      <h1 style={styles.heading} className="font-sans underline decoration-wavy decoration-4 underline-offset-4">
        {props.heading}
      </h1>
    </View>
  );
}

export default Heading;

const styles =(props)=> StyleSheet.create({
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 600,
    color: props.color,
    opacity: '0.7'
  }
})