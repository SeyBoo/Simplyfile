import React, {useState} from 'react';
import {
  ScrollView,
  Box,
  Text,
  Center,
  VStack,
  KeyboardAvoidingView,
  Input,
  Icon,
  Button,
  HStack,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface RegisterProps {
  navigation: any;
}

export function Register({navigation}: RegisterProps) {
  const [show, setShow] = useState<boolean>(false);
  const [showConfirm, setshowConfirm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <ScrollView safeArea background="#F6F6F6">
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
                onChangeText={text => setPasswordConfirm(text)}
              />
            </Box>
          </KeyboardAvoidingView>
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
              <Text fontWeight="bold" color={500}>
                Login
              </Text>
            </HStack>
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
}
