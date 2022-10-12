import { Document } from "./documents.interface";

export interface DirectoryMetadata {
	name: string;
	uuid: string;
}

export interface Directory {
	metadata: DirectoryMetadata;
	documents: Document[] | null;
}
