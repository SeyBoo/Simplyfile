import {
  Directory,
  DirectoryMetadata,
} from '../../../common/types/directory.interface';
import {Document} from '../../../common/types/documents.interface';

interface DirectoriesState {
  directories: DirectoryMetadata[] | null;
  currentDirectory: Directory | null;
  document: Document | null;
}

const initialState: DirectoriesState = {
  directories: null,
  currentDirectory: null,
  document: null,
};

export default initialState;
