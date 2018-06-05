<template>
<div class="flex flex-col bg-green-light w-full h-screen overflow-hidden">
  <Header />
  <div class="flex flex-col items-center h-full pt-32">
      <form @submit.prevent="submitContactForm" class="bg-white rounded py-4 px-8 shadow-lg flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/3">
          <div class="flex flex-col md:flex-row mb-4">
            <label class="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
              <span class="uppercase  text-lg font-semibold tracking-wider mb-1">email</span>
              <input  v-model="email" type="text" class="input px-4 py-2 md:mr-4">
            </label>
            <label class="flex flex-col w-full md:w-1/2">
              <div class="flex">
                <span class="uppercase  text-lg font-semibold tracking-wider mb-1">order #</span>
                <span class="text-xs ml-auto my-auto text-grey-darker">Optional</span>
              </div>
              <input v-model="orderNumber" type="text" class="input px-4 py-2">
            </label>
          </div>
          <div class="flex mb-4">
            <label class="flex flex-col w-48">
              <span class="uppercase text-lg font-semibold tracking-wider mb-1">subject</span>
              <!-- <input v-model="subject" type="text" class="input px-4 py-2 mr-4"> -->
              <div class="relative">
                <select class="input appearance-none w-full px-4 py-2 pr-8 rounded">
                  <option>General</option>
                  <option>Payments</option>
                  <option>Shipping</option>
                </select>
                <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </label>
          </div>
          <div class="mb-4">
            <label class="flex flex-col w-full">
              <span class="uppercase  text-lg font-semibold tracking-wider mb-1">message</span>
              <textarea v-model="message" class="w-full h-64 input px-4 py-2 resize-none"></textarea>
            </label>
            <span class="text-sm float-right mt-1">{{remainingCharacters}}</span>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-green rounded px-6 py-3 text-white">Submit</button>
          </div>
      </form>
      <Stripe-Logo class="mt-auto" />
  </div>
</div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header.vue'
import StripeLogo from '@/components/StripeLogo.vue'

export default {
  name: 'contact',
  components: {
    Header,
    StripeLogo
  },
  data () {
    return {
      email: '',
      orderNumber: '',
      subject: '',
      message: ''
    }
  },
  computed: {
    remainingCharacters: function () {
      return 1000 - this.message.length
    }
  },
  methods: {
    submitContactForm () {

    }
  }
}
</script>

<style scoped>
</style>
