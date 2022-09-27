import {FunctionComponent} from "react";
import {Document} from "../../../common/types/documents.interface";
import {Box, Button, HStack, Image, Text, Card, Icon} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from 'moment';
import {ActionSheetIOS, Alert, Platform} from "react-native";
import {removeDirectory, updateDirectory} from "../store/thunks";
import {useNavigation} from "@react-navigation/native";

interface DocumentCardProps {
  document: Document;
}

type Nav = {
  navigate: (value: string, arg1: any) => void;
};

const DocumentCard: FunctionComponent<DocumentCardProps> = (
    {
      document,
    }
) => {
  const navigation = useNavigation<Nav>();
  const {uuid, directory } = document

  return (
      <Button
          background="transparent"
          p={0}
          _pressed={{
            opacity: .5
          }}
          onPress={() => navigation.navigate('Document', {uuid, directoryUuid: directory})}
      >
        <Card
            width="200px"
        >
          <Image
              source={{uri: document.image}}
              borderTopRadius="xl"
              height="175px"
              alt={document.name}
          />
          <Box
              backgroundColor="white"
              borderBottomRadius="xl"
              p={3}
          >
            <HStack
                justifyContent="space-between"
                alignItems="center"
            >
              <Text>
                {moment(document.creationDate).fromNow()}
              </Text>
            </HStack>
            <HStack
                justifyContent="space-between"
                alignItems="center"
                mt={2}
            >
              <Text
                  fontWeight="bold"
                  width="70%"
                  fontSize="lg"
              >
                {document.name}
              </Text>
              <Button
                  background="transparent"
                  width={"1/2"}
                  _pressed={{
                    opacity: .5
                  }}
              >
                <Icon size="6" color="black" as={<MaterialIcons name={document.bookmarked ? 'bookmark' : 'bookmark-border'}/>}/>
              </Button>
            </HStack>
          </Box>
        </Card>
      </Button>
  );
}

export default DocumentCard;
