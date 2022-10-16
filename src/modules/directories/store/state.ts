import {
	Directory,
	DirectoryMetadata,
} from '../../../common/types/directory.interface';

interface DirectoriesState {
	directories: DirectoryMetadata[] | null;
	currentDirectory: Directory | null;
}

const initialState: DirectoriesState = {
	directories: null,
	currentDirectory: null,
};

export default initialState;
