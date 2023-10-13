import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const TinyBox = ({ color, index }) => (
  <View style={[styles.box, { backgroundColor: index === 5 || index === 13 ? 'white' : "#564CA3" }]} key={index}></View>
);

const boxCount = 20;
const boxSize = 12; // Adjust the size of the boxes as needed

const getCurrentTimestampInSeconds = () => Math.floor(Date.now() / 1000);

const getRandomColor = (seed) => {
  const colors = ['#A6A6A6', '#61C3F2'];
  const randomIndex = seed % colors.length;
  return colors[randomIndex];
};

const BoxArray4 = () => {
  const [seed, setSeed] = useState(getCurrentTimestampInSeconds());
  const [tinyBoxesData, setTinyBoxesData] = useState([]);

  useEffect(() => {
    const newData = Array.from({ length: boxCount }, (_, index) => ({
      id: index + 2,
      color: getRandomColor(2 + index),
      index: index,
    }));
    setTinyBoxesData(newData);

    // Update the seed every second
    // const interval = setInterval(() => {
    //   setSeed(getCurrentTimestampInSeconds());
    // }, 100);

    // return () => {
    //   clearInterval(interval);
    // };
  }, [seed]);

  return (
    <View style={styles.container}>
      {tinyBoxesData.map((box) => (
        <TinyBox key={box.id} color={box.color} index={box.index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    margin: 2,
    borderColor: 'gray',
    borderRadius: 10,
  },
  box: {
    width: boxSize,
    height: boxSize,
    margin: 1,
    borderBottomLeftRadius: 10, // Adjust the border radius as needed
    borderBottomRightRadius: 10,
  },
});

export default BoxArray4;
