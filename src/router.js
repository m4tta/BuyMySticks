import Vue from 'vue'
import Router from 'vue-router'
import { auth } from './firebase'

import Landing from '@/views/Landing.vue'
import Sticks from '@/views/Sticks.vue'
import Contact from '@/views/Contact.vue'
import Checkout from '@/views/Checkout.vue'

import Dashboard from '@/views/Dashboard/Dashboard.vue'
import Inventory from '@/views/Dashboard/Inventory.vue'
import Orders from '@/views/Dashboard/Orders.vue'
import Inbox from '@/views/Dashboard/Inbox.vue'
import Users from '@/views/Dashboard/Users.vue'

import Account from '@/views/Account/Account.vue'
import Login from '@/views/Account/Login.vue'
import Register from '@/views/Account/Register.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'landing',
      component: Landing
    },
    {
      path: '/sticks',
      name: 'sticks',
      component: Sticks
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { auth: true },
      children: [
        {
          path: '',
          redirect: 'orders'
        },
        {
          path: 'inventory',
          component: Inventory
        },
        {
          path: 'orders',
          component: Orders
        },
        {
          path: 'inbox',
          component: Inbox
        },
        {
          path: 'users',
          component: Users
        }
      ]
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '',
          redirect: 'login'
        },
        {
          path: 'login',
          component: Login
        },
        {
          path: 'register',
          component: Register
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.auth);
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next('/account')
  } else {
    next()
  }
})

export default router