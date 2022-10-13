import { Alert, Platform } from "react-native";
import { Box, Button, HStack, Icon, Text } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { FunctionComponent } from "react";
import { useAppDispatch } from "../../../common/hooks/store";
import { createDirectory } from "../store/thunks";

const CreateNewDirectory: FunctionComponent = () => {
	const dispatch = useAppDispatch();

	const handleAddNewDirectory = async (name: string) => {
		try {
			await dispatch(createDirectory(name));
		} catch (e) {
			console.log(e);
		}
	};

	const handlePress = () => {
		if (Platform.OS === "ios") {
			Alert.prompt(
				"Add New Directory",
				"",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Add",
						onPress: (text) => {
							if (text) {
								handleAddNewDirectory(text).then(() => {
									return;
								});
							}
						},
					},
				],
				"plain-text"
			);
		}
		// TODO Android
	};

	return (
		<Button
			alignItems="center"
			backgroundColor="white"
			p={2}
			pr={4}
			borderRadius="lg"
			mr={5}
			_pressed={{
				opacity: ".5",
			}}
			onPress={() => handlePress()}
		>
			<HStack alignItems="center">
				<Box backgroundColor="#E4E4E4" borderRadius="xl" p={2}>
					<Icon as={<MaterialIcons name="add" />} color="black" size={7} />
				</Box>
				<Text ml={2} fontWeight={400} fontSize="22.5px">
					Add
				</Text>
			</HStack>
		</Button>
	);
};

export default CreateNewDirectory;
