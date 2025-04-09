
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/home/HomeScreen';
import NewsScreen from './app/news/NewsScreen';
import NewsDetailsScreen from './app/news/NewsDetailsScreen';
import LineupScreen from './app/lineup/LineupScreen';
import PlayerDetailsScreen from './app/lineup/PlayerDetailsScreen';
import GamesScreen from './app/games/GamesScreen';
import DonateScreen from './app/donate/DonateScreen';
import DonateDetailsScreen from './app/donate/DonateDetailsScreen';
import PointsScreen from './app/points/PointsScreen';

export type RootStackParamList = {
  Home: undefined;
  News: undefined;
  NewsDetails: { id: string };
  Lineup: undefined;
  PlayerDetails: { playerId: string };
  Games: undefined;
  Donate: undefined;
  DonateDetails: { donationId: string };
  PointsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  console.log('App component loaded');
  try {
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
          <Stack.Screen name="DonateDetails" component={DonateDetailsScreen} />
          <Stack.Screen name="PointsScreen" component={PointsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } catch (error) {
    console.error('Erro no App:', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Erro ao carregar o aplicativo: {error.message}</Text>
      </View>
    );
  }
};

export default App;