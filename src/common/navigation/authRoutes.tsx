import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../../pages';

interface AuthRoutesProps {
  Stack: createNativeStackNavigator;
}

export function AuthRoutes({Stack}: PropsWithChildren<AuthRoutesProps>) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
