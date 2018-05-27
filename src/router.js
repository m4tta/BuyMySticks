import Vue from 'vue'
import Router from 'vue-router'

import Landing from '@/views/Landing.vue'
import Sticks from '@/views/Sticks.vue'
import Contact from '@/views/Contact.vue'

import Dashboard from '@/views/Dashboard/Dashboard.vue'
import Inventory from '@/views/Dashboard/Inventory.vue'
import Orders from '@/views/Dashboard/Orders.vue'
import Inbox from '@/views/Dashboard/Inbox.vue'
import Users from '@/views/Dashboard/Users.vue'

import Account from '@/views/Account/Account.vue'
import Login from '@/views/Account/Login.vue'
import Register from '@/views/Account/Register.vue'

Vue.use(Router)

export default new Router({
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
      path: '/dashboard',
      component: Dashboard,
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
