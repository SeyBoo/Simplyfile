import { DirectoriesBackend } from "../index";
import {
	Directory,
	DirectoryMetadata,
} from "../../../../common/types/directory.interface";
import { dummyDirectoriesMetadata } from "./dummy-data";
import "../../../documents/api/backends/dummy";

let directoriesMetadata = dummyDirectoriesMetadata;

export default class DummyDirectories implements DirectoriesBackend {
	async fetchDirectories(): Promise<DirectoryMetadata[]> {
		return directoriesMetadata;
	}

	async createDirectory(name: string): Promise<DirectoryMetadata> {
		const formattedMetadata = {
			name: name,
			uuid: name,
		};

		directoriesMetadata = [...directoriesMetadata, formattedMetadata];

		return formattedMetadata;
	}

	async updateDirectory(
		uuid: string,
		name: string
	): Promise<DirectoryMetadata[]> {
		const updatedDirectoriesMetadata = directoriesMetadata.map((directory) => {
			if (directory.uuid === uuid) {
				return {
					name: name,
					uuid: uuid,
				};
			}

			return directory;
		});

		directoriesMetadata = updatedDirectoriesMetadata;

		return updatedDirectoriesMetadata;
	}

	async removeDirectory(uuid: string): Promise<DirectoryMetadata[]> {
		const newMetadataArray = directoriesMetadata.filter(
			(directory) => directory.uuid !== uuid
		);

		directoriesMetadata = newMetadataArray;

		return newMetadataArray;
	}

	async fetchDirectory(uuid: string): Promise<Directory> {
		const filteredDirectory = directoriesMetadata.filter(
			(directory) => directory.uuid === uuid
		);

		const filteredDocuments = global.documents.filter(
			(document) => document.directory === uuid
		);
		return {
			metadata: filteredDirectory[0],
			documents: filteredDocuments,
		};
	}
}
