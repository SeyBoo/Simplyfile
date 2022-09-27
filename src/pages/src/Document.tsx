import React, {FunctionComponent, useEffect, useState} from "react";
import {Box, Button, Center, HStack, Image, Input, ScrollView, Spinner, Text} from "native-base";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthStackParamList} from "../../common/navigation/authRoutes";
import {useAppDispatch, useAppSelector} from "../../common/hooks/store";
import {deleteDocument, fetchDocument} from '../../modules/directories/store/thunks';
import ArrowBack from '../../common/assets/icon/arrow-square-left.png';
import ExportIcon from '../../common/assets/icon/export.png';
import TrashIcon from '../../common/assets/icon/trash.png';
import AcceptChangeIcon from '../../common/assets/icon/accept-change.png';
import {useNavigation} from "@react-navigation/native";
import {setDocument} from "../../modules/directories/store/slice";

export const Document: FunctionComponent<NativeStackScreenProps<AuthStackParamList, 'Document'>> = (
    {
      route,
    }
) => {
  const {uuid, directoryUuid} = route.params;
  const dispatch = useAppDispatch();
  const document = useAppSelector(state => state.directories.document);
  const navigation = useNavigation();

  const handleFetchDocument = async () => {
    try {
      await dispatch(fetchDocument(uuid, directoryUuid));
    } catch (e) {
      console.log(e);
    }
  }

  const handleDeleteDocument = async () => {
    try {
      await dispatch(deleteDocument(uuid, directoryUuid));
      navigation.goBack();
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async() => handleFetchDocument())()
  }, [handleFetchDocument]);

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
            {<Button
                background="transparent"
                _pressed={{
                  opacity: .5
                }}
                onPress={() => handleNameChange()}
            >
              <Image
                  source={AcceptChangeIcon}
                  alt="Accept icon"
                  size={7}
              />
            </Button>}
            <Button
                background="transparent"
                _pressed={{
                  opacity: .5
                }}
            >
              <Image
                  source={ExportIcon}
                  alt="Export icon"
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
                  alt="trash icon"
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
            />
          </Box>
        </Center>
      </ScrollView>
  )
}

