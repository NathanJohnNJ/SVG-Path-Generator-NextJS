'use client';
import { View, StyleSheet } from 'react-native-web';

const Title = (props) => {

  return(
    <View style={styles.container}>
      <h1 style={styles.title} className="text-sky-600 font-sans underline decoration-wavy decoration-4 underline-offset-4">
        {props.title}
      </h1>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 600
  }
})