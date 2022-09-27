import {DocumentBackend} from "../index";
import {Document} from "../../../../common/types/documents.interface";
import {dummyDirectories} from "../../../directories/api/backends/dummy-data";
import document from "../../../../pages/src/Document";

let directories = dummyDirectories;

export default class DummyDocuments implements DocumentBackend {
  async fetchDocument(uuid: string, dossierUuid: string): Promise<Document> {
    const selectedDirectory = directories.filter(
        directory => directory.metadata.uuid === dossierUuid,
    );

    if (selectedDirectory !== undefined) {
      if (selectedDirectory[0].documents !== null) {
        const selectedDocument = selectedDirectory[0].documents.filter(
            document => document.uuid === uuid,
        );
        return selectedDocument[0];
      }
    }

    throw new InternalError();
  }
}
