import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import * as fb from '../firebase'

import products from './modules/products'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    products,
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
  }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('SET_CURRENT_USER', user)
    store.dispatch('fetchUserProfile')
  }
})


export default store