// Needs: fontSize, labelColor, labelBgColor, borderColor
'use client';
import { View, Text, StyleSheet } from "react-native-web";

const FieldSet = (props) => {
  return (
    <View style={styles(props).container}>
      <View style={styles(props).labelView}>
        <p style={styles(props).label} className="font-sans">{props.label}</p>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles(props).mainTextView}>
          <Text style={styles(props).mainText}>
            {props.children}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default FieldSet;

const styles = (props) => StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: props.borderColor,
    margin: 2,
    marginTop: 20,
    padding: 3,
    width: 'min-content'
  },
  labelView: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 2,
    marginBottom: 15,
    marginTop: '-8px',
    height: 0,
    fontSize: props.fontSize,
  },
  label: {
    borderRadius: 12,
    paddingVertical: 2,
    backgroundColor: props.labelBgColor,
    color: props.labelColor,
    fontSize: props.fontSize,
    padding: 5
  },
  mainTextView: {
    zIndex: 1,
    padding: 4,
    width: 160,
  },
  mainText: {
    fontSize: 11
  }
});
