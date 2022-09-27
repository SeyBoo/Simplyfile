import React, {FunctionComponent, useEffect} from "react";
import {Box, Center, Image, Input, ScrollView, Spinner, Text} from "native-base";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthStackParamList} from "../../common/navigation/authRoutes";
import {useAppDispatch, useAppSelector} from "../../common/hooks/store";
import {fetchDocument} from '../../modules/document/store/thunks';

export const Document: FunctionComponent<NativeStackScreenProps<AuthStackParamList, 'Document'>> = (
    {
      route,
    }
) => {
  const {uuid, directoryUuid} = route.params;
  const dispatch = useAppDispatch();
  const document = useAppSelector(state => state.document.document);

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

