import React, {FunctionComponent, useEffect} from "react";
import {Box, Button, Center, HStack, Image, Input, ScrollView, Spinner, Text} from "native-base";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthStackParamList} from "../../common/navigation/authRoutes";
import {useAppDispatch, useAppSelector} from "../../common/hooks/store";
import {deleteDocument, fetchDocument} from '../../modules/directories/store/thunks';
import ArrowBack from '../../common/assets/icon/arrow-square-left.png';
import ExportIcon from '../../common/assets/icon/export.png';
import TrashIcon from '../../common/assets/icon/trash.png';
import {useNavigation} from "@react-navigation/native";

export const Document: FunctionComponent<NativeStackScreenProps<AuthStackParamList, 'Document'>> = (
    {
      route,
    }
) => {
  const {uuid, directoryUuid} = route.params;
  const dispatch = useAppDispatch();
  const document = useAppSelector(state => state.directories.document);
  const navigation = useNavigation();

  const handleDeleteDocument = async () => {
    try {
      await dispatch(deleteDocument(uuid, directoryUuid));
      navigation.goBack();
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchDocument(uuid, directoryUuid));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [document?.uuid, dispatch, uuid]);

  if (document === null || document?.uuid !== uuid) {
    return <Spinner/>;
  }
  return (
      <ScrollView
          mt="17.5%"
      >
        <HStack justifyContent="space-between" px="3%" mb="2.5%">
          <Button
              background="transparent"
              _pressed={{
                opacity: .5
              }}
              onPress={() => navigation.goBack()}
          >
            <Image
                source={ArrowBack}
                alt={document.name}
            />
          </Button>
          <HStack>
            <Button
                background="transparent"
                _pressed={{
                  opacity: .5
                }}
            >
              <Image
                  source={ExportIcon}
                  alt={document.name}
              />
            </Button>
            <Button
                background="transparent"
                _pressed={{
                  opacity: .5
                }}
                onPress={() => handleDeleteDocument()}
            >
              <Image
                  source={TrashIcon}
                  alt={document.name}
                  size={7}
              />
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
          <Box
              mt="10"
              width="90%"
          >
            <Text
                fontSize="xl"
                mb="2"
            >
              Name
            </Text>
            <Input
                mx="3"
                value={document.name}
                autoCorrect={false}
                autoCapitalize="none"
                fontSize="md"
                fontWeight="light"
                borderRadius="lg"
                background="white"
                ml="0"
                p={6}
                borderColor="gray.300"
                //   onChangeText={(text) => setNewName(text)}
            />
          </Box>
        </Center>
      </ScrollView>
  )
}

