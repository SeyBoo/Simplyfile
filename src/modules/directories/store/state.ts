import {
  Directory,
  DirectoryMetadata,
} from '../../../common/types/directory.interface';
import {Document} from '../../../common/types/documents.interface';

interface DirectoriesState {
  directories: DirectoryMetadata[] | null;
  currentDirectory: Directory | null;
}

const initialState: DirectoriesState = {
  directories: null,
  currentDirectory: null,
};

export default initialState;
