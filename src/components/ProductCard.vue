<template>
<div v-if="product" class="px-6 py-4 shadow-lg bg-white rounded flex flex-col">
  <img v-if="!product.imageUrl" class="rounded self-center mt-auto" src="@/assets/logo.svg" alt="A Stick">
  <img v-else :src=product.imageUrl class="rounded self-center mt-auto" alt="A Stick">
  <!-- <img v-if="imageUrl" :src="'@' + imageUrl" alt="A Stick"> -->
  <div class="mt-auto">
    <div class="flex mt-4 items-end">
      <span class="text-4xl">{{product.name}}</span>
      <div class="flex ml-auto">
        <span class="text-2xl">$</span>
        <span class="text-5xl">{{product.price}}</span>
      </div>
    </div>
    <div class="h-px bg-grey w-full my-3"></div>
    <span class="text-lg my-4">{{product.description}}</span>
    <button class="w-full px-6 py-3 mt-6 text-3xl btn-green font-semibold">Buy Now</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
