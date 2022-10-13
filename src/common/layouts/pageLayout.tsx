import React, { PropsWithChildren, FunctionComponent } from "react";
import { KeyboardAvoidingView, Platform, RefreshControl } from "react-native";
import { Box, ScrollView, Text, VStack } from "native-base";

interface PageLayoutInterface {
	title: string;
	subtitle?: string;
	refetch: () => Promise<void>;
}

const PageLayout: FunctionComponent<PropsWithChildren<PageLayoutInterface>> = ({
	title,
	subtitle,
	children,
	refetch,
}) => {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView
				pt="17.5%"
				pr="5%"
				pl="5%"
				background="#F6F6F6"
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={async () => refetch()}
					/>
				}
			>
				<Box>
					<VStack>
						<Text fontSize="4xl" fontWeight="bold">
							{title}
						</Text>
						<Text fontSize="4xl" fontWeight={500} mt="-2">
							{subtitle}
						</Text>
					</VStack>
				</Box>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default PageLayout;
