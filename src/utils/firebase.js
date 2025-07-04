import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAajlJBmkRyI25DjO6_hbft3EzASjFIlTs",
  authDomain: "sharp-ecom-9e3ff.firebaseapp.com",
  projectId: "sharp-ecom-9e3ff",
  storageBucket: "sharp-ecom-9e3ff.firebasestorage.app",
  messagingSenderId: "558010205611",
  appId: "1:558010205611:web:d53dc86daf24a095ca7eee",
  measurementId: "G-LR99S2NKQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider };
