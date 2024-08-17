'use client';
import { View, StyleSheet } from 'react-native-web';

const Container = ({children}, props) => {

  return(
    <View style={styles.container}>
      {children}
    </View>
  )
};

export default Container;

const styles = StyleSheet({
  container: {
    width: '90%',
    height: '90%'
  }
})