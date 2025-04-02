import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Clipboard, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type DonateDetailsScreenRouteProp = RouteProp<RootStackParamList, 'DonateDetails'>;

const DonateDetailsScreen = ({ route }: { route: DonateDetailsScreenRouteProp }) => {
  const { type } = route.params;
  const pixKey = '773f51bf-d4d9-48bc-9b26-812ed63618a8';
  const cryptoAddress = 'nano_3e5w3jwsmi5jeuyuhogcge3ibtehw3w4n79fwm4haf48sj7aenwpwefrotms';

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copiado!', 'O código foi copiado para a área de transferência.');
  };

  return (
    <View style={styles.container}>
      {type === 'PIX' ? (
        <>
          <Text style={styles.text}>Doar via PIX</Text>
          <Image
            source={require('../../assets/images/qrcode-pix.png')}
            style={styles.qrCode}
          />
          <TouchableOpacity style={styles.button} onPress={() => copyToClipboard(pixKey)}>
            <Text style={styles.buttonText}>Copiar Chave PIX</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.text}>Doar via Criptomoeda Nano</Text>
          <Image
            source={require('../../assets/images/qrcode-nano.png')}
            style={styles.qrCode}
          />
          <TouchableOpacity style={styles.button} onPress={() => copyToClipboard(cryptoAddress)}>
            <Text style={styles.buttonText}>Copiar Endereço de Criptomoeda Nano</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default DonateDetailsScreen;