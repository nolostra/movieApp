import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { } from 'react-native-svg';

export default function Seat({ value, label }) {
  return (
    <View style={{
      flexDirection: 'row', // Arrange items horizontally
      alignItems: 'center',
      margin:15,
      // paddingRight: 60
    }}>
      <View style={styles.seat}>
        <View style={[styles.rectangle1223, { backgroundColor: value }]} />
        <View style={[styles.rectangle1224, { backgroundColor: value }]} />
      </View>
      <Text style={styles.seatLabel}>{label}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  seat: {
    flexShrink: 0,
    height: 20,
    width: 17,
    alignItems: "flex-start",
    rowGap: 0
  },
  rectangle1223: {
    position: "absolute",
    flexShrink: 0,
    top: 0,
    right: 0,
    bottom: 3,
    left: 0,
    // backgroundColor: "rgba(205, 157, 15, 1)",
    borderColor: "rgba(238, 238, 238, 1)",
    borderRadius: 5
  },
  rectangle1224: {
    position: "absolute",
    flexShrink: 0,
    top: 14,
    right: 3,
    bottom: 0,
    left: 3,
    // backgroundColor: "rgba(205, 157, 15, 1)",
    borderColor: "rgba(238, 238, 238, 1)",
    borderRadius: 12
  },
  seatLabel: {
    fontSize: 15, // Adjust the font size as needed
    color: '#8F8F8F', // Set the text color
    textAlign: 'center', // Center-align the text
    marginTop: 0, // Add top margin to separate the label from the seat
    marginLeft: 10,
  },
})