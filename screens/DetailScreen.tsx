// src/screens/DetailScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
      <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
      {pokemon.stats.map(stat => (
        <Text key={stat.stat.name} style={styles.stat}>
          {stat.stat.name}: {stat.base_stat}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  image: { width: 150, height: 150 },
  name: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  stat: { fontSize: 16 },
});
