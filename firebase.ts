
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Fix: Use @firebase/firestore directly to resolve "no exported member" errors in this environment
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD60RXO9b-AGzshTqjCI3L0OmDiMWdpXXU",
  authDomain: "nxorax-4b68e.firebaseapp.com",
  projectId: "nxorax-4b68e",
  storageBucket: "nxorax-4b68e.firebasestorage.app",
  messagingSenderId: "470275580330",
  appId: "1:470275580330:web:b8bf1fd7e6856af2e20bd3",
  measurementId: "G-5GJV2ET2CS"
};

// تهيئة التطبيق بنمط Singleton لمنع تعارض الخدمات
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ربط الخدمات بالتطبيق بشكل صريح لضمان التسجيل
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
