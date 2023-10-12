// MovieSearchScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import Svg, { Path } from 'react-native-svg';
import BottomBar from '../component/bottombar.component';
import { useNavigation } from '@react-navigation/native';
const MovieSearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [dataSearched, setDataSearched] = useState(false)
    const [genreList, setGenreList] = useState();
    const [discoverMovieList, setDiscoverMovieList] = useState();
    const [numColumns, setNumColumns] = useState(2);
    const [showBackButtonOnTop, setShowBackButtonOnTop] = useState(false)
    const handleSearch = () => {
        axios
            .get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: 'cb58440dda48ca5af8a15d8597b7b513',
                    query: searchQuery,
                },
            })
            .then(response => {
                const results = response.data.results;
                setSearchResults(results);
            })
            .catch(error => {
                console.error(error);
            });
    };
    const imagesList = [
        {
            "poster_path": "/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
            "genre": "Horror"
        },
        {
            "poster_path": "/1syW9SNna38rSl9fnXwc9fP7POW.jpg",
            "genre": "Action"
        },
        {
            "poster_path": "/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
            "genre": "Mystery"
        },
        {
            "poster_path": "/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
            "genre": "Adventure"
        },
        {
            "poster_path": "/8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg",
            "genre": "Science Fiction"
        },
        {
            "poster_path": "/51tqzRtKMMZEYUpSYkrUE7v9ehm.jpg",
            "genre": "Racing"
        },

    ]

    const getGenre = async () => {
        axios
            .get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: 'cb58440dda48ca5af8a15d8597b7b513',
                },
            })
            .then(response => {
                // console.log("Genre List =>", response.data.genres)
                const changedData = response.data.genres.map(genre => ({
                    [genre.id]: genre.name
                }));
                console.log("Genre List2 =>", changedData)
                setGenreList(changedData)
            })
            .catch(error => {
                console.error(error);
            })

    }

    const DiscoverMovie = async () => {
        axios
            .get('https://api.themoviedb.org/3/discover/movie', {
                params: {
                    api_key: 'cb58440dda48ca5af8a15d8597b7b513',
                },
            })
            .then(response => {
                // console.log("Discover Movie List =>", response.data.results[0])
                const extractedData = response.data.results.map(movie => {
                    return {
                        genres: movie.genre_ids,
                        poster_path: movie.poster_path
                    };
                });
                //   console.log("Discover Movie List2 =>",extractedData)
                setDiscoverMovieList(extractedData)

            })
            .catch(error => {
                console.error(error);
            })

        setTimeout(() => {
            // getMoviesByGenre(28, discoverMovieList, genreList)
        }, 2000)
    }
    useEffect(() => {
        if (searchQuery == '') {
            setDataSearched(false)
        } else {
            handleSearch()
            setDataSearched(true)
        }
        getGenre()
        DiscoverMovie()

    }, [searchQuery])
    const clearSearch = () => {
        setSearchQuery('');
    };
    // function getMoviesByGenre(genreNumber, movieList, genreList) {
    //     console.log("data", genreNumber, movieList, genreList)
    //     const genreId = String(genreNumber); // Convert the genreNumber to a string
    //     // const genreMap = genreList.find((genre) => genre[genreId]); // Find the genre in genreList2

    //     // if (!genreMap) {
    //     //     // If the genre is not found, return an empty array
    //     //     return [];
    //     // }

    //     // const genreName = genreMap[genreId]; // Get the genre name

    //     // const moviesWithGenre = movieList
    //     //     .filter((movie) => movie.genres.includes(parseInt(genreId, 10)))
    //     //     .map((movie) => ({ poster_path: movie.poster_path }));

    //     // return { genre: genreName, movies: moviesWithGenre };
    // }

    function getGenresByKeys(keys) {
        const resultGenres = [];
        // console.log("keys=>", genreList);
        // console.log("keys2=>", keys);

        for (let i = 0; i < keys.length; i++) {
            const genreKey = keys[i];
            for (const genreObj of genreList) {
                const genreId = Object.keys(genreObj)[0];
                if (genreKey.toString() === genreId) {
                    resultGenres.push(genreObj[genreId]);
                    if (i < keys.length - 1) {
                        resultGenres.push(', ');
                    }
                    break; // Stop searching for this genreKey once found
                }
            }
        }

        return resultGenres.length > 0 ? resultGenres[0] : ["Genres not found"];
    }
    const ListItem = ({ item, onPress }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    // backgroundColor: '#333',
                    borderRadius: 10,
                    padding: 0,
                    marginBottom: 16,
                    shadowColor: 'rgba(255, 255, 255, 0.2)',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 2,
                    flex: 1
                }}
                onPress={onPress}
            >
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} // Provide the image URI here
                    style={{
                        width: 140, // Adjust the image width as needed
                        height: 120, // Adjust the image height as needed
                        borderRadius: 10, // Add border radius for a rounded image
                    }}
                />
                <View style={{ flex: 1, marginLeft: 20, alignItems: 'flex-start' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Text
                            style={{
                                color: '#202C43',
                                fontSize: 15,
                                fontWeight: 'bold',
                                // Set the following two properties for text wrapping
                                flexWrap: 'wrap',
                                numberOfLines: 2, // Adjust the number of lines as needed
                            }}
                        >
                            {item.title}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                color: '#202C43',
                                fontSize: 13,
                            }}
                        >
                            {getGenresByKeys(item.genre_ids)}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: .2, alignItems: 'center', justifyContent: 'center' }}>
                    <Svg
                        height={15}
                        width={50}
                        viewBox="0 0 130 100"
                        style={{ margin: 10 }}
                    >
                        <Path
                            d="M 0 15 A 15 15 0 1 1 15 30 A 15 15 0 0 1 0 15 Z m 92.93 0 a 15 15 0 1 1 15 15 a 15 15 0 0 1 -15 -15 Z M 46.46 15 a 15 15 0 1 1 15 15 a 15 15 0 0 1 -15 -15 Z"
                            fill="#61C3F2"
                        />
                    </Svg>
                </View>


            </TouchableOpacity>
        );
    };

    // const navigation = useNavigation();
    const renderItem = ({ item }) => (

        <ImageBackground
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.item}
        >
            <Text style={styles.name}>{item.genre}</Text>
        </ImageBackground>
    );
    return (
        <View style={{ flex: 1, paddingTop: 15 }}>
            <View style={{ paddingHorizontal: 10, padding: 10,elevation: 10, }}>
                <View
                    style={{
                        // flexDirection: 'row',
                        // alignItems: 'center',
                        // backgroundColor: '#DBDBDF',
                        borderRadius: 30,
                        marginBottom: 12,
                        

                    }}
                >
                    {
                        showBackButtonOnTop ? (
                            <View style={styles.container2}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                    style={styles.iconContainer}
                                >
                                    <Svg style={styles.vector} width="36" height="18" viewBox="0 0 11 18" fill="none">
                                        <Path d="M9.75 16.5L2.25 9L9.75 1.5" stroke="#202C43" strokeWidth="2" />
                                    </Svg>
                                </TouchableOpacity>
                                <Text style={styles.resultsText}>
                                    {searchQuery.length} Results Found
                                </Text>
                            </View>
                        ) : (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#DBDBDF',
                                borderRadius: 30,
                                // marginBottom: 12,

                            }}>

                                <Svg
                                    height={18}
                                    width={50}
                                    viewBox="0 0 42 42"
                                    style={{ margin: 10 }}
                                >
                                    <Path
                                        d="M 21 3 C 11.6211 3 4 10.6211 4 20 C 4 29.3789 11.6211 37 21 37 C 24.7109 37 28.1406 35.8047 30.9375 33.7813 L 44.0938 46.9063 L 46.9063 44.0938 L 33.9063 31.0625 C 36.4609 28.0859 38 24.2227 38 20 C 38 10.6211 30.3789 3 21 3 Z M 21 5 C 29.2969 5 36 11.7031 36 20 C 36 28.2969 29.2969 35 21 35 C 12.7031 35 6 28.2969 6 20 C 6 11.7031 12.7031 5 21 5 Z"
                                        fill="black"
                                    />
                                </Svg>
                                <TextInput
                                    placeholder="TV Shows, Movies, and More..."
                                    value={searchQuery}
                                    onChangeText={(text) => setSearchQuery(text)}
                                    style={{
                                        flex: 1.3,
                                        padding: 12,
                                        color: '#827D88',
                                    }}
                                    returnKeyType="done"
                                    onSubmitEditing={(e) => { setShowBackButtonOnTop(true) }}
                                    placeholderTextColor="#999"
                                />
                                {searchQuery.length > 0 && (
                                    <View >
                                        <TouchableOpacity
                                            onPress={clearSearch}
                                            style={{ padding: 10 }}
                                        >
                                            <Svg
                                                height={30}
                                                width={15}
                                                viewBox="0 0 100 100"  // Adjust the viewBox dimensions
                                                style={{ marginRight: 20 }}
                                            >
                                                <Path
                                                    d="M 6 90 c -1.536 0 -3.071 -0.586 -4.243 -1.758 c -2.343 -2.343 -2.343 -6.142 0 -8.484 l 78 -78 c 2.342 -2.343 6.143 -2.343 8.484 0 c 2.344 2.343 2.344 6.142 0 8.485 l -78 78 C 9.071 89.414 7.536 90 6 90 Z"
                                                    fill="black"
                                                />
                                                <Path
                                                    d="M 84 90 c -1.535 0 -3.071 -0.586 -4.242 -1.758 l -78 -78 c -2.343 -2.343 -2.343 -6.142 0 -8.485 c 2.343 -2.343 6.143 -2.343 8.485 0 l 78 78 c 2.344 2.343 2.344 6.142 0 8.484 C 87.071 89.414 85.535 90 84 90 Z"
                                                    fill="black"
                                                />
                                            </Svg>
                                            {/* <Text style={{fontSize:25}}>X</Text> */}
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        )
                    }

                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: "#DBDBDF", }}>
                {dataSearched ? (<View style={{ flex: 1, padding: 15 }}>{searchResults.length > 0 ? (
                    <View>
                        <Text style={{ color: '#202C43', fontSize: 18, marginBottom: 10 }}>{"Top Results"}</Text>
                        <View style={{ backgroundColor: '#0000001C', height: 1, marginBottom: 20 }} />
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <ListItem item={item} onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })} />
                            )}
                        />
                    </View>
                ) : (
                    <Text style={{ color: 'white', fontSize: 18 }}>No results found</Text>
                )}

                </View>
                ) : (
                    <View style={{ flex: 1, backgroundColor: "#DBDBDF", marginTop: 20 }}>
                        <View>
                            <FlatList
                                data={imagesList}
                                keyExtractor={(item) => item.id}
                                numColumns={numColumns}
                                renderItem={renderItem}
                            />

                        </View>
                    </View>
                )}
            </View>
            <BottomBar/>
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
        fontFamily: 'Poppins-Bold'
    },
    icon: {
        // color: "black", // Icon color
    },
    item: {
        flex: 1,
        margin: 10,
        height: 120, // Adjust the height as needed
        borderRadius: 10,
        overflow: 'hidden',
    },
    backgroundImage: {
        width: '100%',
        height: '140%',
        position: 'absolute',
    },
    name: {
        position: 'absolute',
        bottom: 20,
        left: 25,
        color: 'white', // Adjust text color as needed
        fontSize: 23, // Adjust font size as needed
        // fontWeight:800
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        height:40,
        
      },
      iconContainer: {
        marginRight: 10, // Adjust the margin as needed
      },
      vector: {
        // Add your SVG styles here
      },
      resultsText: {
        color: '#202C43',
        fontSize: 25,
        paddingLeft:20
      },
});
export default MovieSearchScreen;
