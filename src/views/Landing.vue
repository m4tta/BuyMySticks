<template>
<div class="min-h-screen bg-green-light flex flex-col">
  <Header />
  <div class="flex flex-col bg-green-light w-full">
    <div class="flex flex-col items-center h-full sm:py-16">
      <product-card class="md:w-1/2 xl:w-1/4" :product=randomProduct />
      <router-link to="/sticks" class="md:w-1/2 lg:w-1/4 mt-16 px-6 py-3 no-underline text-center text-3xl font-thin btn-outline-white">Show All Available</router-link>
    </div>
  </div>
  <Stripe-Logo class="mt-auto mx-auto" />
</div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header.vue'
import ProductCard from '@/components/Products/ProductCard.vue'
import StripeLogo from '@/components/StripeLogo.vue'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'landing',
  components: {
    Header,
    ProductCard,
    StripeLogo
  },
  computed: {
    ...mapState(['products']),
    randomProduct() {
      return _.sample(this.products.active)
    }
  }
}
</script>

<style scoped>
</style>
