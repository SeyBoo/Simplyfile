import { Document } from '../../../common/types/documents.interface';
import { REACT_APP_DOCUMENTS_API_BACKEND_MODULE } from '@env';

export interface DocumentsBackend {
  fetchDocument(uuid: string): Promise<Document>;

  deleteDocument(uuid: string): Promise<void>;

  updateDocumentName(uuid: string, name: string): Promise<void>;

  bookmarkDocument(uuid: string): Promise<void>;

  fetchDocuments(): Promise<Document[]>;

  addDocument(name: string, uri: string, dossierUuid: string): Promise<void>;

  fetchLastUpdatedDocuments(): Promise<Document[]>;
}

let authBackendInstance: DocumentsBackend | undefined;

export async function getDocumentsBackend(): Promise<DocumentsBackend> {
  if (authBackendInstance === undefined) {
    const mod = await import(
      './backends/' + REACT_APP_DOCUMENTS_API_BACKEND_MODULE
    );
    authBackendInstance = new mod.default() as DocumentsBackend;
  }
  return authBackendInstance;
}
