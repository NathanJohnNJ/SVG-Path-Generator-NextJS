'use client';
import { Path } from 'react-native-svg-web';

const FullPath = (props) => {

  return(
      <Path d={props.fullPath} id="mainPath" stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeWidth={props.strokeWidth} />
  )
};

export default FullPath;