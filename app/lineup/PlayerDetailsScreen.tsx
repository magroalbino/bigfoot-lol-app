import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlayerDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalhes do Jogador</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default PlayerDetailsScreen;