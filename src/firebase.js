import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

// Initialize Firebase
let config = {
  apiKey: "AIzaSyCPI7V7nSsnhwBm7S54MmWL0N61ZeFBt0k",
  authDomain: "buy-my-sticks.firebaseapp.com",
  databaseURL: "https://buy-my-sticks.firebaseio.com",
  projectId: "buy-my-sticks",
  storageBucket: "buy-my-sticks.appspot.com",
  messagingSenderId: "752422615737"
};

firebase.initializeApp(config)
const db = firebase.firestore()
const storage = firebase.storage()
db.settings({ timestampsInSnapshots: true })

export { db, storage };