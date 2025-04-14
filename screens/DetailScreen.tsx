import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailScreen({ route, navigation }) {
  const { pokemon } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: pokemon.name.toUpperCase(),
      headerLargeTitle: Platform.OS === 'ios',
    });
  }, [navigation, pokemon]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Image */}
        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
        
        {/* Stats Section */}
        <View style={styles.card}>
          <Text style={styles.title}>Stats</Text>
          {pokemon.stats.map(stat => (
            <View key={stat.stat.name} style={styles.statRow}>
              <Text style={styles.statLabel}>{stat.stat.name}</Text>
              <View style={styles.barContainer}>
                <View style={[styles.bar, { width: `${stat.base_stat / 2}%` }]} />
              </View>
              <Text style={styles.statValue}>{stat.base_stat}</Text>
            </View>
          ))}
        </View>

        {/* Abilities Section */}
        <View style={styles.card}>
          <Text style={styles.title}>Abilities</Text>
          {pokemon.abilities.map(ability => (
            <Text key={ability.ability.name} style={styles.abilityText}>
              {ability.ability.name}
            </Text>
          ))}
        </View>

        {/* Types Section */}
        <View style={styles.card}>
          <Text style={styles.title}>Types</Text>
          {pokemon.types.map(type => (
            <View key={type.type.name} style={[styles.typeBadge, { backgroundColor: getTypeColor(type.type.name) }]}>
              <Text style={styles.typeText}>{type.type.name}</Text>
            </View>
          ))}
        </View>

        {/* Height and Weight Section */}
        <View style={styles.card}>
          <Text style={styles.title}>Physical Attributes</Text>
          <Text style={styles.attribute}>Height: {pokemon.height / 10} m</Text>
          <Text style={styles.attribute}>Weight: {pokemon.weight / 10} kg</Text>
        </View>

        {/* Evolution Section */}
        {pokemon.evolution_chain && (
          <View style={styles.card}>
            <Text style={styles.title}>Evolution Chain</Text>
            <TouchableOpacity style={styles.evolutionLink}>
              <Text style={styles.evolutionText}>See Evolution</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Moves Section */}
        <View style={styles.card}>
          <Text style={styles.title}>Moves</Text>
          {pokemon.moves.slice(0, 10).map(move => (
            <Text key={move.move.name} style={styles.moveText}>
              {move.move.name}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 80 : 20, // ⬅️ Important padding top!
  },
  image: { width: 150, height: 150, marginBottom: 20 },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: { width: 90, textTransform: 'capitalize' },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginHorizontal: 8,
  },
  bar: {
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  statValue: { width: 30, textAlign: 'right' },
  abilityText: { fontSize: 16, marginBottom: 5 },
  typeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginVertical: 4,
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  attribute: {
    fontSize: 16,
    marginBottom: 8,
  },
  evolutionLink: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  evolutionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  moveText: {
    fontSize: 16,
    marginVertical: 2,
  },
});

// Utility function to get color based on type
const getTypeColor = (type) => {
  const typeColors = {
    fire: '#F28D00',
    water: '#00A9E0',
    grass: '#6E9C00',
    electric: '#F4E300',
    psychic: '#F24E00',
    // Add more types here
  };
  return typeColors[type] || '#888'; // Default color
};
