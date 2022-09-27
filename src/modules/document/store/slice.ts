import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialState from "./state";
import {Document} from "../../../common/types/documents.interface";

interface setDocumentPayload {
  document: Document;
}

const DocumentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setDocument: (state, action: PayloadAction<setDocumentPayload>)=> {
      state.document = action.payload.document;
    },
  }
})

export const {setDocument} = DocumentSlice.actions;
export default DocumentSlice;
