import React, {FunctionComponent} from 'react';
import {Portal, PortalHost} from '@gorhom/portal';
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import CreateIconInActive from '../../common/assets/icon/add.png';
import FileIcon from '../../common/assets/icon/file.png';
import CameraIcon from '../../common/assets/icon/camera.png';
import ScanIcon from '../../common/assets/icon/scan.png';
import ImageIcon from '../../common/assets/icon/image.png';
import {Button, Center, HStack, Image, Pressable, Text, VStack} from "native-base";

export const Create: FunctionComponent = () => {
  const navigation = useNavigation();
  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['50%'], []);
  const [loaded, setLoaded] = React.useState(true);

  const handleSnapPress = React.useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const renderBackdrop = React.useCallback(
      (props: any) => (
          <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
          />
      ),
      [],
  );

  return (
      <>
        <Button
            background="transparent"
            onPress={() => {
              setLoaded(true);
              handleSnapPress(0);
            }}
        >
          <Image source={CreateIconInActive} alt="#"/>
        </Button>
        {loaded === true
            ? (
                <Portal>
                  <BottomSheet
                      ref={sheetRef}
                      snapPoints={snapPoints}
                      backdropComponent={renderBackdrop}
                      enablePanDownToClose
                  >
                    <BottomSheetScrollView>
                      <VStack
                          mx="5%"
                          mt={2}
                          pb={10}
                      >
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                        >
                          Add to Simplyfile
                        </Text>
                        <HStack
                            justifyContent="space-between"
                        >
                          <Button
                              width="47.5%"
                              background='#F6F8FA'
                              mt={8}
                              pb={5}
                              pt={8}
                              borderRadius="lg"
                              _pressed={{
                                opacity: .5,
                              }}
                          >
                            <Center>
                              <Image
                                  source={CameraIcon}
                                  alt="#"
                                  width="30px"
                                  height="30px"
                              />
                              <Text
                                  fontSize="xl"
                                  fontWeight={600}
                                  textAlign="center"
                                  mt={4}
                              >
                                Take Photo
                              </Text>
                            </Center>
                          </Button>
                          <Button
                              width="47.5%"
                              background='#F6F8FA'
                              mt={8}
                              pb={5}
                              pt={8}
                              borderRadius="lg"
                              _pressed={{
                                opacity: .5,
                              }}
                          >

                            <Image
                                source={ScanIcon}
                                alt="#"
                                width="35px"
                                height="35px"
                                ml={1}
                            />
                            <Text
                                fontSize="xl"
                                fontWeight={600}
                                textAlign="center"
                                mt={3}
                            >
                              Scan
                            </Text>
                          </Button>
                        </HStack>
                        <Pressable
                            width="100%"
                        >
                          {({
                              isPressed,
                            }) => (
                              <HStack
                                  background='#F6F8FA'
                                  mt="5%"
                                  px="5%"
                                  py={5}
                                  borderTopRadius="lg"
                                  width="100%"
                                  alignItems="center"
                                  justifyContent="space-between"
                                  opacity={isPressed ? .5 : 1}
                              >
                                <Text
                                    fontSize="xl"
                                    fontWeight={600}
                                    textAlign="center"
                                >
                                  Add from Photo Library
                                </Text>
                                <Image
                                    source={ImageIcon}
                                    alt="#"
                                    width="25px"
                                    height="30px"
                                />
                              </HStack>
                          )}
                        </Pressable>
                        <Pressable
                            width="100%"
                        >
                          {({
                              isPressed,
                            }) => (
                              <HStack
                                  background='#F6F8FA'
                                  px="5%"
                                  py={5}
                                  borderBottomRadius="lg"
                                  width="100%"
                                  borderTopWidth={1}
                                  borderTopColor="#E6E6E6"
                                  alignItems="center"
                                  justifyContent="space-between"
                                  opacity={isPressed ? .5 : 1}
                              >
                                <Text
                                    fontSize="xl"
                                    fontWeight={600}
                                    textAlign="center"
                                >
                                  Select existing File
                                </Text>
                                <Image
                                    source={FileIcon}
                                    alt="#"
                                    width="25px"
                                    height="30px"
                                />
                              </HStack>
                          )}
                        </Pressable>
                    </VStack>
                  </BottomSheetScrollView>
                </BottomSheet>
          </Portal>
          )
          : null}
        <PortalHost name="create_screen_bottom_sheet"/>
      </>
  );
}
