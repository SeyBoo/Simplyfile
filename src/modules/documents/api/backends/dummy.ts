import {Document} from '../../../../common/types/documents.interface';
import {DummyDocuments} from './dummy-data';
import {DocumentsBackend} from '../index';

global.documents = DummyDocuments;

export default class DocumentDummy implements DocumentsBackend {
  async fetchDocument(uuid: string): Promise<Document> {
    const selectedDocument = global.documents.filter(
      document => document.uuid === uuid,
    );
    return selectedDocument[0];
  }

  async deleteDocument(uuid: string): Promise<void> {
    const documentsUpdated = global.documents.filter(
      document => document.uuid !== uuid,
    );

    global.documents = documentsUpdated;
  }

  async updateDocumentName(uuid: string, name: string): Promise<void> {
    const selectedDocument = global.documents.filter(
      document => document.uuid === uuid,
    );

    const documentsList = global.documents.filter(
      document => document.uuid !== uuid,
    );

    const newDocument: Document = {
      directory: selectedDocument[0].directory,
      uuid: uuid,
      image: selectedDocument[0].image,
      name: name,
      bookmarked: selectedDocument[0].bookmarked,
      creationDate: selectedDocument[0].creationDate,
      lastUpdate: new Date(),
    };

    documentsList.push(newDocument);

    global.documents = documentsList;
  }

  async bookmarkDocument(uuid: string): Promise<void> {
    const selectedDocument = global.documents.filter(
      document => document.uuid === uuid,
    );

    const documentsList = global.documents.filter(
      document => document.uuid !== uuid,
    );

    const newDocument: Document = {
      directory: selectedDocument[0].directory,
      uuid: uuid,
      image: selectedDocument[0].image,
      name: selectedDocument[0].name,
      bookmarked: !selectedDocument[0].bookmarked,
      creationDate: selectedDocument[0].creationDate,
      lastUpdate: selectedDocument[0].lastUpdate,
    };

    documentsList.push(newDocument);

    global.documents = documentsList;
  }

  async fetchLastUpdated(): Promise<Document[]> {
    return await global.documents;
  }
}
