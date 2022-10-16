import { Document } from './documents.interface';

declare global {
	let documents: Document[];
}

export {};

declare module '*.jpg';
declare module '*.png';
