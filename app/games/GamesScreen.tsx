import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const GamesScreen = () => {

  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://bigfoot-backend-api.vercel.app/upcoming-games');
        setGamesData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os jogos');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);


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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Carregando jogos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{error}</Text>
      </View>
    );
  }

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
