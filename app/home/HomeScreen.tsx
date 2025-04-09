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
  FadeIn,
  FadeInDown,
  useSharedValue,
  withSpring,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pulse = useSharedValue(1);
  const logoGlow = useSharedValue(0);

  React.useEffect(() => {
    pulse.value = withRepeat(withTiming(1.1, { duration: 800 }), -1, true);
    logoGlow.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
  }, []);

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const logoGlowStyle = useAnimatedStyle(() => ({
    opacity: 0.9 + logoGlow.value * 0.1,
    transform: [{ scale: 1 + logoGlow.value * 0.05 }],
  }));

  const createAnimatedButton = (
    text: string,
    onPress: () => void,
    color = '#007AFF',
    delay = 0
  ) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <Animated.View
        style={{ width: '100%' }}
        entering={FadeInDown.duration(400).delay(delay)}
      >
        <Animated.View style={[styles.animatedButtonContainer, animatedStyle]}>
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
      {/* ❄️ Fundo com nevasca */}
      <LottieView
        source={require('../../assets/animations/snowfall.json')}
        autoPlay
        loop
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeIn.duration(800)} style={styles.logoContainer}>
          <Animated.View style={[styles.logoWrapper, logoGlowStyle]}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
          </Animated.View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(200)}>
          <Pressable onPress={() => navigation.navigate('Lineup')}>
            <Text style={styles.title}>BIGFOOT Esports</Text>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <Text style={styles.subtitle}>
            Bem-vindo ao nosso aplicativo! Fique ligado nas próximas atualizações e colabore com o projeto no GitHub!
          </Text>
        </Animated.View>

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
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoWrapper: {
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 8,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
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
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});
