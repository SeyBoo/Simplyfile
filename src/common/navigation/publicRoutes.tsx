import React, { FunctionComponent } from 'react';
import { Splash, Register, Login } from '../../pages';
import { createStackNavigator } from '@react-navigation/stack';

export type PublicStackParamList = {
	Splash: undefined;
	Register: undefined;
	Login: undefined;
};

export const PublicRoutes: FunctionComponent = () => {
	const Stack = createStackNavigator<PublicStackParamList>();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Splash" component={Splash} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
};
