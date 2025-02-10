import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type PlayerDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PlayerDetails'>;

const PlayerDetailsScreen = ({ route }: { route: PlayerDetailsScreenRouteProp }) => {
  const { player } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{player.name}</Text>
      <Text style={styles.elo}>Elo: {player.elo}</Text>
      <Text style={styles.age}>Idade: {player.age}</Text>
      <Text style={styles.favoriteChampion}>Campeão Favorito: {player.favoriteChampion}</Text>
      <Text style={styles.favoriteFood}>Comida Favorita: {player.favoriteFood}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  elo: {
    fontSize: 20,
    marginBottom: 10,
    color: '#666',
  },
  age: {
    fontSize: 20,
    marginBottom: 10,
    color: '#666',
  },
  favoriteChampion: {
    fontSize: 20,
    marginBottom: 10,
    color: '#666',
  },
  favoriteFood: {
    fontSize: 20,
    color: '#666',
  },
});

export default PlayerDetailsScreen;