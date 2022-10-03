export interface Document {
  uuid: string;
  name: string;
  image: string;
  creationDate: Date;
  lastUpdate: Date;
  directory: string;
  bookmarked: boolean;
}
