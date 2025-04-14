import { StyleSheet, Platform } from "react-native";

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

  export default styles;