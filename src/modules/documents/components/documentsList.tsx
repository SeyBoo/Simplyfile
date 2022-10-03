import React, {FunctionComponent} from 'react';
import {Document} from '../../../common/types/documents.interface';
import DocumentCard from './documentCard';
import {HStack} from 'native-base';

interface DocumentsListProps {
  documents: Document[] | null;
  handleFetchDirectory: () => Promise<void>;
}

const DocumentsList: FunctionComponent<DocumentsListProps> = ({
  documents,
  handleFetchDirectory,
}) => {
  if (documents === null) {
    return null;
  }

  return (
    <HStack flexWrap="wrap" ml="-4" pb="30%">
      {documents.map(document => (
        <DocumentCard
          document={document}
          key={document.uuid}
          handleRefetch={handleFetchDirectory}
        />
      ))}
    </HStack>
  );
};

export default DocumentsList;
