// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { fetchPokemonList, fetchPokemonDetails } from '../api/pokeapi';
import { PokemonCard } from '../components/PokeCard';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const data = await fetchPokemonList(20, offset);
    const detailed = await Promise.all(data.results.map((p: any) => fetchPokemonDetails(p.url)));
    setPokemon(prev => [...prev, ...detailed]);
    setFiltered(prev => [...prev, ...detailed]);
    setOffset(offset + 20);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  const handleSearch = (text: string) => {
    if (!text) return setFiltered(pokemon);
    setFiltered(pokemon.filter(p => p.name.toLowerCase().includes(text.toLowerCase())));
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput placeholder="Search Pokémon" onChangeText={handleSearch} style={{ padding: 10, borderColor: '#ccc', borderWidth: 1, marginBottom: 10 }} />
      <FlashList
        data={filtered}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            image={item.sprites.front_default}
            onPress={() => navigation.navigate('Detail', { pokemon: item })}
          />
        )}
        estimatedItemSize={100}
        onEndReached={loadMore}
        keyExtractor={item => item.name}
      />
      {loading && <ActivityIndicator />}
    </View>
  );
}
