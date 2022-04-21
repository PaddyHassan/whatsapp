import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCQuMK1gxU-fBtR8qs0Fcb736lcjZI2bCI",
    authDomain: "whatsapp-1f94a.firebaseapp.com",
    projectId: "whatsapp-1f94a",
    storageBucket: "whatsapp-1f94a.appspot.com",
    messagingSenderId: "522206009671",
    appId: "1:522206009671:web:e7d0e0413856d20f4b1462"
  };

  const app = !firebase.apps.length
   ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider}