import React, {
	FunctionComponent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Portal, PortalHost } from "@gorhom/portal";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import CreateIconInActive from "../../common/assets/icon/add.png";
import FileIcon from "../../common/assets/icon/file.png";
import CameraIcon from "../../common/assets/icon/camera.png";
import ScanIcon from "../../common/assets/icon/scan.png";
import ImageIcon from "../../common/assets/icon/image.png";
import {
	Button,
	Center,
	HStack,
	Image,
	Pressable,
	Text,
	VStack,
} from "native-base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
	CameraOptions,
	ImageLibraryOptions,
	ImagePickerResponse,
} from "react-native-image-picker/src/types";
import { useNavigation } from "@react-navigation/native";
import DocumentScanner from "react-native-document-scanner-plugin";

type CreateNav = {
	navigate: (value: string, arg1: { uri: string }) => void;
};

export const Create: FunctionComponent = () => {
	const navigation = useNavigation<CreateNav>();
	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["50%"], []);
	const [showModal, setShowModal] = useState(false);
	const [image, setImage] = useState<ImagePickerResponse>();

	const handleSnapPress = React.useCallback((index: number) => {
		sheetRef.current?.snapToIndex(index);
	}, []);

	const renderBackdrop = React.useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

	const handleCamera = async () => {
		const options: CameraOptions = {
			saveToPhotos: false,
			mediaType: "photo",
			includeBase64: false,
		};
		await launchCamera(options, (response) => setImage(response));
	};

	const handlePhotoLibrary = async () => {
		const options: ImageLibraryOptions = {
			selectionLimit: 0,
			mediaType: "photo",
			includeBase64: false,
			includeExtra: false,
		};
		await launchImageLibrary(options, (response) => setImage(response));
	};

	const scanDocument = async () => {
		const { scannedImages } = await DocumentScanner.scanDocument();

		if (scannedImages && scannedImages.length > 0) {
			const formattedImagePayload: ImagePickerResponse = {
				assets: [
					{
						uri: scannedImages[0],
					},
				],
			};
			setImage(formattedImagePayload);
		}
	};

	useEffect(() => {
		if (!image?.assets) {
			return;
		}
		setShowModal(false);
		navigation.navigate("AddNewDocument", {
			uri: image?.assets[0].uri,
		});
	}, [navigation, image, image?.assets]);

	return (
		<>
			<Button
				background="transparent"
				onPress={() => {
					setShowModal(true);
					handleSnapPress(0);
				}}
			>
				<Image source={CreateIconInActive} alt="#" />
			</Button>
			{showModal === true ? (
				<Portal>
					<BottomSheet
						ref={sheetRef}
						snapPoints={snapPoints}
						backdropComponent={renderBackdrop}
						enablePanDownToClose
					>
						<BottomSheetScrollView>
							<VStack mx="5%" mt={2} pb={10}>
								<Text fontSize="2xl" fontWeight="bold">
									Add to Simplyfile
								</Text>
								<HStack justifyContent="space-between">
									<Button
										width="47.5%"
										background="#F6F8FA"
										mt={8}
										pb={5}
										pt={8}
										borderRadius="lg"
										_pressed={{
											opacity: 0.5,
										}}
										onPress={() => handleCamera()}
									>
										<Center>
											<Image
												source={CameraIcon}
												alt="#"
												width="30px"
												height="30px"
											/>
											<Text
												fontSize="xl"
												fontWeight={600}
												textAlign="center"
												mt={4}
											>
												Take Photo
											</Text>
										</Center>
									</Button>
									<Button
										width="47.5%"
										background="#F6F8FA"
										mt={8}
										pb={5}
										pt={8}
										borderRadius="lg"
										_pressed={{
											opacity: 0.5,
										}}
										onPress={() => scanDocument()}
									>
										<Image
											source={ScanIcon}
											alt="#"
											width="35px"
											height="35px"
											ml={1}
										/>
										<Text
											fontSize="xl"
											fontWeight={600}
											textAlign="center"
											mt={3}
										>
											Scan
										</Text>
									</Button>
								</HStack>
								<Pressable width="100%" onPress={() => handlePhotoLibrary()}>
									{({ isPressed }) => (
										<HStack
											background="#F6F8FA"
											mt="5%"
											px="5%"
											py={5}
											borderTopRadius="lg"
											width="100%"
											alignItems="center"
											justifyContent="space-between"
											opacity={isPressed ? 0.5 : 1}
										>
											<Text fontSize="xl" fontWeight={600} textAlign="center">
												Add from Photo Library
											</Text>
											<Image
												source={ImageIcon}
												alt="#"
												width="25px"
												height="30px"
											/>
										</HStack>
									)}
								</Pressable>
								<Pressable width="100%">
									{({ isPressed }) => (
										<HStack
											background="#F6F8FA"
											px="5%"
											py={5}
											borderBottomRadius="lg"
											width="100%"
											borderTopWidth={1}
											borderTopColor="#E6E6E6"
											alignItems="center"
											justifyContent="space-between"
											opacity={isPressed ? 0.5 : 1}
										>
											<Text fontSize="xl" fontWeight={600} textAlign="center">
												Select existing File
											</Text>
											<Image
												source={FileIcon}
												alt="#"
												width="25px"
												height="30px"
											/>
										</HStack>
									)}
								</Pressable>
							</VStack>
						</BottomSheetScrollView>
					</BottomSheet>
				</Portal>
			) : null}
			<PortalHost name="create_screen_bottom_sheet" />
		</>
	);
};
