import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';


type PlayerDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PlayerDetails'>;


const players = [
  { id: '1', name: 'Auditorovisk', position: 'Top', elo: 'Gold', age: 22, favoriteChampion: 'Garen', favoriteFood: 'Pizza' },
  { id: '2', name: 'GALO VIGARISTA', position: 'Jungle', elo: 'Platinum', age: 25, favoriteChampion: 'Lee Sin', favoriteFood: 'Sushi' },
  { id: '3', name: 'RicaForex', position: 'Mid', elo: 'Diamond', age: 20, favoriteChampion: 'Zed', favoriteFood: 'Burger' },
  { id: '4', name: 'Smolder', position: 'Adcarry', elo: 'Gold', age: 23, favoriteChampion: 'Jhin', favoriteFood: 'Pasta' },
  { id: '5', name: 'iquinho', position: 'Support', elo: 'Silver', age: 21, favoriteChampion: 'Thresh', favoriteFood: 'Tacos' },
];

const PlayerDetailsScreen = ({ route }: { route: PlayerDetailsScreenRouteProp }) => {

  const { playerId } = route.params;
  const player = players.find(p => p.id === playerId);

  if (!player) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Jogador não encontrado!</Text>
      </View>
    );
  }

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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default PlayerDetailsScreen;