import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './state';
import {
  Directory,
  DirectoryMetadata,
} from '../../../common/types/directory.interface';

interface SetDirectoriesPayload {
  directories: DirectoryMetadata[];
}

interface AddNewDirectoryPayload {
  directory: DirectoryMetadata;
}

interface SelectDirectoryPayload {
  directory: Directory;
}

const DirectoriesSlice = createSlice({
  name: 'directories',
  initialState,
  reducers: {
    setDirectories: (state, action: PayloadAction<SetDirectoriesPayload>) => {
      state.directories = action.payload.directories;
    },
    addNewDirectory: (state, action: PayloadAction<AddNewDirectoryPayload>) => {
      if (state.directories !== null) {
        state.directories.push(action.payload.directory);
      }
    },
    setDirectory: (state, action: PayloadAction<SelectDirectoryPayload>) => {
      state.currentDirectory = action.payload.directory;
    },
  },
});

export const {
  setDirectories,
  addNewDirectory,
  setDirectory,
} = DirectoriesSlice.actions;
export default DirectoriesSlice;
