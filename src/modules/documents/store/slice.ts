import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './state';
import { Document } from '../../../common/types/documents.interface';

interface setDocumentPayload {
  document: Document;
}

interface setLastUpdatedPayload {
  lastUpdated: Document[];
}

const DocumentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocument: (state, action: PayloadAction<setDocumentPayload>) => {
      state.document = action.payload.document;
    },
    setLastUpdated: (state, action: PayloadAction<setLastUpdatedPayload>) => {
      state.lastUpdated = action.payload.lastUpdated;
    },
  },
});

export const { setDocument, setLastUpdated } = DocumentsSlice.actions;
export default DocumentsSlice;
