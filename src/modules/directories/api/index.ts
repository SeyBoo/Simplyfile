import {Directory, DirectoryMetadata,} from '../../../common/types/directory.interface';

const DIRECTORIES_API_BACKEND_MODULE = 'dummy';

export interface DirectoriesBackend {
  fetchDirectories(): Promise<DirectoryMetadata[]>;

  createDirectory(name: string): Promise<DirectoryMetadata>;

  updateDirectory(uuid: string, name: string): Promise<DirectoryMetadata[]>;

  removeDirectory(uuid: string): Promise<DirectoryMetadata[]>;

  fetchDirectory(uuid: string): Promise<Directory>;
}

let authBackendInstance: DirectoriesBackend | undefined;

export async function getDirectoriesBackend(): Promise<DirectoriesBackend> {
  if (authBackendInstance === undefined) {
    const mod = await import('./backends/' + DIRECTORIES_API_BACKEND_MODULE);
    authBackendInstance = new mod.default() as DirectoriesBackend;
  }
  return authBackendInstance;
}
