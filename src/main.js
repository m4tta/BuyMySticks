import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'

import './firebase'

Vue.use(VeeValidate)
Vue.config.productionTip = false

import './assets/css/main.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
