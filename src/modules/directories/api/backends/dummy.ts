import {DirectoriesBackend} from '../index';
import {Directory, DirectoryMetadata,} from '../../../../common/types/directory.interface';
import {dummyDirectories, dummyDirectoriesMetadata} from './dummy-data';
import {Document} from "../../../../common/types/documents.interface";
import {InternalError} from "../error";

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

  async fetchDocument(uuid: string, dossierUuid: string): Promise<Document> {
    const selectedDirectory = directories.filter(
        directory => directory.metadata.uuid === dossierUuid,
    );

    if (selectedDirectory !== undefined) {
      if (selectedDirectory[0].documents !== null) {
        const selectedDocument = selectedDirectory[0].documents.filter(
            document => document.uuid === uuid,
        );
        return selectedDocument[0];
      }
    }

    throw new InternalError();
  }

  async deleteDocument(uuid: string, dossierUuid: string): Promise<void> {
    const selectedDirectory = directories.filter(
        directory => directory.metadata.uuid === dossierUuid,
    );

    if (selectedDirectory !== undefined) {
      if (selectedDirectory[0].documents !== null) {
        const directoryDocument = selectedDirectory[0].documents.filter(
            document => document.uuid !== uuid,
        );

        const currentDirectory: Directory = {
          metadata: selectedDirectory[0].metadata,
          documents: directoryDocument,
        }

        const newMetadataArray = directories.filter(directory => directory.metadata.uuid !== dossierUuid);

        directories = newMetadataArray;
        directories.push(currentDirectory);
      }
    }
  }

  async updateDocumentName(uuid: string, dossierUuid: string, name: string): Promise<Document> {
    const selectedDirectory = directories.filter(
        directory => directory.metadata.uuid === dossierUuid,
    );

    if (selectedDirectory !== undefined) {
      if (selectedDirectory[0].documents !== null) {
        const directoryCurrentDocument = selectedDirectory[0].documents.filter(
            document => document.uuid === uuid,
        );

        const directoryDocuments = selectedDirectory[0].documents.filter(
            document => document.uuid != uuid,
        );

        const newDocument: Document = {
          directory: dossierUuid,
          uuid: uuid,
          image: directoryCurrentDocument[0].image,
          name: name,
          bookmarked: directoryCurrentDocument[0].bookmarked,
          creationDate: directoryCurrentDocument[0].creationDate,
        }

        directoryDocuments.push(newDocument)

        const currentDirectory: Directory = {
          metadata: selectedDirectory[0].metadata,
          documents: directoryDocuments,
        }

        const newMetadataArray = directories.filter(directory => directory.metadata.uuid !== dossierUuid);

        directories = newMetadataArray;
        directories.push(currentDirectory);

        return newDocument;
      }
    }

    throw new InternalError();
  }
}
