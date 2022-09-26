import React, {PropsWithChildren, FunctionComponent} from 'react';
import {RefreshControl} from 'react-native';
import {Box, ScrollView, Text, VStack} from 'native-base';

interface PageLayoutInterface {
  title: string;
  subtitle?: string;
}

const PageLayout: FunctionComponent<PropsWithChildren<PageLayoutInterface>> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <ScrollView
      pl="10%"
      pt="17.5%"
      background="#F6F6F6"
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => null} />
      }>
      <Box>
        <VStack>
          <Text fontSize="4xl" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="4xl" fontWeight={500} mt="-2">
            {subtitle}
          </Text>
        </VStack>
      </Box>
      {children}
    </ScrollView>
  );
};

export default PageLayout;
