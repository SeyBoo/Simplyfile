import {AppThunk} from "../../../common/store";
import {getDocumentBackend} from "../api";
import {setDocument} from "./slice";

export const fetchDocument = (uuid: string, dossierUuid: string): AppThunk =>
    async (dispatch) => {
      const backendInstance = await getDocumentBackend();
      const document = await backendInstance.fetchDocument(uuid, dossierUuid);
      await dispatch(setDocument({document}));
    }
