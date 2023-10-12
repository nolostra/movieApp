// MovieSearchScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Svg, { Path } from 'react-native-svg';

const MovieSearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [dataSearched, setDataSearched] = useState(false)
    const [genreList, setGenreList] = useState();
    const [discoverMovieList, setDiscoverMovieList] = useState();
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
                //   console.log("Genre List2 =>",changedData)
                setGenreList(response.data.genres)
            })
            .catch(error => {
                console.error(error);
            });
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
            getMoviesByGenre(28, discoverMovieList, genreList)
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
    function getMoviesByGenre(genreNumber, movieList, genreList) {
        console.log("data", genreNumber, movieList, genreList)
        const genreId = String(genreNumber); // Convert the genreNumber to a string
        // const genreMap = genreList.find((genre) => genre[genreId]); // Find the genre in genreList2

        // if (!genreMap) {
        //     // If the genre is not found, return an empty array
        //     return [];
        // }

        // const genreName = genreMap[genreId]; // Get the genre name

        // const moviesWithGenre = movieList
        //     .filter((movie) => movie.genres.includes(parseInt(genreId, 10)))
        //     .map((movie) => ({ poster_path: movie.poster_path }));

        // return { genre: genreName, movies: moviesWithGenre };
    }
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#DBDBDF',
                    borderRadius: 30,
                    marginBottom: 12,
                }}
            >
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
                    </TouchableOpacity></View>
                 )} 
            </View>



            {dataSearched && (<View style={{ flex: 1, }}>{searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#333', // Dark gray background color
                                borderRadius: 10,
                                padding: 16,
                                marginBottom: 16,
                                shadowColor: 'rgba(255, 255, 255, 0.2)', // Add a subtle white shadow
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 2,
                            }}
                            onPress={() => {
                                console.log(item.id)
                                navigation.navigate('MovieDetail', { movieId: item.id })
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white', // Text color
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={{ color: 'white', fontSize: 18 }}>No results found</Text>
            )}</View>)}
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
});
export default MovieSearchScreen;
