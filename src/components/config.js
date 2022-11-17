import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCfg3SXyOYz2gvkmZhJZN7i24Vr9GaXAHM",
    authDomain: "article-feeds-app.firebaseapp.com",
    projectId: "article-feeds-app",
    storageBucket: "article-feeds-app.appspot.com",
    messagingSenderId: "147434325839",
    appId: "1:147434325839:web:e8a75f177ebd1bc6da673a",
    measurementId: "G-TJQ8B05HPZ"
};

firebase.initializeApp(firebaseConfig);

export {firebase};
