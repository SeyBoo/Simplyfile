import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useState,
} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {signUpWithEmailPassword} from '../../../modules/auth/store/thunks';
import {InvalidUsernameOrPassword} from '../../../modules/auth/api/error';
import {useAppDispatch} from '../../../common/hooks/store';
import FormControl from '../../../common/components/formControl';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicStackParamList} from '../../../common/navigation/publicRoutes';
import {Platform} from 'react-native';

type Error = 'IUP' | 'NMP' | null;

export const Register: FunctionComponent<
  NativeStackScreenProps<PublicStackParamList, 'Register'>
> = ({navigation}) => {
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<Error>(null);

  const dispatch = useAppDispatch();

  const submitForm = useCallback(
    async (event: FormEvent) => {
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
        setError('NMP');
      }
    },
    [dispatch, email, password, passwordConfirm],
  );

  const getPasswordError = useCallback(() => {
    switch (error) {
      case 'IUP':
        return 'Invalid email or password';
      case 'NMP':
        return "Password doesn't match";
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
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
              <Box mt={2.5}>
                <FormControl
                  required
                  label="Email"
                  placeholder={'Enter your email'}
                  onChange={text => setEmail(text)}
                />
                <FormControl
                  required
                  label="Password"
                  placeholder={'Enter your password'}
                  onChange={text => setPassword(text)}
                  type="password"
                />
                <FormControl
                  required
                  label="Confirm password"
                  placeholder={'Confirm your password'}
                  onChange={text => setPasswordConfirm(text)}
                  error={getPasswordError()}
                  type="password"
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
              onPress={e => submitForm(e)}>
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
                <Text fontWeight="bold">Login</Text>
              </HStack>
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
