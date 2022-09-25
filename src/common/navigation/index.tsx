import React, {useEffect} from 'react';
import {AuthRoutes} from './authRoutes';
import {PublicRoutes} from './publicRoutes';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../hooks/store';

export default function Navigation() {
  const isLoggedIn = useAppSelector(state => state.users.userInfo);
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        {isLoggedIn ? (
            <AuthRoutes Stack={Stack}/>
        ) : (
            <PublicRoutes Stack={Stack}/>
        )}
      </NavigationContainer>
  );
}
