import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

const gamesData = [
  {
    id: '1',
    teams: 'BIGFOOT Esports x ALPHA ESPORTS',
    date: '2025-02-20',
    time: '18:00',
    championship: 'Liga Nacional',
    twitchLink: 'https://www.twitch.tv/magroalbino',
  },
  {
    id: '2',
    teams: 'BIGFOOT Esports x BETA ESPORTS',
    date: '2025-02-25',
    time: '20:00',
    championship: 'Liga Internacional',
    twitchLink: 'https://www.twitch.tv/magroalbino',
  },
  // Adicione mais jogos conforme necessário
];

const GamesScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.gameCard}>
      <Text style={styles.teams}>{item.teams}</Text>
      <Text style={styles.details}>Dia: {item.date}</Text>
      <Text style={styles.details}>Horário: {item.time}</Text>
      <Text style={styles.details}>Campeonato: {item.championship}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.twitchLink)}>
        <Text style={styles.twitchLink}>Assista na Twitch</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Próximos Jogos</Text>
      <FlatList
        data={gamesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  gameCard: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  teams: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  twitchLink: {
    fontSize: 16,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});

export default GamesScreen;