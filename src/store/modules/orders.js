import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { firebaseAction } from 'vuexfire'

import { ordersCollection, firebase } from '../../firebase'

const state = {
  all: [
    // {
    //   orderNumber: 0,
    //   customerName: 'Longname Longington',
    //   customerEmail: 'matt@email.com',
    //   orderedAt: '5/5/5 5:55PM',
    //   isPaid: true,
    //   isShipped: false,
    //   productId: 1
    // },
  ],
  order: {}
}

const mutations = {

}

const getters = {
  pendingOrders: state => {
    return state.all.filter(order => !(order.isPaid && order.isShipped)).length
  },
}

const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('all', ordersCollection)
  }),
  setOrder: firebaseAction(({ bindFirebaseRef }, orderId) => {
    bindFirebaseRef('order', ordersCollection.doc(orderId))
  }),
}

export default {
  state,
  mutations,
  actions,
  getters,
}