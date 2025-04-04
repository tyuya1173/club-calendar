import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMybu21-ScTIlM0fgG5q01WLAw_WRE_W0",
  authDomain: "club-calendar-4bfce.firebaseapp.com",
  projectId: "club-calendar-4bfce",
  storageBucket: "club-calendar-4bfce.firebasestorage.app",
  messagingSenderId: "942209795047",
  appId: "1:942209795047:web:04f18569fe28e530dcf342",
  measurementId: "G-YRX16G0H0Z"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };