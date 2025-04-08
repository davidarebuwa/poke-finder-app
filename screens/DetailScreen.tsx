import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Platform } from 'react-native';
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
        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
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
});
