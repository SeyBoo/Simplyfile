import { Document } from '../../../common/types/documents.interface';

interface DirectoriesState {
	document: Document | null;
	lastUpdated: Document[] | null;
}

const initialState: DirectoriesState = {
	document: null,
	lastUpdated: null,
};

export default initialState;
