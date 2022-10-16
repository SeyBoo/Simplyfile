import React, { FunctionComponent } from 'react';
import {
	Box,
	Button,
	Center,
	HStack,
	Image,
	ScrollView,
	Text,
	VStack,
} from 'native-base';
import IllustrationSplash from '../../../common/assets/splash-illustration.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../../common/navigation/publicRoutes';

export const Splash: FunctionComponent<
	NativeStackScreenProps<PublicStackParamList, 'Splash'>
> = ({ navigation }) => {
	return (
		<ScrollView mb="10%">
			<Center background="#F6F6F6">
				<Image source={IllustrationSplash} alt="Alternate Text" mt="22.5%" />
				<VStack alignItems="center" mt="10">
					<Box alignItems="center">
						<Text fontSize="5xl" fontWeight="bold">
							Easiest files
						</Text>
						<Text fontSize="5xl" fontWeight="bold" mt="-3">
							management
						</Text>
					</Box>
					<Box width="75%">
						<Text fontSize="xl" color="muted.400" mt="2" textAlign="center">
							Bring together all of your files into an easy to use application.
						</Text>
					</Box>
					<HStack
						maxWidth="90%"
						backgroundColor="light.800"
						borderRadius="2xl"
						mt="12"
					>
						<Button
							background="white"
							borderRadius="2xl"
							width="50%"
							_pressed={{
								opacity: '.9',
							}}
							onPress={() => navigation.navigate('Register')}
						>
							<Text fontWeight="bold" fontSize="xl" px={4} py={2}>
								Register
							</Text>
						</Button>
						<Button
							background="light.800"
							borderRadius="2xl"
							width="50%"
							_pressed={{
								opacity: '.2',
							}}
							onPress={() => navigation.navigate('Login')}
						>
							<Text fontWeight="bold" fontSize="xl" color="white" px={4} py={2}>
								Login
							</Text>
						</Button>
					</HStack>
				</VStack>
			</Center>
		</ScrollView>
	);
};
