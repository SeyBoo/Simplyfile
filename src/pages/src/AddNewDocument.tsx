import React, {FunctionComponent, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../common/navigation/authRoutes';
import {Box, Button, Center, HStack, Image, Input, Text} from 'native-base';
import ArrowBack from '../../common/assets/icon/arrow-square-left.png';
import AcceptChangeIcon from '../../common/assets/icon/accept-change.png';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../common/hooks/store';
import {addNewDocument} from '../../modules/documents/store/thunks';
import BaseLayout from '../../common/layouts/baseLayout';

export const AddNewDocument: FunctionComponent<
  NativeStackScreenProps<AuthStackParamList, 'AddNewDocument'>
> = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {uri, fileName} = route.params;
  const [name, setName] = useState(fileName);

  const handleUpload = async () => {
    try {
      await dispatch(addNewDocument(name, uri));
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BaseLayout>
      <HStack justifyContent="space-between" px="3%" mb="2.5%">
        <Button
          background="transparent"
          _pressed={{
            opacity: 0.5,
          }}
          onPress={() => navigation.goBack()}>
          <Image source={ArrowBack} alt="Go Back" />
        </Button>
        <Button
          background="transparent"
          _pressed={{
            opacity: 0.5,
          }}
          onPress={() => handleUpload()}>
          <Image source={AcceptChangeIcon} alt="Accept icon" size={7} />
        </Button>
      </HStack>
      <Center>
        <Image
          source={{uri}}
          style={{
            width: '90%',
            height: 400,
            borderRadius: 15,
          }}
          alt={name}
        />
        <Box mt="10" width="90%">
          <Text fontSize="xl" mb="2">
            Name
          </Text>
          <Input
            mx="3"
            autoCorrect={false}
            autoCapitalize="none"
            fontSize="md"
            fontWeight="light"
            borderRadius="lg"
            background="white"
            ml="0"
            p={6}
            borderColor="gray.300"
            defaultValue={name}
            onChangeText={text => setName(text)}
          />
        </Box>
      </Center>
    </BaseLayout>
  );
};
