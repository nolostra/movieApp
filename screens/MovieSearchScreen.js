// MovieSearchScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList,TouchableOpacity } from 'react-native';
import axios from 'axios';

const MovieSearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [dataSearched,setDataSearched] =  useState(false)
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
    useEffect(()=>{
        if(searchQuery == ''){
            setDataSearched(false)
        }else{
            handleSearch()
            setDataSearched(true)
        }
    },[searchQuery])

    return (
        <View style={{ flex: 1, backgroundColor: '#222', padding: 16 }}>
            <TextInput
                placeholder="Enter movie title to Search..."
                value={searchQuery}
                onChangeText={text => {setSearchQuery(text)
                    
                }}
                style={{
                    backgroundColor: '#333', // Dark gray background color
                    borderRadius: 5,
                    padding: 12,
                    marginBottom: 12,
                    color: 'white', // Text color
                }}
                placeholderTextColor="#999" // Placeholder text color
            />
            


            {dataSearched && (<View style={{flex: 1,}}>{searchResults.length > 0 ? (
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

export default MovieSearchScreen;
