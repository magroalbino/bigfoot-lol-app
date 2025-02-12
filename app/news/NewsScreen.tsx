import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { News } from '../../types';  // Importação do tipo News

const NewsScreen = () => {
  const [newsData, setNewsData] = useState<News[]>([]);  // Tipagem correta do estado
  const [isLoading, setIsLoading] = useState(true); // Estado de loading
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetch('http://192.168.50.149:3000/news')  // Substitua pelo IP local
      .then(response => response.json())
      .then(data => {
        setNewsData(data);  // Atribuindo dados tipados
        setIsLoading(false); // Atualiza o estado após a resposta
      })
      .catch(error => {
        console.error('Erro ao buscar notícias:', error);
        setIsLoading(false); // Garante que o loading seja desativado em caso de erro
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetails', { newsId: item.id })}  // Passando apenas o ID da notícia
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
    </TouchableOpacity>
  );

  const sections = Object.keys(newsData.reduce((acc, news) => {
    (acc[news.date] = acc[news.date] || []).push(news);
    return acc;
  }, {})).map(date => ({
    title: formatDate(date),
    data: newsData.filter(news => news.date === date)
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notícias</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Indicador de carregamento
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => String(item.id)}  // Garantir que o id seja uma string
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.dateHeader}>{title}</Text>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.sectionListContent}
        />
      )}
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
  newsItem: {
    padding: 15,
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  author: {
    fontSize: 14,
    color: '#000',
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  separator: {
    height: 10,
  },
  sectionListContent: {
    paddingBottom: 20,
  },
});

export default NewsScreen;