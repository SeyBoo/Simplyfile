import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'native-base';
import HomeActive from '../assets/bottom-tabs/active/home.png';
import HomeInActive from '../assets/bottom-tabs/inactive/home.png';
import {Home} from '../../pages';

export function AuthRoutes() {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 100,
            },
          }}
      >
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({focused}) => (
                  focused
                      ? <Image source={HomeActive} alt={"home active"}/>
                      : <Image source={HomeInActive} alt={"home inactive"}/>
              ),
              headerShown: false,
            }}
        />
      </Tab.Navigator>
  );
}
