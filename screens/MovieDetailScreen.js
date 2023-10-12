// MovieDetailScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
// import backgroundImage2 from './Images/background.jpg'
import Video from 'react-native-video';
import axios from 'axios';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

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
    const [movieData, setMovieData] = useState()
    const [isPortrait, setIsPortrait] = useState(true);

    useEffect(() => {
        const updateLayout = () => {
            const { width, height } = Dimensions.get('window');
            setIsPortrait(height > width);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    }, []);
    const TopBar = () => {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('MovieSearchScreen');
                }}>
                    <Svg width="36" height="18" viewBox="0 0 11 18" fill="none">
                        <Path d="M9.75 16.5L2.25 9L9.75 1.5" stroke="#FFFFFF" strokeWidth="2" />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.leftText}>Watch</Text>
            </View>
        );
    };
    useEffect(() => {
        // Fetch movie details using the TMdb API
        console.log(movieId)
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: 'cb58440dda48ca5af8a15d8597b7b513',
            },
        })
            .then(response => {
                setMovieDetails(response.data);
                posterPath.current = response.data.poster_path
                setMovieData(response.data)
                // console.log("second screen", response.data)

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
                // console.log("second images screen", response.data)
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

    function formatDate(from) {
        const date = new Date(from);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateFormatter = new Intl.DateTimeFormat('en-US', options);
        return dateFormatter.format(date);
    }
    return (
        // <ScrollView >
        <View style={isPortrait ? styles.containerPortrait : styles.containerLandscape}>

            <View style={isPortrait ? styles.child1Portrait : styles.child1Landscape}>
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/w500${backgroundImage.current}` }} // Replace with the path to your background image
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
                        <TopBar />
                    </View>
                    <View style={{ flex: 1, width: "100%", }}>
                        <LinearGradient
                            colors={['transparent', 'rgba(51, 51, 51, .5)']} // Define your gradient colors
                            style={{
                                flex: 1,
                                // Apply the gradient to the full width
                            }}
                        >
                            {movieData && (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#FFFFFF", fontSize: 20, marginBottom: 20 }}>
                                        In Theatres {formatDate(movieData.release_date)}
                                    </Text>
                                    <View style={{
                                        flexDirection: !isPortrait ? 'row' : 'column',
                                        alignItems: 'center', // Center horizontally
                                    }}>
                                        <TouchableOpacity onPress={() => { }}>
                                            <View style={{
                                                width: 200, // Fixed width
                                                height: 50,  // Fixed height
                                                backgroundColor: "rgba(97, 195, 242, 1)",
                                                borderRadius: 10,
                                                marginBottom: !isPortrait ? 0 : 10, // Add vertical spacing if in portrait mode
                                                marginRight: isPortrait ? 0 : 10,
                                                display: 'flex', // Added to ensure proper text alignment
                                                alignItems: 'center', // Center text vertically
                                                justifyContent: 'center', // Center text horizontally
                                            }}>
                                                <Text style={{ color: 'white', fontSize: 20 }}>Get Tickets</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { }}>
                                            <View style={{
                                                width: 200, // Fixed width
                                                height: 50,  // Fixed height
                                                backgroundColor: 'transparent', // Transparent background
                                                borderColor: 'rgba(97, 195, 242, 1)', // Blue border color
                                                borderWidth: 2, // Border width
                                                borderRadius: 10,
                                                marginTop: !isPortrait ? 0 : 10, // Add vertical spacing if in portrait mode
                                                marginLeft: isPortrait ? 0 : 10,
                                                display: 'flex', // Added to ensure proper text alignment
                                                alignItems: 'center', // Center text vertically
                                                justifyContent: 'center', // Center text horizontally
                                                flexDirection:'row'
                                            }}>
                                                <Svg width="36" height="18" viewBox="0 0 11 18" fill="#FFFFFF">
                                                    <Path d="M9.75 16.5L2.25 9L9.75 1.5" stroke="#FFFFFF" strokeWidth="2" />
                                                </Svg>
                                                <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Watch Trailer</Text>
                                            </View>
                                            
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            )}

                        </LinearGradient>
                    </View>

                </ImageBackground>
            </View>
            <View style={isPortrait ? styles.child2Portrait : styles.child2Landscape}>
                <Text>Child View 2</Text>
            </View>
        </View>
        // </ScrollView>


    );
};

const styles = StyleSheet.create({
    containerPortrait: {
        flex: 1,
        flexDirection: 'column',
    },
    containerLandscape: {
        flex: 1,
        flexDirection: 'row',
    },
    child1Portrait: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
    child2Portrait: {
        flex: 1,
        backgroundColor: 'lightgreen',
    },
    child1Landscape: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
    child2Landscape: {
        flex: 1,
        backgroundColor: 'lightgreen',
    },
    container: {
        flexDirection: 'row', // Horizontal layout
        alignItems: 'center', // Center vertically
        width: 70,
        margin: 30
    },
    leftText: {
        color: 'white', // Set the text color
        fontSize: 23, // Set the font size
        marginLeft: 8, // Add margin to create space between the icon and text
    },
    icon: {
        // color: "black", // Icon color
    },
});
export default MovieDetailScreen;
