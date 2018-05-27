<template>
<div class="min-h-screen bg-green-light flex flex-col">
  <Header />
  <div class="flex flex-col bg-green-light w-full">
    <div class="flex flex-col items-center h-full py-16">
      <router-view/>
    </div>
  </div>
  <Stripe-Logo class="mt-auto mx-auto" />
</div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header.vue'
import StripeLogo from '@/components/StripeLogo.vue'

export default {
  name: 'Account',
  components: {
    Header,
    StripeLogo,
  },
  computed: {
  }
}
</script>

<style scoped>
</style>
