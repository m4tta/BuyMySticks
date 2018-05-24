<template>
<div class="flex flex-col bg-green-light w-full min-h-screen">
  <Header />
  <div class="grid px-16">
    <product-card v-for="(product, index) in activeProducts" :key="index" :product=product />
  </div>
</div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header.vue'
import ProductCard from '@/components/ProductCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'sticks',
  components: {
    Header,
    ProductCard
  },
  computed: {
    ...mapState(['activeProducts'])
  },
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
