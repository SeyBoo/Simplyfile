import { AppThunk } from '../../../common/store';
import { setLastUpdated, setDocument } from '../../documents/store/slice';
import { getDocumentsBackend } from '../api';

export const fetchDocument =
  (uuid: string): AppThunk =>
    async (dispatch) => {
      const backendInstance = await getDocumentsBackend();
      const document = await backendInstance.fetchDocument(uuid);
      await dispatch(setDocument({ document }));
    };

export const deleteDocument =
  (uuid: string): AppThunk =>
    async () => {
      const backendInstance = await getDocumentsBackend();
      await backendInstance.deleteDocument(uuid);
    };

export const updateDocumentName =
  (uuid: string, name: string): AppThunk =>
    async () => {
      const backendInstance = await getDocumentsBackend();
      await backendInstance.updateDocumentName(uuid, name);
    };

export const bookmarkDocument =
  (uuid: string): AppThunk =>
    async () => {
      const backendInstance = await getDocumentsBackend();
      await backendInstance.bookmarkDocument(uuid);
    };

export const fetchLastUpdatedDocuments = (): AppThunk => async (dispatch) => {
  const backendInstance = await getDocumentsBackend();
  const lastUpdated = await backendInstance.fetchLastUpdatedDocuments();
  await dispatch(setLastUpdated({ lastUpdated }));
};

export const addNewDocument =
  (name: string, uri: string, dossierUuid: string): AppThunk =>
    async () => {
      const backendInstance = await getDocumentsBackend();
      await backendInstance.addDocument(name, uri, dossierUuid);
    };
