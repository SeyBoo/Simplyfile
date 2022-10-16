import React from 'react';
import { AuthRoutes } from './authRoutes';
import { PublicRoutes } from './publicRoutes';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../hooks/store';

export default function Navigation() {
	const isLoggedIn = useAppSelector((state) => state.users.userInfo);

	return (
		<NavigationContainer>
			{isLoggedIn ? <AuthRoutes /> : <PublicRoutes />}
		</NavigationContainer>
	);
}
