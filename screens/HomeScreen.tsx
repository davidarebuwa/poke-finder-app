import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokeCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);  // Track the current page
  const [totalPages, setTotalPages] = useState(0);  // Track the total number of pages
  const [loading, setLoading] = useState(true); // Add loading state
  const itemsPerPage = 30;  // Number of items per page
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`) // Fetch a larger pool of Pokémon
      .then((res) => res.json())
      .then(async (data) => {
        const pokemonWithDetails = await Promise.all(
          data.results.map(async (p) => {
            const details = await fetch(p.url).then((r) => r.json());
            return details;
          })
        );
        setPokemonList(pokemonWithDetails);
        setFiltered(pokemonWithDetails);
        setTotalPages(Math.ceil(pokemonWithDetails.length / itemsPerPage));
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    setFiltered(
      pokemonList.filter((p) => p.name.toLowerCase().includes(query))
    );
  }, [search]);

  // Paginate the data
  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

      {/* Show Activity Indicator when loading */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <FlashList
          data={paginateData(filtered)}  // Use paginated data
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
      )}

      {/* Pagination controls */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
          style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}>
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>{currentPage}</Text>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
          style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}>
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  pageButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
