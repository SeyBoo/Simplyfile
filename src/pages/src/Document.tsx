import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../common/navigation/authRoutes';
import {useAppDispatch, useAppSelector} from '../../common/hooks/store';
import {
  deleteDocument,
  fetchDocument,
  updateDocumentName,
} from '../../modules/documents/store/thunks';
import ArrowBack from '../../common/assets/icon/arrow-square-left.png';
import ExportIcon from '../../common/assets/icon/export.png';
import TrashIcon from '../../common/assets/icon/trash.png';
import AcceptChangeIcon from '../../common/assets/icon/accept-change.png';
import {useNavigation} from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import BaseLayout from '../../common/layouts/baseLayout';

export const Document: FunctionComponent<
  NativeStackScreenProps<AuthStackParamList, 'Document'>
> = ({route}) => {
  const {uuid} = route.params;
  const dispatch = useAppDispatch();
  const document = useAppSelector(state => state.documents.document);
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');

  const handleFetchDocument = useCallback(async () => {
    try {
      await dispatch(fetchDocument(uuid));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, uuid]);

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function handleSaveImage() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    if (document) {
      await CameraRoll.save(document?.image).then(() => {
        Alert.alert('Successfully saved', '', [{text: 'OK'}]);
      });
    }
  }

  const handleDeleteDocument = async () => {
    try {
      await dispatch(deleteDocument(uuid));
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const handleNameChange = async () => {
    try {
      await dispatch(updateDocumentName(uuid, name));
      await handleFetchDocument();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => handleFetchDocument())();
  }, [handleFetchDocument]);

  if (document === null || document?.uuid !== uuid) {
    return <Spinner />;
  }
  return (
    <BaseLayout>
      <HStack justifyContent="space-between" px="3%" mb="2.5%">
        <Button
          background="transparent"
          _pressed={{
            opacity: 0.5,
          }}
          onPress={() => navigation.goBack()}>
          <Image source={ArrowBack} alt={document.name} />
        </Button>
        <HStack>
          {document.name !== name && name !== '' && (
            <Button
              background="transparent"
              _pressed={{
                opacity: 0.5,
              }}
              onPress={() => handleNameChange()}>
              <Image source={AcceptChangeIcon} alt="Accept icon" size={7} />
            </Button>
          )}
          <Button
            background="transparent"
            _pressed={{
              opacity: 0.5,
            }}
            onPress={() => handleSaveImage()}>
            <Image source={ExportIcon} alt="Export icon" />
          </Button>
          <Button
            background="transparent"
            _pressed={{
              opacity: 0.5,
            }}
            onPress={() => handleDeleteDocument()}>
            <Image source={TrashIcon} alt="trash icon" size={7} />
          </Button>
        </HStack>
      </HStack>
      <Center>
        <Image
          source={{uri: document.image}}
          style={{
            width: '90%',
            height: 400,
            borderRadius: 15,
          }}
          alt={document.name}
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
            defaultValue={document.name}
            onChangeText={text => setName(text)}
          />
        </Box>
      </Center>
    </BaseLayout>
  );
};
