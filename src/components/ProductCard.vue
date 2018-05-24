<template>
<div v-if="product" class="px-6 py-4 shadow-lg bg-white rounded">
    <img v-if="!product.imageUrl" src="@/assets/image-placeholder.svg" alt="A Stick">
    <img v-if="product.imageUrl" src="@/assets/logo.svg" alt="A Stick">
    <!-- <img v-if="imageUrl" :src="'@' + imageUrl" alt="A Stick"> -->
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
