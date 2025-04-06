import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PointsScreen = () => {
    const [points, setPoints] = useState(0);

    const loadPoints = async () => {
        try {
            const savedPoints = await AsyncStorage.getItem('userPoints');
            const currentPoints = savedPoints ? parseInt(savedPoints, 10) : 0;
            const lastAccess = await AsyncStorage.getItem('lastAccess');
            const today = new Date().toDateString();

            if (lastAccess !== today) {
                const newPoints = currentPoints + 10;
                await AsyncStorage.setItem('userPoints', newPoints.toString());
                await AsyncStorage.setItem('lastAccess', today);
                setPoints(newPoints);
            } else {
                setPoints(currentPoints);
            }
        } catch (error) {
            console.error('Erro ao carregar pontos:', error);
        }
    };

    useEffect(() => {
        loadPoints();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seus Pontos</Text>
            <Text style={styles.points}>{points}</Text>
            <Text style={styles.info}>
                Acesse o app todos os dias para ganhar 10 pontos! Quanto mais você interage, mais pontos acumula.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00bcd4',
        marginBottom: 20,
    },
    points: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
});

export default PointsScreen;