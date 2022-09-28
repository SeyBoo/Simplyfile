import {AppThunk} from '../../../common/store';
import {getDirectoriesBackend} from '../api';
import {addNewDirectory, resetDocument, setDirectories, setDirectory, setDocument} from './slice';

export const fetchDirectories = (): AppThunk => async dispatch => {
  const directoryBackend = await getDirectoriesBackend();
  const directories = await directoryBackend.fetchDirectories();
  await dispatch(setDirectories({directories}));
};

export const createDirectory =
    (name: string): AppThunk =>
        async dispatch => {
          const directoryBackend = await getDirectoriesBackend();
          const directory = await directoryBackend.createDirectory(name);
          await dispatch(addNewDirectory({directory}));
        };

export const updateDirectory =
    (uuid: string, name: string): AppThunk =>
        async dispatch => {
          const directoryBackend = await getDirectoriesBackend();
          const directories = await directoryBackend.updateDirectory(uuid, name);
          await dispatch(setDirectories({directories}));
        };

export const removeDirectory =
    (uuid: string): AppThunk =>
        async dispatch => {
          const directoryBackend = await getDirectoriesBackend();
          const directories = await directoryBackend.removeDirectory(uuid);
          await dispatch(setDirectories({directories}));
        };

export const fetchDirectory =
    (uuid: string): AppThunk =>
        async dispatch => {
          const directoryBackend = await getDirectoriesBackend();
          const directory = await directoryBackend.fetchDirectory(uuid);
          await dispatch(setDirectory({directory}));
        };

export const fetchDocument = (uuid: string, dossierUuid: string): AppThunk =>
    async (dispatch) => {
      const backendInstance = await getDirectoriesBackend();
      const document = await backendInstance.fetchDocument(uuid, dossierUuid);
      await dispatch(setDocument({document}));
    }

export const deleteDocument = (uuid: string, dossierUuid: string): AppThunk =>
    async (dispatch) => {
      const backendInstance = await getDirectoriesBackend();
      await backendInstance.deleteDocument(uuid, dossierUuid);
      await dispatch(resetDocument());
    }

export const updateDocumentName = (uuid: string, dossierUuid: string, name: string): AppThunk =>
    async () => {
      const backendInstance = await getDirectoriesBackend();
      const document = await backendInstance.updateDocumentName(uuid, dossierUuid, name);
      return document;
    }

export const bookmarkDocument = (uuid: string, dossierUuid: string): AppThunk =>
    async () => {
      const backendInstance = await getDirectoriesBackend();
      const document = await backendInstance.bookmarkDocument(uuid, dossierUuid);
      return document;
    }
