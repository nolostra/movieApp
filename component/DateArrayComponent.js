import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedDate: {
        backgroundColor: '#61C3F2',
        color: 'white',
        padding: 3,
        margin: 8,
        borderRadius: 15,
        // height:70,
        fontSize: 18,
        fontWeight: 'bold',
    },
    unselectedDate: {
        backgroundColor: 'rgba(166, 166, 166, 0.1)',
        padding: 13,
        margin: 8,
        borderRadius: 15,
        fontSize: 16,
        fontWeight: 'bold',
    },
    unselectedDateText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

class DateArrayComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateArray: [],
            selectedDate: 0, // Initialize with today's date (index 0)
        };
    }

    componentDidMount() {
        const getMonthName = (monthNumber) => {
            const months = [
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'Oct', 'November', 'December'
            ];
            return months[monthNumber];
        };

        const currentDate = new Date();
        const dateArray = [];
        dateArray.push({
            date: currentDate.getDate(),
            month: getMonthName(currentDate.getMonth()),
        });

        for (let i = 1; i <= 5; i++) {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + i);

            dateArray.push({
                date: nextDate.getDate(),
                month: getMonthName(nextDate.getMonth()),
            });
        }

        this.setState({ dateArray });
    }

    toggleDateSelection = (index) => {
        this.setState({ selectedDate: index });
    };

    render() {
        const { dateArray, selectedDate } = this.state;

        return (
            <View>
                <ScrollView style={{ height: 150 }}>
                    <View style={{ marginHorizontal: 10 ,marginVertical: 10 }}>
                        <Text style={{ color: "#202C43",fontSize:23 }}>
                            Date
                        </Text>
                    </View>
                    <View style={styles.container}>

                        {dateArray.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => this.toggleDateSelection(index)}
                                style={
                                    selectedDate === index
                                        ? styles.selectedDate
                                        : styles.unselectedDate
                                }
                            >
                                <Text style={
                                    selectedDate === index
                                        ? styles.selectedDate
                                        : styles.unselectedDateText
                                }>
                                    {item.date} {item.month}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default DateArrayComponent;
