<template>
<div>
  <div class="px-8 py-2 flex items-center h-24">
    <router-link to="/"><img src="@/assets/logo.svg" alt="Buy My Sticks" class="h-16"></router-link>
    <router-link to="contact" class="text-white no-underline ml-auto hover:text-black">Contact</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
