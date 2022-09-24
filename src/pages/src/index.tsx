import React from 'react';
import {
  Text,
  VStack,
  HStack,
  Button,
  Center,
  Image,
  Box,
  ScrollView,
} from 'native-base';
import IllustrationSplash from '../../common/assets/splash-illustration.png';

interface SplashProps {
  navigation: any;
}

export function Splash({navigation}: SplashProps) {
  return (
    <ScrollView mb="10%">
      <Center background="#F6F6F6">
        <Image source={IllustrationSplash} alt="Alternate Text" mt="22.5%" />
        <VStack alignItems="center" mt="10">
          <Box alignItems="center">
            <Text fontSize="5xl" fontWeight="bold">
              Easiest files
            </Text>
            <Text fontSize="5xl" fontWeight="bold" mt="-3">
              management
            </Text>
          </Box>
          <Box width="75%">
            <Text fontSize="xl" color="muted.400" mt="2" textAlign="center">
              Bring together all of your files into an easy to use application.
            </Text>
          </Box>
          <HStack
            maxWidth="90%"
            backgroundColor="light.800"
            borderRadius="2xl"
            mt="12">
            <Button
              background="white"
              borderRadius="2xl"
              width="50%"
              _pressed={{
                opacity: '.9',
              }}>
              <Text fontWeight="bold" fontSize="xl" px={4} py={2}>
                Register
              </Text>
            </Button>
            <Button
              background="light.800"
              borderRadius="2xl"
              width="50%"
              _pressed={{
                opacity: '.2',
              }}>
              <Text fontWeight="bold" fontSize="xl" color="white" px={4} py={2}>
                Login
              </Text>
            </Button>
          </HStack>
        </VStack>
      </Center>
    </ScrollView>
  );
}
