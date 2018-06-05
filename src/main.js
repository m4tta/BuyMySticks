import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import VueTheMask from 'vue-the-mask'

import * as fb from './firebase'

Vue.use(VeeValidate)
Vue.use(VueTheMask)
Vue.config.productionTip = false

import './assets/css/main.css'

// Should ensure our user is loaded before loading the app.
fb.auth.onAuthStateChanged(user => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
