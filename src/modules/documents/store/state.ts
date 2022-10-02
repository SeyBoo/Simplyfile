import {Document} from '../../../common/types/documents.interface';

interface DirectoriesState {
  document: Document | null;
}

const initialState: DirectoriesState = {
  document: null,
};

export default initialState;
