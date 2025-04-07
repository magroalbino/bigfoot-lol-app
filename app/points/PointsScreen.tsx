import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REWARD_ITEMS = [
    { id: '1', name: 'Caneca', cost: 50 },
    { id: '2', name: 'Mousepad', cost: 100 },
    { id: '3', name: 'Camisa', cost: 200 },
];

const PointsScreen = () => {
    const [points, setPoints] = useState(0);
    const [lastClaimDate, setLastClaimDate] = useState('');
    const [countdown, setCountdown] = useState('');
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const loadPoints = async () => {
            const storedPoints = await AsyncStorage.getItem('userPoints');
            const storedDate = await AsyncStorage.getItem('lastClaimDate');
            const storedHistory = await AsyncStorage.getItem('redeemHistory');
            if (storedPoints) setPoints(parseInt(storedPoints));
            if (storedDate) setLastClaimDate(storedDate);
            if (storedHistory) setHistory(JSON.parse(storedHistory));
        };
        loadPoints();
    }, []);

    useEffect(() => {
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [lastClaimDate]);

    const updateCountdown = () => {
        if (!lastClaimDate) return;
        const now = new Date();
        const lastDate = new Date(lastClaimDate);
        const nextClaimDate = new Date(lastDate);
        nextClaimDate.setDate(nextClaimDate.getDate() + 1);
        const diff = nextClaimDate.getTime() - now.getTime();

        if (diff <= 0) {
            setCountdown('');
        } else {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        }
    };

    const handleClaimPoints = async () => {
        const today = new Date().toDateString();
        if (lastClaimDate === today) {
            Alert.alert('Atenção', 'Você já resgatou seus pontos hoje!');
            return;
        }

        const newPoints = points + 10;
        setPoints(newPoints);
        setLastClaimDate(today);
        await AsyncStorage.setItem('userPoints', newPoints.toString());
        await AsyncStorage.setItem('lastClaimDate', today);
    };

    const handleRedeem = async (item: { id: string; name: string; cost: number }) => {
        if (points < item.cost) {
            Alert.alert('Pontos insuficientes', 'Você não tem pontos suficientes para este item.');
            return;
        }

        const newPoints = points - item.cost;
        const newHistory = [`${item.name} resgatado`, ...history];
        setPoints(newPoints);
        setHistory(newHistory);
        await AsyncStorage.setItem('userPoints', newPoints.toString());
        await AsyncStorage.setItem('redeemHistory', JSON.stringify(newHistory));
        Alert.alert('Sucesso', `Você resgatou: ${item.name}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seus Pontos</Text>
            <Text style={styles.points}>{points}</Text>
            <TouchableOpacity
                style={[
                    styles.button,
                    lastClaimDate === new Date().toDateString() && styles.buttonDisabled,
                ]}
                onPress={handleClaimPoints}
                disabled={lastClaimDate === new Date().toDateString()}
            >
                <Text style={styles.buttonText}>Resgatar 10 Pontos Diários</Text>
            </TouchableOpacity>

            {countdown ? (
                <>
                    <Text style={styles.timer}>Próximo resgate em: {countdown}</Text>
                    <Text style={styles.checkinInfo}>
                        Faça o check-in diário e ganhe pontos que poderão ser trocados na loja.
                    </Text>
                </>
            ) : null}

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Loja de Recompensas</Text>
            <FlatList
                data={REWARD_ITEMS}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <View style={styles.storeItem}>
                        <View style={styles.imagePlaceholder} />
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemCost}>{item.cost} pontos</Text>
                        <TouchableOpacity
                            style={styles.redeemButton}
                            onPress={() => handleRedeem(item)}
                        >
                            <Text style={styles.redeemButtonText}>Trocar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                scrollEnabled={false}
            />

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Histórico de Trocas</Text>
            {history.length === 0 ? (
                <Text style={styles.historyItem}>Nenhuma troca realizada ainda.</Text>
            ) : (
                history.map((item, index) => (
                    <Text key={index} style={styles.historyItem}>
                        {item}
                    </Text>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    points: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#007AFF',
        textAlign: 'center',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#00bcd4',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 10,
    },
    buttonDisabled: {
        backgroundColor: '#b2ebf2',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    timer: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 4,
    },
    checkinInfo: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#bbb',
        marginVertical: 16,
        marginHorizontal: 10,
        opacity: 0.5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    storeItem: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 4,
        marginVertical: 6,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minHeight: 210,
        justifyContent: 'space-between',
    },
    imagePlaceholder: {
        width: 80,
        height: 80,
        marginBottom: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    itemCost: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    redeemButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    redeemButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    historyItem: {
        fontSize: 14,
        color: '#444',
        marginVertical: 2,
        textAlign: 'center',
    },
});

export default PointsScreen;
