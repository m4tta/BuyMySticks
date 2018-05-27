import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import firebase from 'firebase/app'
import { firebaseMutations, firebaseAction } from 'vuexfire'

import { db } from '../firebase'

const orders = db.collection('orders')
const messages = db.collection('messages')

import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products
  },
  state: {
    searchQuery: '',
    searchedOrders: [],
    orders: [],
    messages: [],
    user: {},
  },
  getters: {
    pendingOrders: state => {
      return state.orders.filter(order => !(order.isPaid && order.isShipped)).length
    },
    unreadMessages: state => {
      return state.messages.length
    },
  },
  mutations: {
    ...firebaseMutations,
  },
  actions: {
    bindRef: firebaseAction(({ bindFirebaseRef }, { name, ref }) => {
      bindFirebaseRef(name, ref)
    }),
    signInWithPass({commit, dispatch}, credentials) {

    },
    signOut({commit, dispatch}) {

    },
  }
})

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