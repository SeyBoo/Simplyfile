import React, { FunctionComponent } from 'react';
import { Box, Button, HStack, Image, Text } from 'native-base';
import FolderIcon from '../../../common/assets/icon/folder.png';
import { removeDirectory, updateDirectory } from '../store/thunks';
import { useAppDispatch } from '../../../common/hooks/store';
import { useNavigation } from '@react-navigation/native';
import { useSetAlertPrompt } from '../../../common/hooks/alertPrompt';
import { useActionSheet } from '@expo/react-native-action-sheet';
import handleDisplayCatchError from '../../../common/utils/handleDisplayCatchError';
import { useSetAlert } from '../../../common/hooks/alert';

interface DirectoryProps {
  name: string;
  uuid: string;
}

type DirectoryNav = {
  navigate: (value: string, arg1: { name: string; uuid: string }) => void;
};

const DirectoryCard: FunctionComponent<DirectoryProps> = ({ name, uuid }) => {
  const navigation = useNavigation<DirectoryNav>();
  const dispatch = useAppDispatch();
  const setAlertPrompt = useSetAlertPrompt();
  const setAlert = useSetAlert();
  const { showActionSheetWithOptions } = useActionSheet();

  const handleUpdateDirectory = async (text: string) => {
    try {
      await dispatch(updateDirectory(uuid, text));
    } catch (e) {
      handleDisplayCatchError(e, setAlert);
    }
  };

  const handleRenameModal = () => {
    setAlertPrompt({
      message: `Update ${name}`,
      action: {
        f: handleUpdateDirectory,
        name: 'Update',
      },
    });
  };

  const handleLongPress = () => {
    const options = ['Cancel', 'Rename', 'Delete'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 0;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      async (selectedIndex: number) => {
        switch (selectedIndex) {
          case 1:
            handleRenameModal();
            break;

          case destructiveButtonIndex:
            await dispatch(removeDirectory(uuid));
            break;

        }
      }
    );
  };

  return (
    <Button
      background="transparent"
      p={0}
      _pressed={{
        opacity: 0.5,
      }}
      onLongPress={() => handleLongPress()}
      onPress={() => navigation.navigate('Directory', { name, uuid })}
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
          <Image source={FolderIcon} width="31" height="31" alt="folder" />
        </Box>
        <Text ml={2} fontWeight={400} fontSize="22.5px">
          {name}
        </Text>
      </HStack>
    </Button>
  );
};

export default DirectoryCard;
