import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

export type News = {
  id: string;
  title: string;
  date: string;
  author?: string;
};

const NewsScreen = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const fetchNews = () => {
    setIsLoading(true);
    fetch('https://bigfoot-backend-api.vercel.app/news')
      .then(response => {
        if (!response.ok) throw new Error('Erro na resposta: ' + response.status);
        return response.json();
      })
      .then(data => {
        setNewsData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar notícias:', error);
        setNewsData([{ id: 'error', title: 'Erro ao carregar notícias', author: '', date: '' }]);
        setIsLoading(false);
      });
  };


  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetails', { newsId: item.id })}
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
      <TouchableOpacity style={styles.refreshButton} onPress={fetchNews}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.refreshIcon}>↻</Text>
        )}
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => String(item.id)}
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
    marginBottom: 10,
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
  refreshButton: {
    backgroundColor: '#00bcd4',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  refreshIcon: {
    fontSize: 24,
    color: '#fff',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default NewsScreen;