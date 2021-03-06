import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBq6aBUf_3EnNoiGHxYdc5yoniFqQ1NMmc",
  authDomain: "chat-application-1ad88.firebaseapp.com",
  projectId: "chat-application-1ad88",
  storageBucket: "chat-application-1ad88.appspot.com",
  messagingSenderId: "410508817932",
  appId: "1:410508817932:web:35e04662df4676793aa029",
  measurementId: "G-YCHSK7SQ8L",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
