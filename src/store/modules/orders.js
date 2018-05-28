import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { firebaseAction } from 'vuexfire'

import { ordersCollections, firebase } from '../../firebase'

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

const state = {
  all: [
    {
      orderNumber: 0,
      customerName: 'Longname Longington',
      customerEmail: 'matt@email.com',
      orderedAt: '5/5/5 5:55PM',
      isPaid: true,
      isShipped: false,
      productId: 1
    },
    {
      orderNumber: 0,
      customerName: 'Longname Longington',
      customerEmail: 'matt@email.com',
      orderedAt: '5/5/5 5:55PM',
      isPaid: true,
      isShipped: false,
      productId: 1
    },
    {
      orderNumber: 0,
      customerName: 'Longname Longington',
      customerEmail: 'matt@email.com',
      orderedAt: '5/5/5 5:55PM',
      isPaid: true,
      isShipped: false,
      productId: 1
    },
    {
      orderNumber: 0,
      customerName: 'Longname Longington',
      customerEmail: 'matt@email.com',
      orderedAt: '5/5/5 5:55PM',
      isPaid: true,
      isShipped: false,
      productId: 1
    },
  ],
}

const mutations = {

}

const getters = {
  pendingOrders: state => {
    return state.all.filter(order => !(order.isPaid && order.isShipped)).length
  },
}

const actions = {
  // init: firebaseAction(({ bindFirebaseRef }) => {
  //   bindFirebaseRef('all', ordersCollections)
  // }),
}

export default {
  state,
  mutations,
  actions,
  getters,
}