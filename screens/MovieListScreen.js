// MovieListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, ImageBackground, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import TopBar from '../component/topBar';

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

    const TopBar = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.leftText}>Watch</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('MovieSearchScreen')
                }}>
                    <Svg
                        height={20}
                        width={40}
                        viewBox="0 0 42 42"
                        style={styles.icon}
                    >
                        {/* <Path
                d="M18 16.02h-.02L22 20l-2 2-4.02-.02A10 10 0 1 1 18 16.02zM12 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z"
                fill="black" // Icon color
              /> */}
                        <Path d="M 21 3 C 11.6211 3 4 10.6211 4 20 C 4 29.3789 11.6211 37 21 37 C 24.7109 37 28.1406 35.8047 30.9375 33.7813 L 44.0938 46.9063 L 46.9063 44.0938 L 33.9063 31.0625 C 36.4609 28.0859 38 24.2227 38 20 C 38 10.6211 30.3789 3 21 3 Z M 21 5 C 29.2969 5 36 11.7031 36 20 C 36 28.2969 29.2969 35 21 35 C 12.7031 35 6 28.2969 6 20 C 6 11.7031 12.7031 5 21 5 Z"
                            fill="black" />
                    </Svg></TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={{ flex: 1, paddingVertical: 16 }}>
            {/* make the seach button hovering at bottom right */}
            <TopBar />
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: '#DBDBDF', flex: 1, paddingHorizontal: 16, paddingTop: 10 }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('MovieDetail', { movieId: item.id })
                        }}>
                            <ImageBackground
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }} // Replace with your image URL
                                style={{
                                    flex: 1,
                                    height: hp("28%"),
                                    resizeMode: 'cover',
                                    margin: 5,
                                    borderRadius: 10,
                                    overflow: 'hidden'// Adding border radius
                                }}
                            >
                                <View style={{ flex: 1 }}></View>
                                <View
                                    style={{
                                        // Rounded corners
                                        // Horizontal padding
                                        // Vertical padding
                                        // Spacing between items
                                        // Add a border
                                        borderColor: '#555', // Border color
                                        flexDirection: 'row', // Horizontal layout for icon and text
                                        alignItems: 'center', // Center items vertically
                                        justifyContent: 'center', // Center items horizontally
                                    }}
                                >
                                    <LinearGradient
                                        colors={['transparent', 'rgba(51, 51, 51, 1)']} // Define your gradient colors
                                        style={{
                                            // Apply the same borderRadius to the gradient
                                            flex: 1,
                                            // Allow the gradient to expand to fill available space
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'white', // Text color
                                                fontSize: 16,
                                                marginVertical: 25, // Font size
                                                fontWeight: 'bold',
                                                marginHorizontal: 23,// Make the text bold
                                                textAlign: 'left', // Center text horizontally
                                            }}
                                            numberOfLines={2} // Limit text to two lines and add ellipsis if too long
                                        >
                                            {item.title}
                                        </Text>
                                    </LinearGradient>
                                </View>

                            </ImageBackground>
                        </TouchableOpacity>
                    </View>



                )}
            />
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: "black",// Background color of the top bar
        padding: 10,

    },
    leftText: {
        fontSize: 20,
        color: "black", // Text color
        fontFamily:'Poppins-Bold'
    },
    icon: {
        // color: "black", // Icon color
    },
});
export default MovieListScreen;
