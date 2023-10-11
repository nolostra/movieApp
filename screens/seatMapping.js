import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const SeatMapping = ({ route, navigation }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  useEffect(()=>{
    console.log("route",route)
  },[])
  const renderSeats = () => {
    const rows = 7; // Number of rows
    const cols =11; // Number of columns

    const seats = [];

    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        const seat = `${row}-${col}`;
        const isSelected = selectedSeats.includes(seat);

        seats.push(
          <TouchableOpacity
            key={seat}
            style={[styles.seat, isSelected ? styles.selectedSeat : null]}
            onPress={() => toggleSeat(seat)}
          >
            <Text style={{ color: isSelected ? 'white' : 'black',  // Text color
    opacity: 1, fontSize:20 }}>{seat}</Text>
          </TouchableOpacity>
        );
      }
    }

    return seats;
  };

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Seat Mapping</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${route.params.imageDetails}` }} // Replace with your background image
        style={styles.backgroundImage}
      >
        <View style={styles.seatMap}>{renderSeats()}</View>
      </ImageBackground>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatMap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  seat: {
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: 'rgba(211, 211, 211, 0.7)', // Seat background with 40% opacity
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#007AFF',
    borderWidth: 1,
  },
 
  header: {
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedSeat: {
    backgroundColor: '#007AFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SeatMapping;
