import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type PlayerDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PlayerDetails'>;

const founders = [
  {
    id: '1',
    name: 'Fabrício Ricard',
    elo: 'Ouro', // Exemplo fictício
    age: 29,
    favoriteChampion: 'Aatrox', // Exemplo fictício
    favoriteFood: 'Churrasco', // Exemplo fictício
  },
  {
    id: '2',
    name: 'Yan Renat',
    elo: 'Prata', // Exemplo fictício
    age: 29,
    favoriteChampion: 'Yasuo', // Exemplo fictício
    favoriteFood: 'Sushi', // Exemplo fictício
  },
];

const PlayerDetailsScreen = ({ route }: { route: PlayerDetailsScreenRouteProp }) => {
  const { playerId } = route.params;
  const founder = founders.find(f => f.id === playerId);

  if (!founder) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Fundador não encontrado!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{founder.name}</Text>
      <Text style={styles.elo}>Elo: {founder.elo}</Text>
      <Text style={styles.age}>Idade: {founder.age}</Text>
      <Text style={styles.favoriteChampion}>Campeão Favorito: {founder.favoriteChampion}</Text>
      <Text style={styles.favoriteFood}>Comida Favorita: {founder.favoriteFood}</Text>
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