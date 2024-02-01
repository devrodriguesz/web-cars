import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB3spgea10bt43ZfJmtBpjcAm8qcf-Rkws",
  authDomain: "webcars-f969a.firebaseapp.com",
  projectId: "webcars-f969a",
  storageBucket: "webcars-f969a.appspot.com",
  messagingSenderId: "1054891201131",
  appId: "1:1054891201131:web:4aa5873985c3945b11d72e"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage };