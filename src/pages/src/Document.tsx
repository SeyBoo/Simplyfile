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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../common/navigation/authRoutes';
import { useAppDispatch, useAppSelector } from '../../common/hooks/store';
import {
  deleteDocument,
  fetchDocument,
  updateDocumentName,
} from '../../modules/documents/store/thunks';
import ArrowBack from '../../common/assets/icon/arrow-square-left.png';
import ExportIcon from '../../common/assets/icon/export.png';
import TrashIcon from '../../common/assets/icon/trash.png';
import AcceptChangeIcon from '../../common/assets/icon/accept-change.png';
import { useNavigation } from '@react-navigation/native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Platform } from 'react-native';
import BaseLayout from '../../common/layouts/baseLayout';
import hasAndroidWritePermission from '../../common/utils/getAndroidPermission';
import { useSetAlert } from '../../common/hooks/alert';
import handleDisplayCatchError from '../../common/utils/handleDisplayCatchError';

export const Document: FunctionComponent<
NativeStackScreenProps<AuthStackParamList, 'Document'>
> = ({ route }) => {
  const setAlert = useSetAlert();
  const { uuid } = route.params;
  const dispatch = useAppDispatch();
  const document = useAppSelector((state) => state.documents.document);
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');

  const handleFetchDocument = useCallback(async () => {
    try {
      await dispatch(fetchDocument(uuid));
    } catch (e) {
      handleDisplayCatchError(e, setAlert);
    }
  }, [dispatch, uuid]);

  async function handleSaveImage() {
    if (Platform.OS === 'android' && !(await hasAndroidWritePermission())) {
      return;
    }

    if (document) {
      await CameraRoll.save(document?.image).then(() => {
        setAlert({
          title: 'Successfully saved',
          primmaryButton: 'OK',
        });
      });
    }
  }

  const handleDeleteDocument = async () => {
    try {
      await dispatch(deleteDocument(uuid));
      navigation.goBack();
    } catch (e) {
      handleDisplayCatchError(e, setAlert);
    }
  };

  const handleNameChange = async () => {
    try {
      await dispatch(updateDocumentName(uuid, name));
      await handleFetchDocument();
    } catch (e) {
      handleDisplayCatchError(e, setAlert);
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
          onPress={() => navigation.goBack()}
        >
          <Image source={ArrowBack} alt={document.name} />
        </Button>
        <HStack>
          {document.name !== name && name !== '' && (
            <Button
              background="transparent"
              _pressed={{
                opacity: 0.5,
              }}
              onPress={() => handleNameChange()}
            >
              <Image source={AcceptChangeIcon} alt="Accept icon" size={7} />
            </Button>
          )}
          <Button
            background="transparent"
            _pressed={{
              opacity: 0.5,
            }}
            onPress={() => handleSaveImage()}
          >
            <Image source={ExportIcon} alt="Export icon" />
          </Button>
          <Button
            background="transparent"
            _pressed={{
              opacity: 0.5,
            }}
            onPress={() => handleDeleteDocument()}
          >
            <Image source={TrashIcon} alt="trash icon" size={7} />
          </Button>
        </HStack>
      </HStack>
      <Center>
        <Image
          source={{ uri: document.image }}
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
            onChangeText={(text) => setName(text)}
          />
        </Box>
      </Center>
    </BaseLayout>
  );
};
