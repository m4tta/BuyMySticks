<template>
<div class="flex flex-col bg-green-light w-full h-screen overflow-hidden">
  <Header/>
  <div class="flex flex-col items-center h-full pt-16">
    <product-card class="md:w-1/2 xl:w-1/4" :product=randomProduct />
    <router-link to="/sticks" class="md:w-1/2 lg:w-1/4 mt-16 px-6 py-3 no-underline text-center text-3xl font-thin btn-outline-white">Show All Available</router-link>
    <Stripe-Logo class="mt-auto" />
  </div>
</div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header.vue'
import ProductCard from '@/components/ProductCard.vue'
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
    ...mapState(['activeProducts']),
    randomProduct() {
      return _.sample(this.activeProducts)
    }
  }
}
</script>

<style scoped>
</style>
