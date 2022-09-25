import { initializeApp } from 'firebase/app';

export default initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
});
