// MovieListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const MovieListScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch upcoming movies using the TMdb API
        axios.get('https://api.themoviedb.org/3/movie/upcoming', {
            params: {
                api_key: 'cb58440dda48ca5af8a15d8597b7b513',
            },
        })
            .then(response => {
                console.log(response.data.results)
                setMovies(response.data.results);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'black', padding: 16 }}>
  <FlatList
    data={movies}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
        style={{
          backgroundColor: '#111', // Dark gray background color
          borderRadius: 10, // Rounded corners
          padding: 16, // Padding around the item
          marginBottom: 16, // Spacing between items
          borderWidth: 1, // Add a border
          borderColor: '#333', // Border color
        }}
      >
        <Text
          style={{
            color: 'white', // White text color
            fontSize: 18, // Adjust font size as needed
            fontWeight: 'bold', // Make the text bold
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    )}
  />
</View>

    );
};

export default MovieListScreen;
