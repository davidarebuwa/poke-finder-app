import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Platform } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { pokemon } = route.params || {};

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: pokemon?.name?.toUpperCase?.() || 'Detail',
      headerLargeTitle: Platform.OS === 'ios',
    });
  }, [navigation, pokemon]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Name */}
        <Text style={styles.name}>
          {pokemon?.name ? pokemon.name.toUpperCase() : 'Unknown Pokémon'}
        </Text>

        {/* Image */}
        {pokemon?.sprites?.front_default && (
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.image}
            resizeMode="contain"
          />
        )}

        {/* Types */}
        {pokemon?.types?.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.title}>Types</Text>
            <View style={styles.row}>
              {pokemon.types.map((t) => (
                <View
                  key={t.type.name}
                  style={[styles.typeBadge, { backgroundColor: getTypeColor(t.type.name) }]}
                >
                  <Text style={styles.typeText}>{t.type.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Base Stats */}
        {pokemon?.stats?.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.title}>Stats</Text>
            {pokemon.stats.map((s) => (
              <View key={s.stat.name} style={styles.statRow}>
                <Text style={styles.statLabel}>{s.stat.name}</Text>
                <Text style={styles.statValue}>{s.base_stat}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { alignItems: 'center', padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  image: { width: 150, height: 150, marginBottom: 20 },

  card: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },

  row: { flexDirection: 'row', flexWrap: 'wrap' },

  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  typeText: { color: '#fff', fontWeight: 'bold' },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  statLabel: { textTransform: 'capitalize' },
  statValue: { fontWeight: 'bold' },
});

// Utility: get background color for each type
const getTypeColor = (type) => {
  const colors = {
    fire: '#f08030',
    water: '#6890f0',
    grass: '#78c850',
    electric: '#f8d030',
    psychic: '#f85888',
    ice: '#98d8d8',
    dragon: '#7038f8',
    dark: '#705848',
    fairy: '#ee99ac',
    normal: '#a8a878',
    // Add more as needed
  };
  return colors[type] || '#ccc';
};
