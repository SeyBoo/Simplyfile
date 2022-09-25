import React, {FormEvent, useCallback, useState} from 'react';
import {Box, Button, Center, HStack, Icon, Input, KeyboardAvoidingView, ScrollView, Text, VStack,} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {signUpWithEmailPassword} from "../../../modules/auth/store/thunks";
import {InvalidUsernameOrPassword} from "../../../modules/auth/api/error";
import {useAppDispatch} from "../../../common/hooks/store";

interface RegisterProps {
  navigation: any;
}

type Error = 'IUP' | 'NMP' | null;

export function Register({navigation}: RegisterProps) {
  const [show, setShow] = useState<boolean>(false);
  const [showConfirm, setshowConfirm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<Error>(null)

  const dispatch = useAppDispatch();

  const submitForm = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    if (password === passwordConfirm) {
      try {
        await dispatch(signUpWithEmailPassword(email, password));
      } catch (e) {
        if (e instanceof InvalidUsernameOrPassword) {
          setError('IUP');
        }
      }
    } else {
      setError('NMP')
    }

  }, [dispatch, email, password, passwordConfirm]);

  return (
      <ScrollView background="#F6F6F6">
        <Box mt={12}>
          <Text ml="5%" fontSize="3xl" fontWeight="bold">
            Simplyfile
          </Text>
        </Box>
        <Center py={10}>
          <VStack
              borderWidth={2}
              borderRadius="md"
              borderColor="gray.200"
              px={6}
              py={8}
              mb="20%"
              width="90%"
              background="white">
            <Box>
              <Text fontSize="3xl" fontWeight="light">
                Welcome !
              </Text>
              <Box mt="4">
                <Text fontSize="4xl" fontWeight={500}>
                  Sign up to
                </Text>
                <Text fontSize="xl" width="70%">
                  Simplyfile the application that simplify your files
                </Text>
              </Box>
            </Box>
            <KeyboardAvoidingView>
              <Box mt="10">
                <Text fontSize="xl" mb="2">
                  Email
                </Text>
                <Input
                    mx="3"
                    placeholder="Enter your email"
                    autoCorrect={false}
                    autoCapitalize="none"
                    fontSize="md"
                    fontWeight="light"
                    borderRadius="lg"
                    ml="0"
                    p={6}
                    borderColor="gray.300"
                    onChangeText={text => setEmail(text)}
                />
              </Box>
              <Box mt="5">
                <Text fontSize="xl" mb="2">
                  Password
                </Text>
                <Input
                    mx="3"
                    placeholder="Enter your Password"
                    fontSize="md"
                    fontWeight="light"
                    borderColor="gray.300"
                    borderRadius="lg"
                    type={show ? 'text' : 'password'}
                    InputRightElement={
                      <Icon
                          as={
                            <MaterialIcons
                                name={show ? 'visibility' : 'visibility-off'}
                            />
                          }
                          size={5}
                          mr="2"
                          color="muted.400"
                          onPress={() => setShow(!show)}
                      />
                    }
                    ml="0"
                    p={6}
                    onChangeText={text => setPassword(text)}
                />
              </Box>
              <Box mt="5">
                <Text fontSize="xl" mb="2">
                  Confirm Password
                </Text>
                <Input
                    mx="3"
                    placeholder="Confirm your Password"
                    fontSize="md"
                    fontWeight="light"
                    borderColor="gray.300"
                    borderRadius="lg"
                    ml="0"
                    type={showConfirm ? 'text' : 'password'}
                    onChangeText={text => setPasswordConfirm(text)}
                    InputRightElement={
                      <Icon
                          as={
                            <MaterialIcons
                                name={showConfirm ? 'visibility' : 'visibility-off'}
                            />
                          }
                          size={5}
                          mr="2"
                          color="muted.400"
                          onPress={() => setshowConfirm(!showConfirm)}
                      />
                    }
                    p={6}
                />
              </Box>
            </KeyboardAvoidingView>
            <Button
                background="#F4F4F4"
                _pressed={{
                  opacity: '.5',
                }}
                mt={8}
                py={4}
                borderRadius="lg"
                width="100%"
                onPress={(e) => submitForm(e)}
            >
              <Text fontSize="xl" fontWeight={500} textAlign="center">
                Register
              </Text>
            </Button>
            <Button
                textAlign="center"
                mt="8"
                onPress={() => navigation.navigate('Login')}
                fontSize="md"
                color="gray.500"
                background="transparent"
                _pressed={{
                  opacity: '.5',
                }}>
              <HStack>
                <Text>Already have an Account ? </Text>
                <Text fontWeight="bold">
                  Login
                </Text>
              </HStack>
            </Button>
          </VStack>
        </Center>
      </ScrollView>
  );
}
