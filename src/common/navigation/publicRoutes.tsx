import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash} from '../../pages';

interface PublicRoutesProps {
  Stack: createNativeStackNavigator;
}

export function PublicRoutes({Stack}: PropsWithChildren<PublicRoutesProps>) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  );
}
