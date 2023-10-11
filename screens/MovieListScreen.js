// MovieListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, ImageBackground } from 'react-native';

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
                console.log(response.data.results[0])

                setMovies(response.data.results);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'black', padding: 16 }}>
            {/* make the seach button hovering at bottom right */}

            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ borderRadius: 30, overflow: 'hidden' }}>
                        <TouchableOpacity onPress={() => {
                            console.log("movieId=> ",item.id)
                            navigation.navigate('MovieDetail', { movieId: item.id })}}>
                            <ImageBackground
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }} // Replace with your image URL
                                style={{
                                    flex: 1,
                                    height: 180,
                                    resizeMode: 'cover',
                                    margin: 10,
                                    borderRadius: 30, // Adding border radius
                                }}
                            >
                                <View style={{ flex: 1 }}></View>
                                <View
                                    // onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
                                    style={{
                                        backgroundColor: 'rgba(51, 51, 51, 0.7)', // Semi-transparent background color
                                        borderRadius: 10, // Rounded corners
                                        paddingHorizontal: 16, // Horizontal padding
                                        paddingVertical: 12, // Vertical padding
                                        marginVertical: 8, // Spacing between items
                                        borderWidth: 1, // Add a border
                                        borderColor: '#555', // Border color
                                        flexDirection: 'row', // Horizontal layout for icon and text
                                        alignItems: 'center', // Center items vertically
                                        justifyContent: 'center', // Center items horizontally
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'white', // Text color
                                            fontSize: 16, // Font size
                                            fontWeight: 'bold', // Make the text bold
                                            flex: 1, // Allow text to expand to fill available space
                                            textAlign: 'center', // Center text horizontally
                                        }}
                                        numberOfLines={2} // Limit text to two lines and add ellipsis if too long
                                    >
                                        {item.title}
                                    </Text>
                                </View>

                            </ImageBackground>
                        </TouchableOpacity>
                    </View>



                )}
            />
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 36,
                    right: 16,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background color
                    borderRadius: 8, // Rounded corners
                    paddingVertical: 12, // Vertical padding
                    paddingHorizontal: 24, // Horizontal padding
                    borderWidth: 1, // Add a border
                    borderColor: '#555', // Border color
                    flexDirection: 'row', // Horizontal layout for icon and text
                    alignItems: 'center', // Center items vertically
                    justifyContent: 'center', // Center items horizontally
                }}
                onPress={() => navigation.navigate('MovieSearchScreen')}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Search Movie</Text>
            </TouchableOpacity>
        </View>

    );
};

export default MovieListScreen;
