import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'native-base';

const BaseLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			<ScrollView mt="17.5%">{children}</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default BaseLayout;
