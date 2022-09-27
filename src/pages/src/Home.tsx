import React, {useEffect, FunctionComponent} from 'react';
import {Box, Text} from 'native-base';
import PageLayout from '../../common/layouts/pageLayout';
import DirectoriesList from '../../modules/directories/components/directoriesList';
import {useAppDispatch, useAppSelector} from '../../common/hooks/store';
import {fetchDirectories} from '../../modules/directories/store/thunks';

export const Home: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const directories = useAppSelector(state => state.directories.directories);

  useEffect(() => {
    if (directories === null) {
      (async () => {
        try {
          await dispatch(fetchDirectories());
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [directories, dispatch]);

  return (
    <PageLayout title="Search" subtitle="for your files">
      {/*<HStack*/}
      {/*    mt="7.5%"*/}
      {/*>*/}
      {/*  <Input*/}
      {/*      placeholder="Find a file"*/}
      {/*      borderRadius="xl"*/}
      {/*      backgroundColor="white"*/}
      {/*      width="60%"*/}
      {/*      py={3}*/}
      {/*      fontSize="xl"*/}
      {/*      mr="5%"*/}
      {/*      color="light.400"*/}
      {/*      InputLeftElement={<Icon as={<MaterialIcons name="search"/>} color="light.400" size={8} ml={3}/>}*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*      backgroundColor="#E4E4E4"*/}
      {/*      alignItems="center"*/}
      {/*      borderRadius="2xl"*/}
      {/*      px={4}*/}
      {/*      _pressed={{*/}
      {/*        opacity: '.5'*/}
      {/*      }}*/}
      {/*  >*/}
      {/*    <Image*/}
      {/*        source={Filter}*/}
      {/*        width="5"*/}
      {/*        height="7"*/}
      {/*        alt="filter"*/}
      {/*    />*/}
      {/*  </Button>*/}
      {/*</HStack>*/}
      <Box>
        <Text fontSize="3xl" fontWeight="bold" mt={10}>
          Directory
        </Text>
        <DirectoriesList directories={directories} />
      </Box>
      {/*Show the last viewed*/}
      {/*<Box*/}
      {/*    mt={10}*/}
      {/*    mb="30%"*/}
      {/*>*/}
      {/*  <Text*/}
      {/*      fontSize="3xl"*/}
      {/*      fontWeight="bold"*/}
      {/*  >*/}
      {/*    Last wieved*/}
      {/*  </Text>*/}
      {/*  <ScrollView*/}
      {/*      horizontal*/}
      {/*      showsHorizontalScrollIndicator={false}*/}
      {/*  >*/}
      {/*    <HStack*/}
      {/*        ml={-4}*/}
      {/*    >*/}
      {/*    </HStack>*/}
      {/*  </ScrollView>*/}
      {/*</Box>*/}
    </PageLayout>
  );
};
