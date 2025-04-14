import { StyleSheet, Platform } from "react-native";
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

  export default styles;
