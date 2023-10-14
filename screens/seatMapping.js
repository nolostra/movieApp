import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Button, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import BoxArray5 from '../component/theatreseats.componentmini';
import DateArrayComponent from '../component/DateArrayComponent';
import Curve from '../component/curve';
const { width, height } = Dimensions.get('window');
const SeatMapping = ({ route, navigation }) => {

  const step= useRef()
  useEffect(() => {

  }, [])
  function generateTimeArray() {
    step.current= 0
    const times = [];
    for (let hour = 10; hour <= 13; hour += 2) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return times;
  }
  const timeArray = generateTimeArray();
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
              // navigation.goBack();
              // console.log("pressed")
            }}
             style={{height:20}}
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
  const Seats = () => {
    return (
      <View style={{ marginTop: -200, justifyContent: "center", }}>
        <View style={{ height: "80%", marginRight: -20, marginTop: -110 }}>
          <Svg
            height="210%" // Set the height to 100% of the container
            width="100%"  // Set the width to 100% of the container
            viewBox="0 0 90 100" // Adjust the viewBox to match the content
            preserveAspectRatio="xMidYMid meet"
          >
            <Path
              d="M 10 100 Q 50 80 90 100" // Adjust control point coordinates
              fill="transparent"
              stroke="#3498db"
              strokeWidth="0.5"
            />
          </Svg>
        </View>
        <View style={{ paddingTop: 100, marginRight: -40 }}>
          <BoxArray5 />
          <BoxArray5 />
          <BoxArray5 />
          <BoxArray5 />
          <BoxArray5 />
          <BoxArray5 />
        </View>
      </View>
    )
  }

  const MovieTheatreComponent = () => {
    return (
      <View style={styles.container3}>
        {timeArray.map((time, index) => (
          <View key={index} style={[styles.row, { marginBottom: 30, paddingRight: 10 }]}>
            <View style={styles.rowContent}>
              <Text style={styles.timeText}>{time}</Text>
              <Text style={styles.hallText}>Cinetech + hall 1</Text>
            </View>
            <View style={{ flex: 1, borderRadius: 10, borderWidth: 1, width: 180, paddingRight: 40, borderColor: index == 0 ? "#61C3F2" : "black", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, }} >
              <View style={{ height: 170, }}>
                <View style={{
                  flex: .6


                }}>
                  <Seats />
                </View>
              </View>

            </View>
            <View style={{ flex: 0.5,width:200,marginTop:10 }}>
              {index == 0 ? ( <Text style={{ color: "#8F8F8F" }}>
                From <Text style={{ fontWeight: 'bold', color: "black" }}>50$</Text> or <Text style={{ fontWeight: 'bold', color: "black" }}>2500 bonus</Text>
              </Text>):(<Text style={{ color: "#8F8F8F" }}>
                From <Text style={{ fontWeight: 'bold', color: "black" }}>70$</Text> or <Text style={{ fontWeight: 'bold', color: "black" }}>3000 bonus</Text>
              </Text>)}
    
             
            </View>
          </View>
        ))}
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <MovieHeader />
      
        <View style={{ backgroundColor: "F6F6FA", flex: 1 }}>
        
        <View style={{ flex: .2 }}>
          <DateArrayComponent />
        </View>
        <View style={{ flex: 1, }}>
          <MovieTheatreComponent />
          {/* <MovieTheaterSeats />
          <BoxArray2 />
          <BoxArray2 />
          <BoxArray2 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray3 />
          <BoxArray4 /> */}
        </View>
      </View>
      

    

      <View style={{ flex: .11, justifyContent: 'flex-end', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('SeatMapping2',{data:route.params.data})
          step.current = 1
          console.log("pressed button")
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
  hallText: {
    color: "#8F8F8F",
    paddingTop: 5
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
  container3: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: "yellow",
    // backgroundColor: "blue",
    paddingLeft: 20
  },
  timeText: {
    fontSize: width > 360 ? 20 : 18, // Adjust the font size based on screen width
    marginRight: 10,
    color: '#202C43'
  },
  row: {
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: "grey",
    width: width * 0.3, // Adjust the width as needed
    marginVertical: 10, // Add vertical spacing between row
    marginRight: 50,

    flex: .5,
    height: 250
  },
  yellowContainer: {
    // backgroundColor: "yellow",
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rowContent: { // Takes up remaining horizontal space
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: "green",
  },
  curveAndSeats: {
    flex: 1, // Takes up remaining horizontal space
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: "green",
  },
});

export default SeatMapping;
