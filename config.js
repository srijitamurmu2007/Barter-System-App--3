import firebase from 'firebase';
require('@firebase/firestore')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLCjstJ9qn2gWB069GfSkQ81_mwGCKj8w",
  authDomain: "barter-system-2df7b.firebaseapp.com",
  databaseURL: "https://barter-system-2df7b.firebaseio.com",
  projectId: "barter-system-2df7b",
  storageBucket: "barter-system-2df7b.appspot.com",
  messagingSenderId: "585176465016",
  appId: "1:585176465016:web:1bd47884311fb651de378d",
  measurementId: "G-LXWHKGLCD5"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();