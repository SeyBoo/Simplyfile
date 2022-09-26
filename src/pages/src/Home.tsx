import React from 'react';
import {Box, Button, HStack, Icon, ScrollView, Text,} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PageLayout from "../../common/layouts/pageLayout";
import DirectoriesList from "../../modules/directories/components/directoriesList";

export function Home() {
  return (
      <PageLayout
          title="Search"
          subtitle="for your files"
      >
        <Box>
          <Text
              fontSize="3xl"
              fontWeight="bold"
              mt={10}
          >
            Directory
          </Text>
          <DirectoriesList />
        </Box>
      </PageLayout>
  );
}
