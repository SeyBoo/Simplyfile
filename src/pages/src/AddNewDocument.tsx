import React, { FunctionComponent, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../common/navigation/authRoutes';
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  Text,
  Select,
  CheckIcon,
} from 'native-base';
import ArrowBack from '../../common/assets/icon/arrow-square-left.png';
import AcceptChangeIcon from '../../common/assets/icon/accept-change.png';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../common/hooks/store';
import { addNewDocument } from '../../modules/documents/store/thunks';
import BaseLayout from '../../common/layouts/baseLayout';
import { fetchDirectories } from '../../modules/directories/store/thunks';

export const AddNewDocument: FunctionComponent<
NativeStackScreenProps<AuthStackParamList, 'AddNewDocument'>
> = ({ route }) => {
  const navigation = useNavigation();
  const { uri } = route.params;
  const dispatch = useAppDispatch();
  const directories = useAppSelector((state) => state.directories.directories);

  const [name, setName] = useState<string>('');
  const [directory, setDirectory] = useState<string>('');


  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchDirectories());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch]);

  const handleUpload = async () => {
    try {
      await dispatch(addNewDocument(name, uri, directory));
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
          onPress={() => navigation.goBack()}
        >
          <Image source={ArrowBack} alt="Go Back" />
        </Button>
        {name !== '' && directory && (
          <Button
            background="transparent"
            _pressed={{
              opacity: 0.5,
            }}
            onPress={() => handleUpload()}
          >
            <Image source={AcceptChangeIcon} alt="Accept icon" size={7} />
          </Button>
        )}
      </HStack>
      <Center pb="10%">
        <Image
          source={{ uri }}
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
            onChangeText={(text) => setName(text)}
          />
        </Box>
        <Box width="90%" mt="5%" pr="2%">
          <Text fontSize="xl" mb="2">
            Directory
          </Text>
          <Select
            selectedValue={directory}
            p={6}
            accessibilityLabel="Choose a directory"
            placeholder="Choose a directory"
            fontSize="md"
            _selectedItem={{
              bg: 'gray.200',
              endIcon: <CheckIcon size="5" color="#000" />,
            }}
            onValueChange={(itemValue) => setDirectory(itemValue)}
          >
            {directories &&
              directories.map((directoryData, index) => (
                <Select.Item
                  key={index}
                  label={directoryData.name}
                  value={directoryData.uuid}
                />
              ))}
          </Select>
        </Box>
      </Center>
    </BaseLayout>
  );
};
