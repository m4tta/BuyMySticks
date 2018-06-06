<template>
<div class="min-h-screen bg-green-light flex flex-col">
  <Header />
  <div class="flex flex-col bg-green-light w-full">
    <div class="flex flex-col items-center h-full sm:py-16">
      Not Found
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header.vue'

export default {
  name: 'NotFound',
  components: {
    Header,
  },
}
</script>

<style scoped>
</style>
