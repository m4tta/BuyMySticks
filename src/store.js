import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import firebase from 'firebase/app'
import { firebaseMutations, firebaseAction } from 'vuexfire'

import { db } from './firebase'

const products = db.collection('products')
const activeProducts = products.where('isActive', '==', true)
const orders = db.collection('orders')
const messages = db.collection('messages')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeProducts: [],
    products: [],
    searchQuery: '',
    searchedOrders: [],
    orders: [],
    messages: []
  },
  getters: {
    pendingOrders: state => {
      return state.orders.filter(order => !(order.isPaid && order.isShipped)).length
    },
    unreadMessages: state => {
      return state.messages.length
    },
    activeProducts: state => {
      return state.activeProducts.length
    },
  },
  mutations: {
    ...firebaseMutations,
  },
  actions: {
    bindRef: firebaseAction(({ bindFirebaseRef }, { name, ref }) => {
      bindFirebaseRef(name, ref)
    }),
    init: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('products', products)
      bindFirebaseRef('activeProducts', activeProducts)
      bindFirebaseRef('orders', orders)
      bindFirebaseRef('messages', messages)
    }),
    toggleActiveState({}, product) {
      products.doc(product.id).update({isActive: !product.isActive})
    },
    destroyProduct({}, product) {
      products.doc(product.id).delete()
    },
    updateProduct({}, {product, newProduct}) {
      newProduct = {...newProduct, updatedAt: firebase.firestore.FieldValue.serverTimestamp()}
      products.doc(product.id).update(newProduct)
    },
    addProduct({}, newProduct) {
      newProduct = {
        name: 'New Product',
        isActive: false,
        price: 0,
        description: 'No Description...',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }
      products.add(newProduct)
    },
  }
})

// Product Scheme
// {
//   productId: 1,
//   name: 'A Stick',
//   price: 10,
//   description: 'a random stick from my backyard',
//   imageUrl: '/assets/logo.svg',
//   createdAt: '5/5/5',
//   updatedAt: '5/5/5',
//   stock: 5,
//   active: true
// }

// Orders scheme
// {
//   orderNumber: 0,
//   customerName: 'Longname Longington',
//   customerEmail: 'matt@email.com',
//   orderedAt: '5/5/5 5:55PM',
//   isPaid: true,
//   isShipped: false,
//   productId: 1
// }