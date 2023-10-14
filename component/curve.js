// CurvedLine.js
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CurvedLine = () => {
  return (
    <View style={{ paddingBottom: 10,marginTop:-325 }}>
      <Svg
        height="70%" // Set the height to the desired value
        width="100%" // Set the width to 100% to stretch it across the screen
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <Path
          d="M0 100 Q 50 85 100 100"
          fill="transparent"
          stroke="#3498db"
          strokeWidth="0.5"
        />
      </Svg>
    </View>
  );
};


export default CurvedLine;
