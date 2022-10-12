import {Document} from './documents.interface';

declare global {
  var documents: Document[];
}

export {};

declare module '*.jpg';
declare module '*.png';
