// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieListScreen from './screens/MovieListScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import MovieSearchScreen from './screens/MovieSearchScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen name="MovieList" component={MovieListScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieSearchScreen" component={MovieSearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
