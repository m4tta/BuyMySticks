import firebase from 'firebase/app'
import 'firebase/auth'
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
db.settings({ timestampsInSnapshots: true })

const storage = firebase.storage()
const auth = firebase.auth()
const fieldValue = firebase.FieldValue

// Collections
const productsCollection = db.collection('products')
const usersCollection = db.collection('users')
const ordersCollection = db.collection('orders')

export { db, storage, auth, productsCollection, usersCollection, ordersCollection, firebase };