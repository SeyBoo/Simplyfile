import {Directory} from "../../../common/types/directory.interface";

interface DirectoriesState {
  directories: Directory[] | null;
}

const initialState: DirectoriesState =
{
  directories: null
};

export default initialState;
