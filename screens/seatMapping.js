import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SeatMapping = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const renderSeats = () => {
    const rows = 3; // Number of rows
    const cols = 4; // Number of columns

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
            <Text style={{ color: isSelected ? 'white' : 'black' }}>{seat}</Text>
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
      <View style={styles.seatMap}>{renderSeats()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatMap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  seat: {
    width: 60,
    height: 50,
    margin: 5,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  header: {
    backgroundColor: '#007AFF', // Vibrant blue background color
    padding: 7, // Increased padding for better spacing
    alignItems: 'center',
    borderBottomWidth: 1, // Add a bottom border
    borderColor: '#0058B3', 
    borderRadius:10,// Border color
    margin:10,
    paddingVertical: 9, // Vertical padding
    paddingHorizontal: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 17, // Larger font size
    fontWeight: 'bold',
  },
  selectedSeat: {
    backgroundColor: '#007AFF',
  },
 
});

export default SeatMapping;
