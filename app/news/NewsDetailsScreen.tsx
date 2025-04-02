import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const NewsDetailsScreen = ({ route }: any) => {
  const { newsId } = route.params;
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    
    axios
      .get('https://bigfoot-lol-app.vercel.app/news')
      .then((response) => {
        
        const selectedNews = response.data.find((item: any) => item.id === newsId);
        setNews(selectedNews);
      })
      .catch((error) => {
        console.error('Erro ao carregar a notícia:', error);
      });
  }, [newsId]);

  if (!news) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.author}>Autor: {news.author}</Text>
      <Text style={styles.date}>Data: {news.date}</Text>
      <Text style={styles.details}>{news.details}</Text>
    </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  details: {
    fontSize: 18,
    color: '#000',
    lineHeight: 24,
  },
});

export default NewsDetailsScreen;