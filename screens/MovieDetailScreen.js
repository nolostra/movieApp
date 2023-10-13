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
            console.log(width, height)
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
                    navigation.pop();
                }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Svg width="36" height="18" viewBox="0 0 11 18" fill="none">
                        <Path d="M9.75 16.5L2.25 9L9.75 1.5" stroke="#FFFFFF" strokeWidth="2" />
                    </Svg>
                    <Text style={styles.leftText}>Watch</Text>
                </TouchableOpacity>
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

    const watchTrailer = async () => {
        // Set showTrailer to true to display the video player
        await getTrailer()
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
    const usedColors = [];
    function darkenColor(color, percent) {
        // Extract the RGB components from the color
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Calculate the darkened color
        const darkenedR = Math.max(0, r - Math.floor(r * percent / 100));
        const darkenedG = Math.max(0, g - Math.floor(g * percent / 100));
        const darkenedB = Math.max(0, b - Math.floor(b * percent / 100));

        // Convert the RGB components back to hexadecimal and return the color
        return `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;
    }
    function getRandomColor() {
        const allColors = ["#FF5733", "#FFDA33", "#33FF57", "#33B5FF", "#F633FF"]; // Add more colors as needed
        const availableColors = allColors.filter(color => !usedColors.includes(color));

        if (availableColors.length === 0) {
            // If all colors have been used, reset the usedColors array
            usedColors.length = 0;
        }

        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const color = darkenColor(availableColors[randomIndex], 20); // Darken by 10%

        usedColors.push(color);
        return color;
    }
    return (
        // <ScrollView >
        <View style={isPortrait ? styles.containerPortrait : styles.containerLandscape}>

            <View style={isPortrait ? styles.child1Portrait : styles.child1Landscape}>
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/w500${backgroundImage.current}` }} // Replace with the path to your background image
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={{ flex: showTrailer ? 0:1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
                        <TopBar />
                    </View>
                    
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

                        ) : (
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
                                            <TouchableOpacity onPress={() => { 
                                                navigation.navigate('SeatMapping', {  data: movieData})
                                            }}>
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
                                            <TouchableOpacity onPress={() => {
                                                watchTrailer()
                                            }}>
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
                                                    flexDirection: 'row'
                                                }}>
                                                    <Svg width="36" height="18" viewBox="0 0 11 18" fill="#FFFFFF">
                                                        <Path d="M1.25 1.5L8.75 9L1.25 16.5" stroke="#FFFFFF" strokeWidth="2" />
                                                    </Svg>
                                                    <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Watch Trailer</Text>
                                                </View>

                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                )}

                            </LinearGradient>
                            </View>
                        )}

                    
                    {showTrailer && (<TouchableOpacity onPress={() => {watchTrailer()}}>
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
                            marginEnd:50
                        }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Done</Text>
                        </View>
                    </TouchableOpacity>)}


                </ImageBackground>
            </View>
            <View style={isPortrait ? styles.child2Portrait : styles.child2Landscape}>

                <View style={{ flex: 0.5, padding: 20 }}>
                    <Text style={{ fontSize: 24, fontFamily: 'Bold', fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: "black", paddingVertical: 20 }}>Genres</Text>
                    {movieData && (
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {movieData.genres.map((genre) => (
                                    <View key={genre.id} style={{
                                        flexShrink: 0,
                                        backgroundColor: getRandomColor(),
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        paddingVertical: 2,
                                        paddingHorizontal: 15,
                                        height: 30,
                                        borderRadius: 16,
                                        marginRight: 7,
                                    }}>
                                        <Text style={{ fontSize: 16, color: "white", paddingTop: 3 }}>{genre.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    )}
                </View>
                <View style={{ height: 1, backgroundColor: '#000000', paddingHorizontal: 20, marginHorizontal: 25 }} />
                <View style={{ flex: 1, paddingHorizontal: 20 }}>

                    <Text style={{ fontSize: 24, fontFamily: 'Bold', fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: "black", paddingVertical: 20 }}>Overview</Text>

                    {movieData && (

                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {movieDetails.overview ? (
                                movieDetails.overview.length > 300 ? (
                                    <Text style={{ fontSize: 16, textAlign: 'center', color: "#8F8F8F" }}>
                                        {`${movieDetails.overview.substring(0, 300)}...`}
                                    </Text>
                                ) : (
                                    <Text style={{ fontSize: 16, textAlign: 'center', color: "#8F8F8F" }}>
                                        {movieDetails.overview}
                                    </Text>
                                )
                            ) : (
                                <Text style={{ fontSize: 16, textAlign: 'center', color: "#8F8F8F" }}>
                                    No overview available.
                                </Text>
                            )}
                        </View>

                    )}
                </View>
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
    },
    child1Landscape: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
    child2Landscape: {
        flex: 1,
        // backgroundColor: 'lightgreen',
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
