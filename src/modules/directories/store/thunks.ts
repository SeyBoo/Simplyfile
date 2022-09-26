import {AppThunk} from "../../../common/store";
import {getDirectoriesBackend} from "../api";
import {setDirectories} from "./slice";

export const fetchDirectories =
    (): AppThunk => (
        async (dispatch) => {
          const directory = await getDirectoriesBackend();
          const directories = await directory.fetchDirectories();
          await dispatch(setDirectories({directories}))
        }
    )
