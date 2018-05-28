import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'

import * as fb from './firebase'

Vue.use(VeeValidate)
Vue.config.productionTip = false

import './assets/css/main.css'

fb.auth.onAuthStateChanged(user => {
  if (user) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
