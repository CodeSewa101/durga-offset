// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAVpmkNkW2Fd1ieOhZHpgRTfCwyqR1saG0",
//   authDomain: "sridurgaupset.firebaseapp.com",
//   projectId: "sridurgaupset",
//   storageBucket: "sridurgaupset.appspot.com",
//   messagingSenderId: "143245840101",
//   appId: "1:143245840101:web:8d24489ac0d38685d24e0c",
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDrUeZByg6vPoxd88gmC7EQzBe4Vw8iGW0",
  authDomain: "sridurgaupset-2f672.firebaseapp.com",
  projectId: "sridurgaupset-2f672",
  storageBucket: "sridurgaupset-2f672.appspot.com",
  messagingSenderId: "467808885739",
  appId: "1:467808885739:web:a4136274649129678797ae",
  measurementId: "G-CXPQ24LBT1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
getAnalytics(app);
