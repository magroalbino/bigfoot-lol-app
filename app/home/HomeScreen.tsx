import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import Animated, {
  FadeInDown,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pulse = useSharedValue(1);
  React.useEffect(() => {
    pulse.value = withRepeat(withTiming(1.1, { duration: 800 }), -1, true);
  }, []);

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const createAnimatedButton = (
    text: string,
    onPress: () => void,
    color = '#007AFF',
    delay = 0
  ) => {
    const scale = useSharedValue(1);

    const animatedScaleStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <Animated.View
        style={{ width: '100%' }}
        entering={FadeInDown.duration(400).delay(delay)}
      >
        <Animated.View style={[styles.animatedButtonContainer, animatedScaleStyle]}>
          <Pressable
            onPressIn={() => (scale.value = withSpring(0.95))}
            onPressOut={() => (scale.value = withSpring(1))}
            onPress={onPress}
            style={[styles.menuButton, { backgroundColor: color }]}
          >
            <Text
              style={[
                styles.menuButtonText,
                color === '#FFCA28' ? { color: '#000' } : { color: '#fff' },
              ]}
            >
              {text}
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(200)}>
          <Text style={styles.title}>BIGFOOT Esports</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <Text style={styles.subtitle}>
            Bem-vindo ao nosso aplicativo! Fique ligado nas próximas atualizações e colabore com o projeto no GitHub!
          </Text>
        </Animated.View>

        {/* Botões com animação escalonada */}
        {createAnimatedButton('Notícias', () => navigation.navigate('News'), '#007AFF', 600)}
        {createAnimatedButton('Line-up', () => navigation.navigate('Lineup'), '#007AFF', 800)}
        {createAnimatedButton('Próximos Jogos', () => navigation.navigate('Games'), '#007AFF', 1000)}
        {createAnimatedButton('Contribua!', () => navigation.navigate('Donate'), '#FFCA28', 1200)}
      </ScrollView>

      <Animated.View entering={FadeInDown.duration(600).delay(1400)}>
        <Animated.View style={[styles.fab, fabStyle]}>
          <Pressable onPress={() => navigation.navigate('PointsScreen')}>
            <Icon name="star" size={22} color="#fff" />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
  },
  animatedButtonContainer: {
    width: '100%',
    marginVertical: 8,
  },
  menuButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});
