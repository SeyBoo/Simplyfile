import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash, Register, Login} from '../../pages';

interface PublicRoutesProps {
  Stack: createNativeStackNavigator;
}

export function PublicRoutes({Stack}: PropsWithChildren<PublicRoutesProps>) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
