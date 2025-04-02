import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const players = [
  { id: '1', name: 'Auditorovisk', position: 'Top' },
  { id: '2', name: 'GALO VIGARISTA', position: 'Jungle' },
  { id: '3', name: 'RicaForex', position: 'Mid' },
  { id: '4', name: 'Smolder', position: 'Adcarry' },
  { id: '5', name: 'iquinho', position: 'Support' },
];

const LineupScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.playerCard}
      onPress={() => navigation.navigate('PlayerDetails', { playerId: item.id })}
    >
      <Text style={styles.playerName}>{item.name}</Text>
      <Text style={styles.playerPosition}>{item.position}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Line-up do BIGFOOT Esports 2025</Text>
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    marginTop: 30,
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
    fontWeight: 'bold',
    color: '#000',
  },
  playerPosition: {
    fontSize: 16,
    color: '#000',
  },
});

export default LineupScreen;