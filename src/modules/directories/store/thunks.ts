import { AppThunk } from '../../../common/store';
import { getDirectoriesBackend } from '../api';
import { addNewDirectory, setDirectories, setDirectory } from './slice';

export const fetchDirectories = (): AppThunk => async (dispatch) => {
  const directoryBackend = await getDirectoriesBackend();
  const directories = await directoryBackend.fetchDirectories();
  await dispatch(setDirectories({ directories }));
};

export const createDirectory =
  (name: string): AppThunk =>
    async (dispatch) => {
      const directoryBackend = await getDirectoriesBackend();
      const directory = await directoryBackend.createDirectory(name);
      await dispatch(addNewDirectory({ directory }));
    };

export const updateDirectory =
  (uuid: string, name: string): AppThunk =>
    async (dispatch) => {
      const directoryBackend = await getDirectoriesBackend();
      const directories = await directoryBackend.updateDirectory(uuid, name);
      await dispatch(setDirectories({ directories }));
    };

export const removeDirectory =
  (uuid: string): AppThunk =>
    async (dispatch) => {
      const directoryBackend = await getDirectoriesBackend();
      const directories = await directoryBackend.removeDirectory(uuid);
      await dispatch(setDirectories({ directories }));
    };

export const fetchDirectory =
  (uuid: string): AppThunk =>
    async (dispatch) => {
      const directoryBackend = await getDirectoriesBackend();
      const directory = await directoryBackend.fetchDirectory(uuid);
      await dispatch(setDirectory({ directory }));
    };
