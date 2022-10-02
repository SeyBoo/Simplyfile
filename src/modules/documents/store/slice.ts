import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './state';
import {Document} from '../../../common/types/documents.interface';

interface setDocumentPayload {
  document: Document;
}

const DocumentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocument: (state, action: PayloadAction<setDocumentPayload>) => {
      state.document = action.payload.document;
    },
    resetDocument: state => {
      state.document = null;
    },
  },
});

export const {setDocument, resetDocument} = DocumentsSlice.actions;
export default DocumentsSlice;
