import React, { FunctionComponent } from "react";
import { Box, Button, HStack, Image, Text } from "native-base";
import { ActionSheetIOS, Alert, Platform } from "react-native";
import FolderIcon from "../../../common/assets/icon/folder.png";
import { removeDirectory, updateDirectory } from "../store/thunks";
import { useAppDispatch } from "../../../common/hooks/store";
import { useNavigation } from "@react-navigation/native";

interface DirectoryProps {
	name: string;
	uuid: string;
}

type DirectoryNav = {
	navigate: (value: string, arg1: string[]) => void;
};

const DirectoryCard: FunctionComponent<DirectoryProps> = ({ name, uuid }) => {
	const navigation = useNavigation<DirectoryNav>();
	const dispatch = useAppDispatch();

	const handleRenameModal = () => {
		if (Platform.OS === "ios") {
			Alert.prompt(
				`Update ${name}`,
				"",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Update",
						onPress: (text) => {
							if (text) {
								(async () => await dispatch(updateDirectory(uuid, text)))();
							}
						},
					},
				],
				"plain-text"
			);
		}
		// TODO Android
	};

	const handleLongPress = () => {
		if (Platform.OS === "ios") {
			ActionSheetIOS.showActionSheetWithOptions(
				{
					options: ["Cancel", "Rename", "Delete"],
					destructiveButtonIndex: 2,
					cancelButtonIndex: 0,
					userInterfaceStyle: "dark",
				},
				(buttonIndex) => {
					if (buttonIndex === 1) {
						handleRenameModal();
					} else if (buttonIndex === 2) {
						(async () => await dispatch(removeDirectory(uuid)))();
					}
				}
			);
		}
		//TODO Android
	};

	return (
		<Button
			background="transparent"
			p={0}
			_pressed={{
				opacity: 0.5,
			}}
			onLongPress={() => handleLongPress()}
			onPress={() => navigation.navigate("Directory", { name, uuid })}
		>
			<HStack
				alignItems="center"
				backgroundColor="white"
				p={2}
				borderRadius="lg"
				mr={5}
			>
				<Box
					backgroundColor="#E4E4E4"
					borderRadius="xl"
					p={2}
					alignItems="center"
				>
					<Image source={FolderIcon} width="31" height="31" alt="folder" />
				</Box>
				<Text ml={2} fontWeight={400} fontSize="22.5px">
					{name}
				</Text>
			</HStack>
		</Button>
	);
};

export default DirectoryCard;
