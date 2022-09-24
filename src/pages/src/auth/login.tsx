import React, {useState} from 'react';
import {
  ScrollView,
  HStack,
  Text,
  Center,
  VStack,
  Box,
  Input,
  Button,
  KeyboardAvoidingView,
  Icon,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface LoginProps {
  navigation: any;
}

export function Login({navigation}: LoginProps) {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <ScrollView safeArea backgroundColor="#F6F6F6">
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
            </Box>
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
                <Text fontWeight="bold" color={500}>
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
