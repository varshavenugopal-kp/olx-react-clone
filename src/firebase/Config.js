// import firebase from 'firebase'
// import 'firebase/auth'
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdbkEzheEl0zGmgBWwW5BuZk3u6pwEHx0",
    authDomain: "olx-clone-6129e.firebaseapp.com",
    projectId: "olx-clone-6129e",
    storageBucket: "olx-clone-6129e.appspot.com",
    messagingSenderId: "588446640167",
    appId: "1:588446640167:web:c1045e49c31f4675fa0602",
    measurementId: "G-3KKL29X4KL"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth =getAuth(app)
  export const storage=getStorage(app)

// export default firebase.initializeApp(firebaseConfig);