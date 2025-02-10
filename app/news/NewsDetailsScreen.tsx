import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type NewsDetailsScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetails'>;

const NewsDetailsScreen = ({ route }: { route: NewsDetailsScreenRouteProp }) => {
    const { news } = route.params;

    const formatDate = (date: string) => {
        const today = new Date();
        const newsDate = new Date(date);
        const isToday = today.toDateString() === newsDate.toDateString();
        const formattedDate = newsDate.toLocaleDateString('pt-BR');

        return isToday ? `hoje ${formattedDate}` : formattedDate;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.date}>{formatDate(news.date)}</Text>
            <Text style={styles.content}>
                {news.id === '1' && 'BIGFOOT Esports participou do campeonato Forja do Ornn, realizado no Battlefy, e teve um desempenho impressionante, alcançando as quartas de finais. A equipe mostrou grande habilidade e trabalho em equipe, destacando-se entre os competidores.'}
                {news.id === '2' && 'BIGFOOT Esports lançou seu primeiro aplicativo móvel, disponível para Android e iOS. O aplicativo oferece notícias, atualizações, calendário de eventos e muito mais, permitindo que os fãs fiquem sempre informados sobre as atividades da equipe.'}
                {news.id === '3' && 'BIGFOOT Esports está em busca de novos patrocinadores para apoiar a equipe em suas próximas competições e eventos. A equipe está aberta a parcerias que possam contribuir para o crescimento e desenvolvimento do time.'}
                {news.id === '4' && 'BIGFOOT Esports lançou um novo site com design moderno e funcionalidades aprimoradas para melhor atender seus fãs. O novo site inclui seções dedicadas a notícias, calendário de eventos, perfis de jogadores e muito mais.'}
                {news.id === '5' && 'BIGFOOT Esports anunciou uma nova parceria com a empresa Micoflora, visando fortalecer a equipe e expandir suas operações. A parceria trará novos recursos e oportunidades para a equipe, permitindo que eles alcancem novos patamares no cenário competitivo.'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        color: '#888',
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
    },
});

export default NewsDetailsScreen;