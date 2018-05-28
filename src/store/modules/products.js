import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { firebaseAction } from 'vuexfire'

import { productsCollection, firebase } from '../../firebase'

const activeProducts = productsCollection.where('isActive', '==', true)

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

const state = {
  active: [],
  all: [],
}

const mutations = {

}

const getters = {
  activeProducts: state => {
    return state.active.length
  },
}

const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('all', productsCollection)
    bindFirebaseRef('active', activeProducts)
  }),
  toggleActiveState({}, product) {
    productsCollection.doc(product.id).update({isActive: !product.isActive})
  },
  destroyProduct({}, product) {
    productsCollection.doc(product.id).delete()
  },
  updateProduct({}, {product, newProduct}) {
    newProduct = {...newProduct, updatedAt: firebase.firestore.FieldValue.serverTimestamp()}
    productsCollection.doc(product.id).update(newProduct)
  },
  addProduct({}, newProduct) {
    newProduct = {
      name: 'New Product',
      isActive: false,
      price: 0,
      stock: 0,
      description: 'No Description...',
      imageUrl: '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    productsCollection.add(newProduct)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}