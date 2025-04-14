import React from 'react';
import { View, Text, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import getTypeColor from '../../../utils/getTypeColor';
import styles from './styles';

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

