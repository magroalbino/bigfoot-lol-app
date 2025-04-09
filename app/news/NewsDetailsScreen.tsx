import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

interface Comment {
  id: string;
  text: string;
  author: string;
  newsId: string;
  createdAt: string;
}

const NewsDetailsScreen = ({ route }: any) => {
  const { newsId } = route.params;
  const [news, setNews] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    axios.get('https://bigfoot-backend-api.vercel.app/news')
      .then((response) => {
        const selectedNews = response.data.find((item: any) => item.id === newsId);
        setNews(selectedNews);
      })
      .catch((error) => console.error('Erro ao carregar a notícia:', error));

    fetchComments();
  }, [newsId]);

  const fetchComments = () => {
    setIsLoadingComments(true);
    axios.get(`https://bigfoot-backend-api.vercel.app/news/${newsId}/comments`)
      .then((response) => {
        setComments(response.data);
        setIsLoadingComments(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar comentários:', error);
        setIsLoadingComments(false);
      });
  };

  const handlePostComment = async () => {
    if (commentText.trim()) {
      const newComment = { text: commentText, author: 'Anonymous', newsId };
      try {
        const response = await axios.post(`https://bigfoot-backend-api.vercel.app/news/${newsId}/comments`, newComment);
        if (response.status === 201) {
          setCommentText('');
          fetchComments();
        }
      } catch (error) {
        console.error('Erro ao postar comentário:', error);
      }
    }
  };

  const renderCommentItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentAuthor}>{item.author}:</Text>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentDate}>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</Text>
    </View>
  );

  const renderHeader = () => (
    <>
      {news ? (
        <View>
          <Text style={styles.title}>{news.title}</Text>
          <Text style={styles.author}>Autor: {news.author}</Text>
          <Text style={styles.date}>Data: {news.date}</Text>
          <Text style={styles.details}>{news.details}</Text>
        </View>
      ) : (
        <Text style={styles.header}>Carregando...</Text>
      )}
      <View style={styles.commentSection}>
        <Text style={styles.commentHeader}>Comentários</Text>
        <View style={styles.commentInputArea}>
          <TextInput
            style={styles.commentInput}
            placeholder="Deixe seu comentário..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity style={styles.postButton} onPress={handlePostComment}>
            <Text style={styles.postButtonText}>Postar</Text>
          </TouchableOpacity>
        </View>
        {isLoadingComments && <Text>Carregando comentários...</Text>}
      </View>
    </>
  );

  return (
    <FlatList
      style={styles.container}
      data={isLoadingComments ? [] : comments}
      keyExtractor={(item) => item.id}
      renderItem={renderCommentItem}
      ListHeaderComponent={renderHeader}
    />
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
    marginBottom: 20,
  },
  commentSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  commentHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  commentInputArea: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentInput: {
    flex: 1,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#00bcd4',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: '#777',
  },
});

export default NewsDetailsScreen;