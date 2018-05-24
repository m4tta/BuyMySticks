<template>
<div class="rounded bg-white-pure border-t-4 border-blue px-6 py-2 flex flex-col lg:flex-row justify-between shadow-md mb-4">
    <div class="flex flex-col mb-4 lg:mb-0">
        <span class="uppercase tracking-wide">order</span>
        <span>{{order}}</span>
    </div>
    <div class="flex flex-col mb-4 lg:mb-0">
        <span class="uppercase tracking-wide">customer</span>
        <span>{{customer}}</span>
    </div>
    <div class="flex flex-col mb-4 lg:mb-0">
        <span class="uppercase tracking-wide">email</span>
        <span>{{email}}</span>
    </div>
    <div class="flex flex-col mb-4 lg:mb-0">
        <span class="uppercase tracking-wide">time</span>
        <span>{{time}}</span>
    </div>
    <div class="flex flex-col mb-4 lg:mb-0">
        <span class="uppercase tracking-wide">product</span>
        <span>{{productId}}</span>
    </div>
    <div class="flex flex-col mb-4 lg:mb-0">
        <span class="uppercase tracking-wide">status</span>
        <div class="flex">
            <svg class="h-4 fill-current text-grey mr-2" v-bind:class="{'text-green': statusPayment}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path id="payment" class="cls-1" d="M10,20a10,10,0,1,1,7.071-2.929A10,10,0,0,1,10,20Zm1-5h1a3,3,0,0,0,0-6H7.99a1,1,0,1,1,0-2H14V5H11V3H9V5H8a3,3,0,0,0,0,6h4a1,1,0,0,1,0,2H6v2H9v2h2Z"/>
            </svg>
            <svg @click="toggleShippedStatus" class="h-4 fill-current text-grey cursor-pointer hover:text-blue" v-bind:class="{'text-blue': statusShipped}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path id="shipped" class="cls-1" d="M14.83,4.006H20v6H19V20H1V10H0v-6H5.17A3,3,0,0,1,10,.768a3,3,0,0,1,4.83,3.239ZM8,10H3v8H8Zm4,0v8h5V10Zm-4-4H2V8H8Zm4,0V8h6v-2Zm-4-2a1,1,0,1,0-.707-.293A1,1,0,0,0,8,4.006Zm4,0a1,1,0,1,0-.707-.293A1,1,0,0,0,12,4.006Z"/>
            </svg>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Order',
  props: {
    order: Number,
    productId: Number,
    customer: String,
    email: String,
    time: Date,
    statusPayment: Boolean,
    statusShipped: Boolean
  },
  methods: {
    ...mapActions(['toggleShipped']),
    toggleShippedStatus () {
      this.toggleShipped(this.order)
    }
  }
}
</script>
