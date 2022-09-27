import {Document} from '../../../common/types/documents.interface';

const DOCUMENTS_API_BACKEND_MODULE = 'dummy';

export interface DocumentBackend {
  fetchDocument(uuid: string, dossierUuid: string): Promise<Document>;
}

let documentBackendInstance: DocumentBackend | undefined;

export async function getDocumentBackend(): Promise<DocumentBackend> {
  if (documentBackendInstance === undefined) {
    const mod = await import('./backends/' + DOCUMENTS_API_BACKEND_MODULE);
    documentBackendInstance = new mod.default() as DocumentBackend;
  }
  return documentBackendInstance;
}
