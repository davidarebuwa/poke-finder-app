import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokeCard';
import { fetchPokemonList } from '../api/pokeapi';

export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=30');
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const fetchMorePokemons = useCallback(async () => {
    if (!nextUrl || loading) return;

    setLoading(true);
    try {
      const { pokemon, next } = await fetchPokemonList(nextUrl);

      setPokemonList((prev) => {
        const existingNames = new Set(prev.map((p) => p.name));
        const newUnique = pokemon.filter((p) => !existingNames.has(p.name));
        return [...prev, ...newUnique];
      });

      setNextUrl(next);
    } catch (error) {
      console.warn('Failed to fetch Pokémon list:', error);
    } finally {
      setLoading(false);
    }
  }, [nextUrl, loading]);

  useEffect(() => {
    fetchMorePokemons();
  }, []);

  const filteredList = search
    ? pokemonList.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : pokemonList;

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? insets.top + 10 : 0 }}>
      <View
        style={[
          styles.searchContainer,
          { paddingTop: Platform.OS === 'android' ? 0 : insets.top + 104 },
        ]}
      >
        <TextInput
          placeholder="Search Pokémon..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <FlashList
        data={filteredList}
        keyExtractor={(item, index) => item?.name ?? `item-${index}`}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            image={item.sprites?.front_default}
            onPress={() => navigation.navigate('Detail', { pokemon: item })}
          />
        )}
        estimatedItemSize={160}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        onEndReached={fetchMorePokemons}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#007bff" />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  input: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  loader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
