import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVpmkNkW2Fd1ieOhZHpgRTfCwyqR1saG0",
  authDomain: "sridurgaupset.firebaseapp.com",
  projectId: "sridurgaupset",
  storageBucket: "sridurgaupset.appspot.com",
  messagingSenderId: "143245840101",
  appId: "1:143245840101:web:8d24489ac0d38685d24e0c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
