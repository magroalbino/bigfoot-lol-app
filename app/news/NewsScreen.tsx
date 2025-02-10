import React from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const newsData = [
    { id: '1', date: '2025-02-12', title: 'BIGFOOT participa do campeonato Forja do Ornn', author: 'por apu apustaja' },
    { id: '2', date: '2025-02-13', title: 'BIGFOOT e seu primeiro app', author: 'por apu apustaja' },
    { id: '3', date: '2025-02-14', title: 'BIGFOOT busca patrocinadores', author: 'por apu apustaja' },
    { id: '4', date: '2025-02-15', title: 'BIGFOOT lança novo site', author: 'por apu apustaja' },
    { id: '5', date: '2025-02-16', title: 'BIGFOOT anuncia parceria com empresa XYZ', author: 'por apu apustaja' },
    // Adicione mais notícias conforme necessário
];

const NewsScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.newsItem}
            onPress={() => navigation.navigate('NewsDetails', { news: item })}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
        </TouchableOpacity>
    );

    const sections = Object.keys(newsData.reduce((acc, news) => {
        (acc[news.date] = acc[news.date] || []).push(news);
        return acc;
    }, {})).map(date => ({
        title: date,
        data: newsData.filter(news => news.date === date)
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notícias</Text>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.dateHeader}>{title}</Text>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.sectionListContent}
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
        paddingBottom: 20, // Adiciona espaço extra na parte inferior da lista
    },
});

export default NewsScreen;