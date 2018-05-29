import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { firebaseAction } from 'vuexfire'

import { usersCollection, auth } from '../../firebase'

const state = {
  currentUser: null,
  userProfile: {},
}

const mutations = {
  'SET_CURRENT_USER': (state, user) => {
    state.currentUser = user
  },
  'SET_USER_PROFILE': (state, userProfile) => {
    state.userProfile = userProfile
  },
  'SIGN_OUT': (state) => {
    state.currentUser = null,
    state.userProfile = {}
  },
}

const getters = {
  isLoggedIn(state) {
    return state.currentUser
  },
  getUserId(state) {
    if (state.currentUser) {
      return state.currentUser.uid
    }    
  },
  userHasRole(state) {
    return (role) => {
      return _.includes(state.userProfile.roles, role)
    }
  }
}

const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    // bindFirebaseRef('messages', messages)
  }),
  createUserWithEmailAndPassword({commit, dispatch}, credentials) {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        resolve
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(error)
        reject()
      })
    });
  },
  signInWithPass({commit, dispatch}, credentials) {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        resolve()
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(error)
        reject()
      })
    })
  },
  signOut({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      auth.signOut().then(function() {
        console.log('Signing out');
        // commit('SIGN_OUT')
        resolve()
      }, function(error) {
        console.error('Sign Out Error', error);
        reject()
      });
    });
  },
  fetchUserProfile({commit, dispatch, state, getters}) {
    usersCollection.doc(getters.getUserId).get().then(userDoc => {
      commit('SET_USER_PROFILE', userDoc.data())
    }).catch(err => {
      console.log(err);
    })
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}