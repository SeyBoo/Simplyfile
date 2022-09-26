import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialState from "./state";
import {Directory} from "../../../common/types/directory.interface";

interface SetDirectoriesPayload {
  directories: Directory[];
}

interface AddNewDirectoryPayload {
  directory: Directory;
}

const DirectoriesSlice = createSlice({
  name: "directories",
  initialState,
  reducers: {
    setDirectories: (state, action: PayloadAction<SetDirectoriesPayload>) => {
      state.directories = action.payload.directories;
    },
    addNewDirectory: (state, action: PayloadAction<AddNewDirectoryPayload>) => {
      if (state.directories !== null)
      state.directories.push(action.payload.directory)
    }
  }
});

export const {setDirectories, addNewDirectory} = DirectoriesSlice.actions;
export default DirectoriesSlice;
