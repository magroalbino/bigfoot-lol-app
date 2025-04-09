import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  FadeInDown,
} from 'react-native-reanimated';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const founders = [
  { id: '1', name: 'Fabrício Ricard', image: require('../../assets/images/ghibli1.png') },
  { id: '2', name: 'Yan Renat', image: require('../../assets/images/ghibli2.png') },
];

type FounderItemProps = {
  item: { id: string; name: string; image: any };
  index: number;
  onPress: (id: string) => void;
};

const FounderCard: React.FC<FounderItemProps> = ({ item, index, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 200)} style={styles.cardWrapper}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.95))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={() => onPress(item.id)}
        style={styles.founderCard}
      >
        <Animated.Image
          source={item.image}
          style={[styles.founderPhoto, animatedStyle]}
        />
        <Text style={styles.founderName}>{item.name}</Text>
      </Pressable>
    </Animated.View>
  );
};

const LineupScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = (id: string) => {
    navigation.navigate('PlayerDetails', { playerId: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Equipe Fundadora do BIGFOOT Esports 2025</Text>
      <FlatList
        data={founders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <FounderCard item={item} index={index} onPress={handlePress} />
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
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
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardWrapper: {
    width: '100%',
  },
  founderCard: {
    backgroundColor: '#ADD8E6',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  founderPhoto: {
    width: 90, // ⬆️ Aumentado para dar mais destaque
    height: 90,
    borderRadius: 45,
    resizeMode: 'cover',
    marginBottom: 12,
  },
  founderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default LineupScreen;
