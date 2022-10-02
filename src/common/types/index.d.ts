import {Document} from './documents.interface';

declare module '*.jpg';
declare module '*.png';

declare global {
  var documents: Document[];
}

export {};
