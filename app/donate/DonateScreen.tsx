import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default function DonateScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const createAnimatedDonateButton = (
    imageSource: any,
    text: string,
    onPress: () => void,
    delay = 0
  ) => {
    const scale = useSharedValue(1);

    const scaleStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <Animated.View entering={FadeInDown.duration(500).delay(delay)} style={styles.animatedWrapper}>
        <Animated.View style={scaleStyle}>
          <Pressable
            onPressIn={() => (scale.value = withSpring(0.96))}
            onPressOut={() => (scale.value = withSpring(1))}
            onPress={onPress}
            style={styles.button}
          >
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.buttonText}>{text}</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contribua!</Text>

      {createAnimatedDonateButton(
        require('../../assets/images/pix.png'),
        'Doar via PIX',
        () => navigation.navigate('DonateDetails', { type: 'PIX' }),
        200
      )}

      {createAnimatedDonateButton(
        require('../../assets/images/nano.png'),
        'Doar via Criptomoeda Nano',
        () => navigation.navigate('DonateDetails', { type: 'Nano' }),
        400
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  animatedWrapper: {
    width: '80%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    minHeight: 150,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 2,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});
