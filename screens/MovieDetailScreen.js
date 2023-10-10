// MovieDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';

const MovieDetailScreen = ({ route }) => {
    const { movieId } = route.params;
    const [movieDetails, setMovieDetails] = useState({});
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        // Fetch movie details using the TMdb API
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: 'cb58440dda48ca5af8a15d8597b7b513',
            },
        })
            .then(response => {
                setMovieDetails(response.data);
                console.log("second screen", response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [movieId]);

    const watchTrailer = () => {
        // Set showTrailer to true to display the video player
        setShowTrailer(true);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "black" }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
                {movieDetails.title}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center' }}>
                {movieDetails.overview}
            </Text>
            <Button
                title="Watch Trailer"
                onPress={watchTrailer}
                color="#007AFF" // Customize the button color
            />

            {/* Display the video player if showTrailer is true */}
            {showTrailer && (
                <View style={{ marginTop: 20, width: '100%', aspectRatio: 16 / 9 }}>
                    <Video
                        source={{ uri: `https://api.themoviedb.org/3/movie/${movieDetails.id}/videos` }} // Replace with actual trailer URL
                        style={{ flex: 1 }}
                        controls={true}
                        resizeMode="cover"
                        onEnd={() => setShowTrailer(false)} // Close video player when trailer ends
                    />
                </View>
            )}
        </View>

    );
};

export default MovieDetailScreen;
