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
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { alignItems: 'center', margin: 10 },
  image: { width: 80, height: 80 },
  name: { marginTop: 5, fontWeight: 'bold' },
});
