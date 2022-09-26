import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialState from "./state";
import {Directory} from "../../../common/types/directory.interface";

interface SetDirectoriesPayload {
  directories: Directory[];
}

const DirectoriesSlice = createSlice({
  name: "directories",
  initialState,
  reducers: {
    setDirectories: (state, action: PayloadAction<SetDirectoriesPayload>) => {
      state.directories = action.payload.directories;
    }
  }
});

export const {setDirectories} = DirectoriesSlice.actions;
export default DirectoriesSlice;
