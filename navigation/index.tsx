import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import DetailScreen from '../screens/details/ios/DetailScreen';
import AndroidDetailScreen from '../screens/details/android/DetailAndroidScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLargeTitle: Platform.OS === 'ios',
          headerStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {backgroundColor: '#fff'},
          headerTransparent: Platform.OS === 'ios',
        }}>
                      <Stack.Screen name="PokeFinder" component={HomeScreen} />

        {Platform.OS === 'ios' ? (
          <>
            <Stack.Screen name="Detail" component={DetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Detail" component={AndroidDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
