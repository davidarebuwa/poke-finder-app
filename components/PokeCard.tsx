// src/components/PokemonCard.tsx
import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  name: string;
  image: string;
  onPress: () => void;
}

export const PokemonCard: React.FC<Props> = ({ name, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={{ uri: image }} style={styles.image}  testID="pokemon-image"/>
    <Text style={styles.name}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
      flex: 1,
      margin: 8,
      padding: 12,
      backgroundColor: '#fff',
      borderRadius: 12,
      alignItems: 'center',
      // iOS Shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      // Android Elevation
      elevation: 4,
    },
    image: { width: 80, height: 80, marginBottom: 8 },
    name: { fontWeight: 'bold', fontSize: 16, textTransform: 'capitalize' },
  });
