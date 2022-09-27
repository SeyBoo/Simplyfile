import {HStack, ScrollView} from 'native-base';
import AddDirectory from './addDirectory';
import DirectoryCard from './directoryCard';
import React, {FunctionComponent} from 'react';
import {Directory} from '../../../common/types/directory.interface';

interface DirectoryListProps {
  directories: Directory[] | null;
}

const DirectoriesList: FunctionComponent<DirectoryListProps> = ({
  directories,
}) => {
  if (directories === null) {
    return null;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} mt={5}>
      <HStack>
        <AddDirectory />
        {directories?.map(directory => (
          <DirectoryCard
            name={directory.name}
            key={directory.uuid}
            uuid={directory.uuid}
          />
        ))}
      </HStack>
    </ScrollView>
  );
};

export default DirectoriesList;
