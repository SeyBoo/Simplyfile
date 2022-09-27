import {DirectoriesBackend} from '../index';
import {Directory, DirectoryMetadata,} from '../../../../common/types/directory.interface';
import {dummyDirectories, dummyDirectoriesMetadata} from './dummy-data';

let directories = dummyDirectories;
let directoriesMetadata = dummyDirectoriesMetadata;

export default class DummyDirectories implements DirectoriesBackend {
  async fetchDirectories(): Promise<DirectoryMetadata[]> {
    return directoriesMetadata;
  }

  async createDirectory(name: string): Promise<DirectoryMetadata> {
    const formattedMetadata = {
      name: name,
      uuid: name,
    };

    const formattedDirectory = {
      metadata: formattedMetadata,
      documents: null,
    }

    directories = [...directories, formattedDirectory];
    directoriesMetadata = [...directoriesMetadata, formattedMetadata]

    return formattedMetadata;
  }

  async updateDirectory(uuid: string, name: string): Promise<DirectoryMetadata[]> {
    const updatedDirectories = directories.map(directory => {
      if (directory.metadata.uuid === uuid) {
        return {
          metadata: {
            name: name,
            uuid: uuid,
          },
          documents: directory.documents,
        };
      }

      return directory;
    });

    const updatedDirectoriesMetadata = directoriesMetadata.map(directory => {
      if (directory.uuid === uuid) {
        return {
          name: name,
          uuid: uuid,
        };
      }

      return directory;
    });

    directories = updatedDirectories;
    directoriesMetadata = updatedDirectoriesMetadata;

    return updatedDirectoriesMetadata;
  }

  async removeDirectory(uuid: string): Promise<DirectoryMetadata[]> {
    const newArrayDirectory = directories.filter(directory => directory.metadata.uuid !== uuid);
    const newMetadataArray = directoriesMetadata.filter(directory => directory.uuid !== uuid);

    directories = newArrayDirectory;
    directoriesMetadata = newMetadataArray;

    return newMetadataArray;
  }

  async fetchDirectory(uuid: string): Promise<Directory> {
    const filteredDirectory = directories.filter(
        directory => directory.metadata.uuid === uuid,
    );
    return filteredDirectory[0];
  }
}
