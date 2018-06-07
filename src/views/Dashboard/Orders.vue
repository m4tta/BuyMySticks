<template>
<div>
    <form @submit.prevent="search" class="relative flex w-full py-6">
      <div class="absolute pin-y pin-l flex items-center pl-3">
        <svg class="h-6 z-10 text-grey fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="a" d="M15.751,17.48a9.769,9.769,0,1,1,1.72-1.721L24,22.266,22.267,24l-6.5-6.52ZM9.772,17.09a7.324,7.324,0,1,0-5.177-2.146A7.317,7.317,0,0,0,9.772,17.09Z"/></svg>
      </div>
      <input type="text" v-model.trim="searchQuery" class="bg-white-pure rounded border border-blue w-full pl-12 text-lg leading-none" placeholder="Search by order #, name, email">
      <button type="submit" class="ml-4 py-2 px-4 text-lg btn-blue">Search</button>
    </form>
    <div class="flex mb-4 text-xl">
        <div class="flex">
            <label class="mr-6 flex">
                <input class="w-6 h-6" type="checkbox" v-model="showPaidOnly">
                <span class="mr-2">Show only payment received</span>
            </label>
            <label class="mr-6 flex">
                <input class="w-6 h-6" type="checkbox" v-model="hideCompleted">
                <span class="mr-2">Hide completed</span>
            </label>
        </div>
        <div class="ml-auto flex">
            <div class="flex mr-4">
                <svg class="h-6 fill-current text-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path id="payment" class="cls-1" d="M10,20a10,10,0,1,1,7.071-2.929A10,10,0,0,1,10,20Zm1-5h1a3,3,0,0,0,0-6H7.99a1,1,0,1,1,0-2H14V5H11V3H9V5H8a3,3,0,0,0,0,6h4a1,1,0,0,1,0,2H6v2H9v2h2Z"/>
                </svg>
                <span class="ml-2">Payment Status</span>
            </div>
            <div class="flex">
                <svg class="h-6 fill-current text-blue" mlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path id="shipped" class="cls-1" d="M14.83,4.006H20v6H19V20H1V10H0v-6H5.17A3,3,0,0,1,10,.768a3,3,0,0,1,4.83,3.239ZM8,10H3v8H8Zm4,0v8h5V10Zm-4-4H2V8H8Zm4,0V8h6v-2Zm-4-2a1,1,0,1,0-.707-.293A1,1,0,0,0,8,4.006Zm4,0a1,1,0,1,0-.707-.293A1,1,0,0,0,12,4.006Z"/>
                </svg>
                <span class="ml-2">Shipping Status</span>
            </div>
        </div>
    </div>
    <Order v-for="(order, index) in filteredOrders" :key=index :order=order />
</div>
</template>

<script>
// @ is an alias to /src

import Order from '@/components/Order.vue'

import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'inventory',
  data () {
    return {
      showPaidOnly: false,
      hideCompleted: false,
      searchQuery: '',
    }
  },
  components: {
    Order
  },
  computed: {
    ...mapState(['orders']),
    filteredOrders: function (state) {
      let orders = state.orders.all
      if (this.showPaidOnly) {
        orders = orders.filter(order => order.isPaid)
      }
      if (this.hideCompleted) {
        orders = orders.filter(order => !(order.charge.paid && order.isShipped))
      }
      if (this.searchQuery.length > 0) {
        orders = orders.filter(o => {
          let wasFound = false;
          Object.keys(o).forEach(key => {
            if (_.includes(o[key].toString().toLowerCase(), this.searchQuery.toLowerCase())) {
              return wasFound = true
            }
          })
          return wasFound
        })
      }
      
      return orders
    }
  }
}
</script>

<style scoped>
label {
    cursor: pointer;
}

input[type="checkbox"] {
    display: none;
}

input[type="checkbox"] + span:before {
    content: url('../../assets/checkbox-unchecked.svg');
    display: inline-block;
    height: 1.8rem;
    width: 1.8rem;
    vertical-align: text-top;
    margin-right: 0.5rem;
    background: white;
}

input[type="checkbox"]:checked + span:before {
    content: url('../../assets/checkbox-checked.svg');
}

</style>
