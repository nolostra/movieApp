import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Button, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import Svg, { Path } from 'react-native-svg';
import Seat from '../component/seat';
import MovieTheaterSeats from '../component/theatreseats.component';
import BoxArray2 from '../component/theatreseats.component2';
import BoxArray3 from '../component/theatreseats.component3';
import BoxArray4 from '../component/theatreseats.component4';
import CurvedLine from '../component/curve';
const SeatMapping2 = ({ route, navigation }) => {
    const MovieHeader = () => {
        return (
            <View style={styles.container2}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                            // console.log("pressed")
                        }}
                        style={{ height: 20 }}
                    >
                        <Svg width="42" height="21" viewBox="0 0 18 16" fill="none">
                            <Path d="M9.75 16.5L2.25 9L9.75 1.5" stroke="#000000" strokeWidth="2" />
                        </Svg>
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <View style={styles.centeredTextContainer}>
                            <Text style={styles.title}>{route.params.data.original_title}</Text>
                            <Text style={styles.movieData}>
                                {`In Theatres ${formatDate(route.params.data.release_date)}`}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        );
    };
    function formatDate(from) {
        const date = new Date(from);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateFormatter = new Intl.DateTimeFormat('en-US', options);
        return dateFormatter.format(date);
    }

    return (
        <View style={{ flex: 1 }}>
            < MovieHeader />
            <View style={{ flex: 1,width:"100%"}}>
                <CurvedLine/>
                
                <MovieTheaterSeats />
                <BoxArray2 />
                <BoxArray2 />
                <BoxArray2 />
                <BoxArray3 />
                <BoxArray3 />
                <BoxArray3 />
                <BoxArray3 />
                <BoxArray3 />
                <BoxArray3 />
                <BoxArray4 />

            </View>
            <View style={{
                flex: .6,
                padding: 20
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                        <Seat value="rgba(205, 157, 15, 1)" label="Selected" />
                        <Seat value="#A6A6A6" label="Not Available" />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                        <Seat value="#564CA3" label="VIP (150$)" />
                        <Seat value="#61C3F2" label="Regular (50 $)" />
                    </View>
                </View>
                <View style={{
                    flex: 1, justifyContent: 'center', // Center the content vertically
                    alignItems: 'flex-start', paddingLeft: 20
                }}>
                    <View style={{
                        width: 140, // Fixed width
                        height: 50,  // Fixed height
                        backgroundColor: "#A6A6A61A",
                        borderRadius: 10,
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#202C43' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>4/</Text>
                            </Text>
                        </View>
                        <Text style={{ fontSize: 16, color: '#202C43', paddingRight: 20 }}>3 row</Text>

                    </View>

                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignItems: 'flex-end', }}>
                    <View style={{
                        width: 140,
                        height: 50,
                        backgroundColor: "#A6A6A61A",
                        borderRadius: 10,
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginRight: 20
                    }}>
                        <View style={{ flexDirection: 'Column', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#202C43' }}>
                                Total Price
                            </Text>
                            <Text style={{ fontSize: 20, color: '#202C43', fontWeight: 'bold', }}>
                                $ 50
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        width: 200,
                        height: 50,
                        backgroundColor: "#61C3F2",
                        borderRadius: 10,
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', paddingRight: 20 }}>Proceed to pay</Text>

                    </View>

                </View>



            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        flex: .15,

    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        paddingHorizontal: 10,
        paddingVertical: 20,
        elevation: 4,
    },
    centeredTextContainer: {
        alignItems: 'center', // Center-align the text vertically
    },
    hallText: {
        color: "#8F8F8F",
        paddingTop: 5
    },
    titleContainer: {
        flex: 1, // Allows title and movieData to take equal vertical space
        justifyContent: 'center', // Center-align children vertically
        marginLeft: 10, // Adjust this value for spacing between the icon and text
        // backgroundColor:"yellow"
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#202C43',
    },
    movieData: {
        fontSize: 16,
        color: '#61C3F2',
    },
    container3: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: "yellow",
        // backgroundColor: "blue",
        paddingLeft: 20
    },
    timeText: {
        fontSize: width > 360 ? 20 : 18, // Adjust the font size based on screen width
        marginRight: 10,
        color: '#202C43'
    },
    row: {
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: "grey",
        width: width * 0.3, // Adjust the width as needed
        marginVertical: 10, // Add vertical spacing between row
        marginRight: 50,

        flex: .5,
        height: 250
    },
    yellowContainer: {
        // backgroundColor: "yellow",
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    rowContent: { // Takes up remaining horizontal space
        flexDirection: 'row',
        // alignItems: 'center',
        // backgroundColor: "green",
    },
    curveAndSeats: {
        flex: 1, // Takes up remaining horizontal space
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: "green",
    },
});
export default SeatMapping2