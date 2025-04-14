import { StyleSheet } from "react-native";

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

  export default styles;