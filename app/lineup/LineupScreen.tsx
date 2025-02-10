import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const players = [
  { id: '1', name: 'Auditorovisk', realName: 'Fábio Silva', age: 22, favoriteChampion: 'Lee Sin' },
  { id: '2', name: 'GALO VIGARISTA', realName: 'Lucas Oliveira', age: 24, favoriteChampion: 'Zed' },
  { id: '3', name: 'RicaForex', realName: 'Mariana Costa', age: 21, favoriteChampion: 'Ahri' },
  { id: '4', name: 'Smolder', realName: 'Ricardo Souza', age: 25, favoriteChampion: 'Malphite' },
  { id: '5', name: 'iquinho', realName: 'Ana Beatriz', age: 23, favoriteChampion: 'Ashe' },
];

export default function LineupScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.playerCard}
      onPress={() => navigation.navigate('PlayerDetails', { player: item })}
    >
      <Text style={styles.playerName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Line-up do BIGFOOT eSports</Text>
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ADD8E6',
    marginBottom: 20,
    textAlign: 'center',
  },
  playerCard: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
    color: '#000',
  },
});