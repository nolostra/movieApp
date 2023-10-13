import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Button } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import MovieTheaterSeats from '../component/theatreseats.component';
import BoxArray2 from '../component/theatreseats.component2';
import BoxArray3 from '../component/theatreseats.component3';
import BoxArray4 from '../component/theatreseats.component4';
const SeatMapping = ({ route, navigation }) => {
  useEffect(() => {

  }, [])

  function formatDate(from) {
    const date = new Date(from);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    return dateFormatter.format(date);
  }
  const MovieHeader = () => {
    return (
      <View style={styles.container2}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}

          >
            <Svg width="42" height="21" viewBox="0 0 18 16" fill="none">
              <Path d="M9.75 16.5L2.25 9L9.75 1.5" stroke="#000000" strokeWidth="2" />
            </Svg>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <View style={styles.centeredTextContainer}>
              <Text style={styles.title}>{route.params.data.original_title}</Text>
              <Text style={styles.movieData}>
                {`In Theatres ${formatDate(route.params.data.release_date)}`}
              </Text>
            </View>
          </View>
        </View>
      </View>

    );
  };
  return (
    <View style={styles.container}>
      <MovieHeader />
      <View style={{ backgroundColor: "F6F6FA", flex: 1 }}>
        <View style={{ flex: 1 }}>

        </View>
        <View style={{ flex: 1, backgroundColor: "red",flexShrink:30}}>
          <MovieTheaterSeats />
          <BoxArray2 />
          <BoxArray2 />
          <BoxArray2 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray4 />
        </View>

      </View>

      <View style={{ flex: .11, justifyContent: 'flex-end', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {
          // navigation.navigate('SeatMapping', { data: movieData })
        }}>
          <View style={{
            width: 340, // Fixed width
            height: 50,  // Fixed height
            backgroundColor: "rgba(97, 195, 242, 1)",
            borderRadius: 10,
            marginBottom: 10, // Add vertical spacing if in portrait mode
            display: 'flex', // Added to ensure proper text alignment
            alignItems: 'center', // Center text horizontally
            justifyContent: 'center', // Center text vertically
          }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Get Tickets</Text>
          </View>
        </TouchableOpacity>
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: .2,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 4,
  },
  centeredTextContainer: {
    alignItems: 'center', // Center-align the text vertically
  },
  titleContainer: {
    flex: 1, // Allows title and movieData to take equal vertical space
    justifyContent: 'center', // Center-align children vertically
    marginLeft: 10, // Adjust this value for spacing between the icon and text
    // backgroundColor:"yellow"
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#202C43',
  },
  movieData: {
    fontSize: 16,
    color: '#61C3F2',
  },
});

export default SeatMapping;
