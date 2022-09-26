import {AppThunk} from "../../../common/store";
import {getDirectoriesBackend} from "../api";
import {setDirectories, addNewDirectory} from "./slice";

export const fetchDirectories =
    (): AppThunk => (
        async (dispatch) => {
          const directoryBackend = await getDirectoriesBackend();
          const directories = await directoryBackend.fetchDirectories();
          await dispatch(setDirectories({directories}))
        }
    );

export const createDirectory = (name: string): AppThunk => (
    async (dispatch) => {
      const directoryBackend = await getDirectoriesBackend();
      const directory = await directoryBackend.createDirectory(name)
      await dispatch(addNewDirectory({directory}))
    }
)

export const updateDirectory = (uuid: string, name: string): AppThunk => (
    async (dispatch) => {
      const directoryBackend = await getDirectoriesBackend();
      const directories = await directoryBackend.updateDirectory(uuid, name);
      await dispatch(setDirectories({directories}))
    }
)
