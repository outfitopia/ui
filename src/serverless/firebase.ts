import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "@firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyDHvTrqwvX4XSCPMb8LoEK__9dIG2MTZqI",
//     authDomain: "outfitopia-910a2.firebaseapp.com",
//     projectId: "outfitopia-910a2",
//     storageBucket: "outfitopia-910a2.appspot.com",
//     messagingSenderId: "1098131545511",
//     appId: "1:1098131545511:web:993b970cf3056507feea82"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBhRD77hIoFrGLa4S0fmcIZj8zGrBuqVeo",
    authDomain: "starbuy-ecommerce.firebaseapp.com",
    projectId: "starbuy-ecommerce",
    storageBucket: "starbuy-ecommerce.appspot.com",
    messagingSenderId: "771205567421",
    appId: "1:771205567421:web:be2ea9ccbd6e967326b8d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app)
export { app, db, storage };
