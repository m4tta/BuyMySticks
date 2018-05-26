<template>
<div v-if="product" class="shadow-lg bg-white rounded flex flex-col flex-none">
  <img v-if="!product.imageUrl" class="rounded-t self-center" src="@/assets/logo.svg" alt="A Stick">
  <img v-else :src=thumbnailURL class="rounded-t self-center" alt="A Stick">
  <!-- <img v-if="imageUrl" :src="'@' + imageUrl" alt="A Stick"> -->
  <div class="px-4 py-4 mt-auto">
    <div class="flex items-center">
      <span class="text-4xl">{{product.name}}</span>
      <div class="flex ml-auto">
        <span class="text-2xl">$</span>
        <span class="text-5xl">{{product.price}}</span>
      </div>
    </div>
  </div>
  <div class="h-px bg-grey-light w-full"></div>
  <div class="px-4 py-4 bg-grey-lighter">
    <span class="text-lg my-4">{{product.description}}</span>
  </div>
  <div class="h-px bg-grey-light w-full"></div>
  <div class="px-4 py-4">
    <button 
      @click="buy" 
      :disabled="product.stock < 1" 
      class="w-full px-6 py-3 text-3xl text-white" 
      v-bind:class="{'bg-green-lighter': product.stock < 1, 'btn-green': product.stock > 0, 'cursor-not-allowed': product.stock < 1}">Buy Now</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  computed: {
    thumbnailURL() {
      return this.product.imageUrl.replace('images%2Fproducts%2F', 'images%2Fproducts%2Fthumb_')
    }
  },
  methods: {
    buy() {
      console.log('buying a stick');
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
