<template>
<div>
  <div class="grid">
    <editable-product-card v-for="(product, index) in products.all" :key="index" :product=product />
  </div>
  <div class="fixed pin-b pin-r pr-16 pb-12">
    <div @click="newProduct" class="h-16 w-16 rounded-full bg-blue hover:bg-blue-dark cursor-pointer shadow-lg p-3 text-white">
      <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path id="Add" class="cls-1" d="M22.5-3525.5v-20H2.5A2.5,2.5,0,0,1,0-3548a2.5,2.5,0,0,1,2.5-2.5h20v-20A2.5,2.5,0,0,1,25-3573a2.5,2.5,0,0,1,2.5,2.5v20h20A2.5,2.5,0,0,1,50-3548a2.5,2.5,0,0,1-2.5,2.5h-20v20A2.5,2.5,0,0,1,25-3523,2.5,2.5,0,0,1,22.5-3525.5Z" transform="translate(0 3573)"/>
      </svg>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src

import EditableProductCard from '@/components/Products/EditableProductCard.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'inventory',
  components: {
    EditableProductCard
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions('products', ['addProduct']),
    newProduct () {
      // fire state action to add product that is blank.
      // it will only exist client side until you begin to edit/save changes to it
      this.addProduct()
    }
  }
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

@media (min-width: 1250px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

svg {
    transition: all 0.15s ease-in-out;
}
</style>
