import React, { FunctionComponent } from 'react';
import { Document } from '../../../common/types/documents.interface';
import DocumentCard from './documentCard';
import { HStack } from 'native-base';

interface DocumentsListProps {
  documents: Document[] | null;
  handleFetchDirectory: () => Promise<void>;
  spacing?: string;
}

const DocumentsList: FunctionComponent<DocumentsListProps> = ({
  documents,
  handleFetchDirectory,
  spacing,
}) => {
  if (documents === null) {
    return null;
  }

  return (
    <HStack flexWrap="wrap" justifyContent="space-between" space={spacing}>
      {documents.map((document) => (
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
