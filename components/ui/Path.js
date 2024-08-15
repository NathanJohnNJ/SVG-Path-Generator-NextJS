'use client';
import { Path } from 'react-native-svg-web';

const FullPath = (props) => {

  return(
      <Path d={props.fullPath} id="mainPath" stroke="red" fill="none" strokeWidth={5} />
  )
};

export default FullPath;