import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, Platform } from 'react-native';
import  getTypeColor  from '../../../utils/getTypeColor';
import styles from '../ios/styles';

export default function AndroidDetailScreen({ route, navigation }) {
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


