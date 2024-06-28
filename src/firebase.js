import MyFirebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeljjbDmUjKWovkbRE5b3zh_d-fe0HX94",
  authDomain: "contactapp-4d619.firebaseapp.com",
  projectId: "contactapp-4d619",
  storageBucket: "contactapp-4d619.appspot.com",
  messagingSenderId: "118788631025",
  appId: "1:118788631025:web:2b79364ca280a525ab7c50",
  measurementId: "G-XKYYWZ91F3",
};

// Initialize Firebase
const app = MyFirebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = MyFirebase.firestore(); //connection will be established to firestor database
