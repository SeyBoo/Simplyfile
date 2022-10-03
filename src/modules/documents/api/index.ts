import {Document} from '../../../common/types/documents.interface';

const DIRECTORIES_API_BACKEND_MODULE = 'dummy';

export interface DocumentsBackend {
  fetchDocument(uuid: string): Promise<Document>;

  deleteDocument(uuid: string): Promise<void>;

  updateDocumentName(uuid: string, name: string): Promise<void>;

  bookmarkDocument(uuid: string): Promise<void>;

  fetchDocuments(): Promise<Document[]>;

  addDocument(name: string, uri: string): Promise<void>;
}

let authBackendInstance: DocumentsBackend | undefined;

export async function getDocumentsBackend(): Promise<DocumentsBackend> {
  if (authBackendInstance === undefined) {
    const mod = await import('./backends/' + DIRECTORIES_API_BACKEND_MODULE);
    authBackendInstance = new mod.default() as DocumentsBackend;
  }
  return authBackendInstance;
}
