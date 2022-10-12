import React, {
	FormEvent,
	FunctionComponent,
	useCallback,
	useState,
} from "react";
import {
	Box,
	Button,
	Center,
	HStack,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	VStack,
} from "native-base";
import { useAppDispatch } from "../../../common/hooks/store";
import { InvalidUsernameOrPassword } from "../../../modules/auth/api/error";
import { loginWithEmailPassword } from "../../../modules/auth/store/thunks";
import FormControl from "../../../common/components/formControl";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PublicStackParamList } from "../../../common/navigation/publicRoutes";
import { Platform } from "react-native";

type Error = "IUP" | null;

export const Login: FunctionComponent<
	NativeStackScreenProps<PublicStackParamList, "Login">
> = ({ navigation }) => {
	const [error, setError] = useState<Error>(null);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const dispatch = useAppDispatch();

	const submitForm = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();

			try {
				await dispatch(loginWithEmailPassword(email, password));
			} catch (e) {
				if (e instanceof InvalidUsernameOrPassword) {
					setError("IUP");
				}
			}
		},
		[dispatch, email, password]
	);

	const getPasswordError = useCallback(() => {
		switch (error) {
			case "IUP":
				return "Invalid email or password";
		}
	}, [error]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView backgroundColor="#F6F6F6">
				<HStack mt={12} alignItems="center" ml="5%">
					<Text fontSize="3xl" fontWeight="bold">
						Simplyfile
					</Text>
				</HStack>
				<Center py={10}>
					<VStack
						borderWidth={2}
						borderRadius="md"
						borderColor="gray.200"
						px={6}
						py={8}
						width="90%"
						background="white"
					>
						<Box>
							<Text fontSize="3xl" fontWeight="light">
								Welcome !
							</Text>
							<Box mt="4">
								<Text fontSize="4xl" fontWeight={500}>
									Sign in to
								</Text>
								<Text fontSize="xl" width="70%">
									Simplyfile the application that simplify your files
								</Text>
							</Box>
						</Box>
						<Box mt="7.5">
							<FormControl
								label="Email"
								onChange={(text) => setEmail(text)}
								required
								placeholder="Enter your email"
							/>
							<FormControl
								label="Password"
								onChange={(text) => setPassword(text)}
								required
								error={getPasswordError()}
								placeholder="Enter your password"
								type="password"
							/>
						</Box>
						{/*<Box mt="5">*/}
						{/*  <Button*/}
						{/*      alignSelf="flex-end"*/}
						{/*      mr={4}*/}
						{/*      mt={2}*/}
						{/*      fontSize="sm"*/}
						{/*      p={0}*/}
						{/*      background="transparent"*/}
						{/*      _pressed={{*/}
						{/*        opacity: '.5',*/}
						{/*      }}*/}
						{/*      onPress={() => navigation.navigate('Reset')}>*/}
						{/*    <Text color="#4D4D4D">Forgot Password ?</Text>*/}
						{/*  </Button>*/}
						{/*</Box>*/}
						<Button
							background="#F4F4F4"
							_pressed={{
								opacity: ".5",
							}}
							mt={8}
							py={4}
							borderRadius="lg"
							width="100%"
							onPress={(e) => submitForm(e)}
						>
							<Text fontSize="xl" fontWeight={500} textAlign="center">
								Login
							</Text>
						</Button>
						<Button
							background="transparent"
							textAlign="center"
							mt="8"
							_pressed={{
								opacity: ".5",
							}}
							onPress={() => navigation.navigate("Register")}
							fontSize="md"
							color="gray.500"
						>
							<HStack>
								<Text>Don&rsquo;t have an Account ? </Text>
								<Text fontWeight="bold">Register</Text>
							</HStack>
						</Button>
					</VStack>
				</Center>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
