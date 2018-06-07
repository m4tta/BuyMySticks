<template>
<div class="min-h-screen bg-green-light flex flex-col">
  <Header />
  <div class="flex flex-col bg-green-light w-full">
    <div class="flex flex-col items-center h-full sm:py-16">
      <div class="md:w-2/3 xl:w-2/5 shadow-lg bg-white rounded flex flex-col flex-none w-full p-10">
        <!-- BEGIN progressbar -->
        <div class="progress-container relative m-8"> 
          <div class="progressbar bg-white-pure">
            <div class="bg-green leading-none py-3" v-bind:style="{width: stepWidth}"></div>
          </div>
          <div class="flex justify-between z-10 relative -mt-2">
            <div class="step flex flex-col justify-center items-center">
              <span :class="{'bg-green': currentStep >= 1, 'text-white': currentStep >= 1}" class="step-dot text-xl font-semibold rounded-full bg-white-pure text-black h-10 w-10 text-center">1</span>
              <span class="mt-2">Order Placed</span>
            </div>
            <div class="step flex flex-col justify-center items-center">
              <span :class="{'bg-green': currentStep >= 2, 'text-white': currentStep >= 2}" class="step-dot text-xl font-semibold rounded-full bg-white-pure text-black h-10 w-10 text-center">2</span>
              <span class="mt-2">Payment Received</span>
            </div>
            <div class="step flex flex-col justify-center items-center">
              <span :class="{'bg-green': currentStep >= 3, 'text-white': currentStep >= 3}" class="step-dot text-xl font-semibold rounded-full bg-white-pure text-black h-10 w-10 text-center">3</span>
              <span class="mt-2">Order Shipped</span>
            </div>
          </div>
        </div>
        <!-- END progressbar -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import _ from 'lodash'
import { mapActions, mapState } from 'vuex'
import { db } from '@/firebase'

export default {
  name: 'OrderStatus',
    components: {
    Header,
  },
  props: {
    orderId: String
  },
  data() {
    return {
      step: 0
    }
  },
  computed: {
    ...mapState(['orders']),
    currentStep() {
      if (_.hasIn(this.order, 'token.card')) {
        this.step = 1
      }
      if (_.hasIn(this.order, 'charge') && this.order.charge.paid) {
        this.step = 2
      }
      if (this.order.isShipped) {
        this.step = 3
      }
      return this.step
    },
    stepWidth() {
      if (this.currentStep <= 1) {
        return '0%'
      } else if (this.currentStep == 2) {
        return '50%'
      } else if (this.currentStep == 3) {
        return '100%'
      }
    },
    order() {
      return this.orders.order
    }
  },
  methods: {
    ...mapActions('orders', ['setOrder']),
  },
  created() {
    this.setOrder(this.orderId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progressbar {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #D4D4D4;
  position: absolute;
  width: 87%;
  left: 6%;
}
.progressbar div {
  transition: width 0.5s linear;
}
.step span {
  transition: background-color 1s linear;
}
.step-dot {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.50);
  line-height: 2.25rem;
}
</style>
