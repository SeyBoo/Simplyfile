import React from 'react';
import {AuthRoutes} from './authRoutes';
import {PublicRoutes} from './publicRoutes';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function Navigation() {
  const isLoggedIn = true;
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AuthRoutes Stack={Stack} />
      ) : (
        <PublicRoutes Stack={Stack} />
      )}
    </NavigationContainer>
  );
}
