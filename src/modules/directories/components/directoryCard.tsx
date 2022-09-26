import * as React from 'react';
import {Box, Button, HStack, Image, Text,} from 'native-base';
import FolderIcon from '../../../common/assets/icon/folder.png';

interface DirectoryProps {
  name: string;
  uuid: string;
}

const DirectoryCard = (
    {
      name,
      uuid,
    }: DirectoryProps
) => {
  return (
      <Button
          background="transparent"
          p={0}
          _pressed={{
            opacity: .5,
          }}
          onLongPress={() => null}
          onPress={() => null}
      >
        <HStack
            alignItems="center"
            backgroundColor="white"
            p={2}
            borderRadius="lg"
            mr={5}
        >
          <Box
              backgroundColor="#E4E4E4"
              borderRadius="xl"
              p={2}
              alignItems="center"
          >
            <Image
                source={FolderIcon}
                width="31"
                height="31"
                alt="folder"
            />
          </Box>
          <Text
              ml={2}
              fontWeight={400}
              fontSize="22.5px"
          >
            {name}
          </Text>
        </HStack>
      </Button>
  );
}

export default DirectoryCard;
