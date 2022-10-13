import React, { FunctionComponent, useCallback, useEffect } from "react";
import { Box, HStack, ScrollView, Text } from "native-base";
import PageLayout from "../../common/layouts/pageLayout";
import DirectoriesList from "../../modules/directories/components/directoriesList";
import { useAppDispatch, useAppSelector } from "../../common/hooks/store";
import { fetchDirectories } from "../../modules/directories/store/thunks";
import { fetchDocuments } from "../../modules/documents/store/thunks";
import DocumentCard from "../../modules/documents/components/documentCard";

export const Home: FunctionComponent = () => {
	const dispatch = useAppDispatch();
	const directories = useAppSelector((state) => state.directories.directories);
	const lastUpdated = useAppSelector((state) => state.documents.lastUpdated);
	const lastUpdatedSorted = lastUpdated
		? [...lastUpdated].sort(
				(a, b) => b.lastUpdate.valueOf() - a.lastUpdate.valueOf()
		  )
		: null;

	const handleFetchLastUpdated = useCallback(async () => {
		try {
			await dispatch(fetchDocuments());
		} catch (e) {
			console.log(e);
		}
	}, [dispatch]);

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
		if (lastUpdated === null) {
			(async () => await handleFetchLastUpdated())();
		}
	}, [handleFetchLastUpdated, lastUpdated, directories, dispatch]);

	return (
		<PageLayout
			title="Search"
			subtitle="for your files"
			refetch={() => handleFetchLastUpdated()}
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
						{lastUpdatedSorted &&
							lastUpdatedSorted.map((document) => (
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
