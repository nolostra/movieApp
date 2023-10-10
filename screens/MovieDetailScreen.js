// MovieDetailScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, FlatList, Image,TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

import Video from 'react-native-video';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MovieDetailScreen = ({ route }) => {
    const { movieId } = route.params;
    const [movieDetails, setMovieDetails] = useState({});
    const [movieImages, setMovieImages] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);
    const [trailorDetails, setTrailorDetails] = useState('');
    const webViewRef = useRef(null);
    useEffect(() => {
        // Fetch movie details using the TMdb API
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: 'cb58440dda48ca5af8a15d8597b7b513',
            },
        })
            .then(response => {
                setMovieDetails(response.data);
                // console.log("second screen", response.data)
            })
            .catch(error => {
                console.error(error);
            });
        // Fetch movie Images using the TMdb API
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
            params: {
                api_key: 'cb58440dda48ca5af8a15d8597b7b513',
            },
        })
            .then(response => {
                setMovieImages(response.data.backdrops);
                // console.log("second images screen", response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [movieId]);

    const watchTrailer = () => {
        // Set showTrailer to true to display the video player
        setShowTrailer(!showTrailer);
    };

    const ImageList = ({ images }) => {
        const renderItem = ({ item }) => (
            <Image
                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                style={{
                    width: wp("100%"),
                    height: hp('30%'), // Adjust the height as needed
                    margin: 8,
                }} />
        );
        console.log("--", movieImages)
        return (
            <View style={{
                flex: 1,
            }}>
                <FlatList
                    data={movieImages}
                    keyExtractor={(item) => item.file_path}
                    renderItem={renderItem}
                    horizontal={true}
                    numColumns={1}
                />
            </View>
        );
    };

    const getTrailer = async () => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieDetails.id}/videos`, {
            params: {
                api_key: 'cb58440dda48ca5af8a15d8597b7b513',
            },
        })
            .then(response => {

                if (Array.isArray(response.data.results)) {
                    setTrailorDetails(response.data.results[0].key)
                } else {
                    setTrailorDetails(response.data.results.key)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        // Trigger autoplay when the WebView loads
        if (showTrailer && webViewRef.current) {
            webViewRef.current.injectJavaScript('document.querySelector("video").play();');
        }
    }, [showTrailer]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "black" }}>
            <View style={{ flex: 1, margin: hp('1%') }}>
                {showTrailer ? (
                    <WebView
                        ref={webViewRef}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ uri: `https://www.youtube.com/embed/${trailorDetails}?autoplay=1` }}
                        style={{
                            flex: .7,
                            height: hp('70%'), // 70% of height device screen
                            width: wp('95%')
                        }}
                        allowsFullscreenVideo={true}
                        mediaPlaybackRequiresUserAction={false} // Enable autoplay
                        onError={(error) => console.error(error)}
                    />

                ) : (<ImageList images={movieImages} />)}

                <Text style={{ position: 'absolute', top: hp('34%'), fontSize: 30, fontWeight: 'bold', marginBottom: 10, left: 10, right: 10 }}>
                    {movieDetails.title}
                </Text>


                <Text style={{ fontSize: 16, marginBottom: 10, textAlign: 'center' }}>
                    {movieDetails.overview}
                </Text>

                <TouchableOpacity
                    activeOpacity={0.8} // Adjust the opacity for touch feedback
                    onPress={async () => {
                        await getTrailer();
                        watchTrailer();
                        console.log("details--", movieImages);
                    }}
                    style={{
                        backgroundColor: '#007AFF', // Button background color
                        borderRadius: 8, // Rounded corners
                        paddingVertical: 12, // Vertical padding
                        paddingHorizontal: 24, // Horizontal padding
                        borderWidth: 1, // Add a border
                        borderColor: '#007AFF', // Border color
                        flexDirection: 'row', // Horizontal layout for icon and text
                        alignItems: 'center', // Center items vertically
                        justifyContent: 'center', // Center items horizontally
                    }}
                   // Disable the button while loading
                >
                    
                    <Text
                        style={{
                            color: 'white', // Text color
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}
                    >
                        {showTrailer ? 'Done' : 'Watch Trailer'}
                    </Text>
                </TouchableOpacity>
                {/* {showTrailer && (
                    <Button
                        title="Done"
                        onPress={async () => {

                            watchTrailer()

                        }}
                        color="#007AFF" // Customize the button color

                    />
                )} */}


            </View>
            <View style={{ flex: .6, }}>
                {/* Display the video player if showTrailer is true */}
            </View>
        </View>

    );
};

export default MovieDetailScreen;
