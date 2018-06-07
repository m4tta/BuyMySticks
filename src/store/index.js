import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import * as fb from '../firebase'

import products from './modules/products'
import user from './modules/user'
import orders from './modules/orders'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    products: {
      namespaced: true,
      ...products
    },
    orders: {
      namespaced: true,
      ...orders
    },
  },
  state: {
    messages: [],
  },
  getters: {
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
    init: ({ dispatch }) => {
      dispatch('products/init');
      // dispatch('orders/init');
    },
  }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('SET_CURRENT_USER', user)
    store.dispatch('fetchUserProfile')
  }
})

export default store