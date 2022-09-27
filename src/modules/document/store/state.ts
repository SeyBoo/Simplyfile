import {Document} from "../../../common/types/documents.interface";

interface DocumentState {
  document: Document | null;
}

const initialState: DocumentState = {
  document: null,
}

export default initialState;
