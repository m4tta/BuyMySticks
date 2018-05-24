<template>
  <div class="font-sans h-full text-black">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['init'])
  },
  created() {
    // bind some initial collections from firebase
    this.init()
  }
}
</script>


<style>
html {
  background-color: #f8f8f8;
}
</style>
