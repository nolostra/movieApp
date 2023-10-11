// MovieDetailScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView, } from 'react-native';
import { WebView } from 'react-native-webview';
// import backgroundImage2 from './Images/background.jpg'
import Video from 'react-native-video';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SeatMapping from './SeatMapping';

const MovieDetailScreen = ({ route, navigation }) => {
    const { movieId } = route.params;
    const backgroundImage = useRef()
    const [dataFetched, setDataFetched] = useState(false)
    const [movieDetails, setMovieDetails] = useState({});
    const [movieImages, setMovieImages] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);
    const posterPath = useRef()
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
                posterPath.current = response.data.poster_path
                console.log("second screen", response.data.poster_path)
            })
            .catch(error => {
                // console.error(error);
            });
        // Fetch movie Images using the TMdb API
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
            params: {
                api_key: 'cb58440dda48ca5af8a15d8597b7b513',
            },
        })
            .then(response => {
                setMovieImages(response.data.backdrops);
                console.log("second images screen", response.data.backdrops)
                backgroundImage.current = response.data.backdrops[0].file_path
                
                setDataFetched(true)
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
                    width: wp("97%"),
                    height: hp('30%'), // Adjust the height as needed
                    margin: 8,
                    borderRadius: 10
                }} />
        );
        // console.log("--", movieImages)
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


    const injectJavaScript = `
    var iframe = document.querySelector('iframe');
    var player = new YT.Player(iframe);
    
    player.addEventListener('onStateChange', function(event) {
        if (event.data === YT.PlayerState.ENDED) {
            window.ReactNativeWebView.postMessage('videoEnded');
        }
    });
`;

    const onMessage = event => {
        if (event.nativeEvent.data === 'videoEnded') {
            // Do something when the video ends
            console.log('Video has ended');
        }
    };
    return (
        // <ScrollView >
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${backgroundImage.current}` }} // Replace with the path to your background image
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%' }}>
                    <View style={{ flex: 1, margin: hp('1%') }}>

                        {showTrailer ? (
                            <WebView
                                ref={webViewRef}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: `https://www.youtube.com/embed/${trailorDetails}?autoplay=1` }}
                                style={{
                                    flex: .85,
                                    height: hp('60%'), // 70% of height device screen
                                    width: wp('97%'),
                                    borderRadius: 10
                                }}
                                allowsFullscreenVideo={true}
                                mediaPlaybackRequiresUserAction={false} // Enable autoplay
                                onError={(error) => console.error(error)}
                                injectedJavaScript={injectJavaScript}
                                onMessage={onMessage}
                            />

                        ) : (<ImageList images={movieImages} />)}

                        
                        {movieDetails.title ? (
                            <Text style={{ top: hp('38%'), fontSize: movieDetails.title.length > 25 ? 18 : 24, fontWeight: '800', marginBottom: 10, left: 10, right: 10, position: 'absolute' }}>
                                {movieDetails.title}
                            </Text>
                        ) : null}



                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            {movieDetails.overview ? (
                                movieDetails.overview.length > 300 ? (
                                    <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                        {`${movieDetails.overview.substring(0, 300)}...`}
                                    </Text>
                                ) : (
                                    <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                        {movieDetails.overview}
                                    </Text>
                                )
                            ) : (
                                <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                    No overview available.
                                </Text>
                            )}
                        </View>



                        <TouchableOpacity
                            activeOpacity={0.5} // Adjust the opacity for touch feedback
                            onPress={async () => {
                                await getTrailer();
                                watchTrailer();
                                // console.log("details--", movieImages);
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
                    <View style={{ flex: .4, width: '96%' }}>
                        <View style={{ flex: 1, }}>


                            {/* Display the video player if showTrailer is true */}
                            <TouchableOpacity
                                activeOpacity={0.5} // Adjust the opacity for touch feedback
                                onPress={() => navigation.navigate('SeatMapping', { imageDetails: posterPath.current })}
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
                                    {'Book Tickets'}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
        // </ScrollView>


    );
};

export default MovieDetailScreen;
