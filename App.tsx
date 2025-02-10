import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/home/HomeScreen';
import NewsScreen from './app/news/NewsScreen';
import NewsDetailsScreen from './app/news/NewsDetailsScreen';
import LineupScreen from './app/lineup/LineupScreen';
import PlayerDetailsScreen from './app/lineup/PlayerDetailsScreen';
import GamesScreen from './app/games/GamesScreen';
import DonateScreen from './app/donate/DonateScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" id={undefined}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
        <Stack.Screen name="Lineup" component={LineupScreen} />
        <Stack.Screen name="PlayerDetails" component={PlayerDetailsScreen} />
        <Stack.Screen name="Games" component={GamesScreen} />
        <Stack.Screen name="Donate" component={DonateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
