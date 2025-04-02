import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const DonateScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contribua!</Text>
      <TouchableOpacity
        style={[styles.button, styles.donateButton]}
        onPress={() => navigation.navigate('DonateDetails', { type: 'PIX' })}
      >
        <Image
          source={require('../../assets/images/pix.png')}
          style={styles.image}
        />
        <Text style={styles.buttonText}>Doar via PIX</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.donateButton]}
        onPress={() => navigation.navigate('DonateDetails', { type: 'Nano' })}
      >
        <Image
          source={require('../../assets/images/nano.png')}
          style={styles.image}
        />
        <Text style={styles.buttonText}>Doar via Criptomoeda Nano</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '80%',
    minHeight: 150,
  },
  donateButton: {
    marginTop: 40,
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

export default DonateScreen;