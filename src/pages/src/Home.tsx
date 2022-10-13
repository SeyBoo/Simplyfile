import React, { FunctionComponent, useCallback, useEffect } from "react";
import { Box, HStack, ScrollView, Text } from "native-base";
import PageLayout from "../../common/layouts/pageLayout";
import DirectoriesList from "../../modules/directories/components/directoriesList";
import { useAppDispatch, useAppSelector } from "../../common/hooks/store";
import { fetchDirectories } from "../../modules/directories/store/thunks";
import { fetchLastUpdatedDocuments } from "../../modules/documents/store/thunks";
import DocumentCard from "../../modules/documents/components/documentCard";
import CreateNewDirectory from "../../modules/directories/components/createNewDirectory";

export const Home: FunctionComponent = () => {
	const dispatch = useAppDispatch();
	const directories = useAppSelector((state) => state.directories.directories);
	const lastUpdated = useAppSelector((state) => state.documents.lastUpdated);

	const handleFetchLastUpdated = useCallback(async () => {
		try {
			await dispatch(fetchLastUpdatedDocuments());
		} catch (e) {
			console.log(e);
		}
	}, [dispatch]);

	const handleFetchDirectories = useCallback(async () => {
		try {
			await dispatch(fetchDirectories());
		} catch (e) {
			console.log(e);
		}
	}, [dispatch]);

	const handleFetchHomeData = async () => {
		await handleFetchLastUpdated();
		await handleFetchDirectories();
	};

	useEffect(() => {
		async () => handleFetchHomeData();
	}, [handleFetchHomeData]);

	return (
		<PageLayout
			title="Search"
			subtitle="for your files"
			refetch={handleFetchHomeData}
		>
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
				<ScrollView horizontal showsHorizontalScrollIndicator={false} mt={5}>
					<HStack>
						<CreateNewDirectory />
						<DirectoriesList directories={directories} />
					</HStack>
				</ScrollView>
			</Box>
			<Box mt={10} mb="30%">
				<Text fontSize="3xl" fontWeight="bold">
					Last updated
				</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<HStack space="7.5%">
						{lastUpdated &&
							lastUpdated.map((document) => (
								<DocumentCard
									document={document}
									key={document.uuid}
									handleRefetch={handleFetchLastUpdated}
								/>
							))}
					</HStack>
				</ScrollView>
			</Box>
		</PageLayout>
	);
};
