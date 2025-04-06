import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  console.log('HomeScreen: Início');

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>BIGFOOT Esports</Text>

        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />

        <Text style={styles.welcomeMessage}>
          Bem-vindo ao nosso aplicativo! Fique ligado nas próximas atualizações e colabore com o projeto no GitHub!
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('News')}>
          <Text style={styles.buttonText}>Notícias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lineup')}>
          <Text style={styles.buttonText}>Line-up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Games')}>
          <Text style={styles.buttonText}>Próximos Jogos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.donateButton} onPress={() => navigation.navigate('Donate')}>
          <Text style={styles.donateButtonText}>Contribua!</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={styles.pointsButton}
        onPress={() => navigation.navigate('PointsScreen')}
      >
        <Icon name="star" size={20} color="#fff" /> {/* Tamanho reduzido */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00bcd4',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  donateButton: {
    backgroundColor: '#ffca28',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  donateButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsButton: {
    position: 'absolute',
    top: 40,          // Movido para o topo
    right: 20,        // Mantido à direita
    width: 30,        // Reduzido de 40 para 30
    height: 30,       // Reduzido de 40 para 30
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 15, // Ajustado para o novo tamanho
  },
});