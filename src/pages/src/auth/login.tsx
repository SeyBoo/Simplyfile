import React, {FormEvent, useCallback, useState} from 'react';
import {Box, Button, Center, HStack, Icon, Input, KeyboardAvoidingView, ScrollView, Text, VStack,} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch} from "../../../common/hooks/store";
import {InvalidUsernameOrPassword} from "../../../modules/auth/api/error";
import {loginWithEmailPassword} from "../../../modules/auth/store/thunks";

interface LoginProps {
  navigation: any;
}

type Error = 'IUP' | null;

export function Login({navigation}: LoginProps) {
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const submitForm = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(loginWithEmailPassword(email, password));
    } catch (e) {
      if (e instanceof InvalidUsernameOrPassword) {
        setError('IUP');
      }
    }
  }, [dispatch, email, password]);

  return (
      <ScrollView backgroundColor="#F6F6F6">
        <KeyboardAvoidingView>
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
                background="white">
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
                    onChangeText={text => setPassword(text)}
                    mx="3"
                    placeholder="Enter your Password"
                    fontSize="md"
                    fontWeight="light"
                    borderColor="gray.300"
                    borderRadius="lg"
                    ml="0"
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
                    p={6}
                />
                <Button
                    alignSelf="flex-end"
                    mr={4}
                    mt={2}
                    fontSize="sm"
                    p={0}
                    background="transparent"
                    _pressed={{
                      opacity: '.5',
                    }}
                    onPress={() => navigation.navigate('Reset')}>
                  <Text color="#4D4D4D">Forgot Password ?</Text>
                </Button>
              </Box>
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
                  Login
                </Text>
              </Button>
              <Button
                  background="transparent"
                  textAlign="center"
                  mt="8"
                  _pressed={{
                    opacity: '.5',
                  }}
                  onPress={() => navigation.navigate('Register')}
                  fontSize="md"
                  color="gray.500">
                <HStack>
                  <Text>Don&rsquo;t have an Account ? </Text>
                  <Text fontWeight="bold">
                    Register
                  </Text>
                </HStack>
              </Button>
            </VStack>
          </Center>
        </KeyboardAvoidingView>
      </ScrollView>
  );
}
