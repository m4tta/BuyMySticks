<template>
<div class="h-full">
  <div class="py-1 px-8 h-20 bg-blue flex items-center fixed w-full"> <!-- Nav/search -->
    <router-link to="/" class="flex md:w-1/3 lg:w-1/4"><img src="@/assets/logo.svg" alt="Buy My Sticks" class="h-16"></router-link>
    <div class="ml-auto mr-24">
      <span class="text-white text-lg mr-4">Hello, {{user.userProfile.firstName}}</span>
      <button @click="logOut" class="btn-outline-white">Log Out</button>
    </div>
  </div> <!-- Nav/search -->
  <div class="flex pt-20 flex-col md:flex-row"> <!-- content -->
    <div class="w-full md:w-1/3 lg:w-1/5 flex flex-col bg-white-pure h-full md:fixed"> <!-- left col -->
      <div class="py-4 text-grey-dark">
          <router-link tag="div" to="/dashboard/inventory" class="link px-6 py-6 flex no-underline items-center border-r-6 hover:border-blue hover:text-black border-transparent cursor-pointer" active-class="border-blue text-black">
            <svg class="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path class="a" d="M0,2.8A2.808,2.808,0,0,1,2.8,0H25.2A2.8,2.8,0,0,1,28,2.8V5.6H0ZM1.4,7H26.6V25.2A2.8,2.8,0,0,1,23.8,28H4.2a2.8,2.8,0,0,1-2.8-2.8ZM9.8,9.8v2.8h8.4V9.8Z"/></svg>
            <span class="ml-6 text-2xl">Inventory</span>
            <div class="bg-grey-light rounded-full py-1 px-4 ml-auto">
              <span class="text-lg font-semibold text-black">{{ activeProducts }}</span>
            </div>
          </router-link>
          <router-link tag="div" to="/dashboard/orders" class="link px-6 py-6 flex no-underline items-center border-r-6 hover:border-blue hover:text-black border-transparent cursor-pointer" active-class="border-blue text-black">
            <svg class="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path id="Path_6" data-name="Path 6" class="cls-1" d="M5.6,2.8H28L23.8,15.4H5.6a1.4,1.4,0,0,0,0,2.8H23.8V21H5.6a4.2,4.2,0,0,1,0-8.4h.462L4.2,7,2.8,2.8H0V0H4.2A1.4,1.4,0,0,1,5.6,1.4ZM7,28a2.8,2.8,0,1,1,1.98-.82A2.8,2.8,0,0,1,7,28Zm14,0a2.8,2.8,0,1,1,1.98-.82A2.8,2.8,0,0,1,21,28Z"/></svg>
            <span class="ml-6 text-2xl">Orders</span>
            <div class="bg-grey-light rounded-full py-1 px-4 ml-auto">
              <span class="text-lg font-semibold text-black">{{ pendingOrders }}</span>
            </div>
          </router-link>
          <router-link tag="div" to="/dashboard/inbox" class="link px-6 py-6 flex no-underline items-center border-r-6 hover:border-blue hover:text-black border-transparent cursor-pointer" active-class="border-blue text-black">
            <svg class="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path id="inbox" class="cls-1" d="M0,2.8A2.808,2.808,0,0,1,2.8,0H25.2A2.8,2.8,0,0,1,28,2.8V25.2A2.8,2.8,0,0,1,25.2,28H2.8A2.8,2.8,0,0,1,0,25.2ZM19.6,19.6h5.6V2.8H2.8V19.6H8.4a2.808,2.808,0,0,0,2.8,2.8h5.6a2.8,2.8,0,0,0,2.8-2.8Z"/></svg>
            <span class="ml-6 text-2xl">Inbox</span>
            <div class="bg-grey-light rounded-full py-1 px-4 ml-auto">
              <span class="text-lg font-semibold text-black">{{ unreadMessages }}</span>
            </div>
          </router-link>
          <router-link tag="div" to="/dashboard/users" class="link px-6 py-6 flex no-underline items-center border-r-6 hover:border-blue hover:text-black border-transparent cursor-pointer" active-class="border-blue text-black">
            <svg class="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path id="users" class="cls-1" d="M8.54,11.2A5.6,5.6,0,1,1,12.5,9.56,5.6,5.6,0,0,1,8.54,11.2Zm0,1.4a24.961,24.961,0,0,1,8.54,1.526L15.54,22.4H13.79L12.74,28H4.34L3.29,22.4H1.54L0,14.126A25.1,25.1,0,0,1,8.54,12.6Zm11.634.238a25.679,25.679,0,0,1,5.32,1.288L23.94,22.4H22.19L21.14,28H15.6l.518-2.8h1.75ZM16.94,0a5.6,5.6,0,1,1-1.862,10.864,8.344,8.344,0,0,0,0-10.528A5.921,5.921,0,0,1,16.94,0Z"/></svg>
            <span class="ml-6 text-2xl">Users</span>
          </router-link>
        </div>
    </div> <!-- left col -->
    <div class="w-full py-6 md:px-8 lg:px-32 bg-white md:ml-1/3 lg:ml-1/5"> <!-- right col -->
        <router-view/>
    </div> <!-- right col -->
  </div>
</div>
</template>

<script>
// @ is an alias to /src

import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'pendingOrders',
      'activeProducts',
      'unreadMessages',
    ]),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['signOut']),
    logOut() {
      this.signOut().then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
.link {
  transition: all 0.15s linear;
}
</style>
