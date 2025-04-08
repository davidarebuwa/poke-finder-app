import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokeCard';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(async data => {
        const pokemonWithDetails = await Promise.all(
          data.results.map(async p => {
            const details = await fetch(p.url).then(r => r.json());
            return details;
          })
        );
        setPokemonList(pokemonWithDetails);
        setFiltered(pokemonWithDetails);
      });
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    setFiltered(
      pokemonList.filter(p => p.name.toLowerCase().includes(query))
    );
  }, [search]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={[styles.searchContainer, { paddingTop: insets.top + 44 }]}>
      <TextInput
          placeholder="Search Pokémon..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <FlashList
        data={filtered}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            image={item.sprites.front_default}
            onPress={() => navigation.navigate('Detail', { pokemon: item })}
          />
        )}
        estimatedItemSize={160}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16, // space for large nav title
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
});
