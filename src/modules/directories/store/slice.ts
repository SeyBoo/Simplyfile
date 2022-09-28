import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './state';
import {Directory, DirectoryMetadata} from '../../../common/types/directory.interface';
import {Document} from "../../../common/types/documents.interface";

interface SetDirectoriesPayload {
  directories: DirectoryMetadata[];
}

interface AddNewDirectoryPayload {
  directory: DirectoryMetadata;
}

interface SelectDirectoryPayload {
  directory: Directory;
}

interface setDocumentPayload {
  document: Document;
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
    setDocument: (state, action: PayloadAction<setDocumentPayload>) => {
      state.document = action.payload.document;
    },
    resetDocument: (state) => {
      state.document = null;
    }
  },
});

export const {setDirectories, addNewDirectory, setDirectory, setDocument, resetDocument} =
    DirectoriesSlice.actions;
export default DirectoriesSlice;
