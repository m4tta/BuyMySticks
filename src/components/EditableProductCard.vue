<template>
<div class="px-6 py-4 shadow-lg bg-white rounded">
    <img v-if="p.imageUrl" src="@/assets/logo.svg" alt="A Stick">
    <img v-if="!p.imageUrl" src="@/assets/image-placeholder.svg" alt="A Stick">
    <div class="flex mt-4 items-end">
      <span v-if="!isEditing" class="text-2xl">{{p.name}}</span>
      <input v-if="isEditing" :disabled="!isEditing" type="text" placeholder="Product Name" class="text-2xl w-full input" v-model="p.name" />
      <div class="flex ml-auto w-1/3 justify-end">
          <span class="text-1xl">$</span>
          <span v-if="!isEditing" class="text-3xl">{{p.price}}</span>
          <input v-if="isEditing" :disabled="!isEditing" type="text" placeholder="00" class="text-3xl w-full input text-right" v-model="p.price" />
      </div>
    </div>
    <div class="h-px bg-grey w-full my-2"></div>
    <div>
      <span v-if="!isEditing" class="block text-md my-2">{{p.description}}</span>
      <textarea v-if="isEditing" :disabled="!isEditing" v-model="p.description" placeholder="Product description" class="text-md h-16 my-2 resize-none w-full input" />
    </div>
    <div class="flex justify-between">
      <div>
        <button @click="toggleEdit" v-if="!isEditing" class="btn-blue">Edit</button>
        <button @click="toggleEdit" v-if="isEditing" class="btn-blue">Cancel</button>
        <button @click="destroy" v-if="isEditing" class="btn-red">Delete</button>
      </div>
      <button @click="save" v-if="isEditing" class="btn-green">Save</button>
      <button @click="toggleActive" v-if="!isEditing && p.isActive" class="btn-green">Active</button>
      <button @click="toggleActive" v-if="!isEditing && !p.isActive" class="btn-red">Active</button>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProductCard',
  data () {
    return {
      isEditing: false,
      initialState: {},
      p: {}
    }
  },
  props: {
    product: Object
  },
  methods: {
    ...mapActions(['toggleActiveState', 'updateProduct', 'destroyProduct']),
    toggleEdit () {
      this.isEditing = !this.isEditing
      if (this.isEditing === false) {
        this.p = Object.assign(this.p, this.initialState)
      }
    },
    save () {
      this.updateProduct({
        product: this.product,
        newProduct: this.p
      })
      this.isEditing = false
    },
    reset () {
      this.p = Object.assign(this.p, this.initialState)
    },
    destroy() {
      let result = confirm(`Are you sure you want to delete "${this.p.name}"?`)
      if (result) {
        this.destroyProduct(this.product)
        this.isEditing = false;
      }
    },
    toggleActive() {
      this.toggleActiveState(this.product)      
    }
  },
  watch: {
    product: function(oldProduct, newProduct) {
      // Update our local copy of the product
      this.initialState = Object.assign({}, this.initialState, this.$props.product)
      this.p = Object.assign({}, this.p, this.initialState)
    }
  },
  created () {
    // create a local copy of the product to perserve the prop to undo edits later
    this.initialState = Object.assign(this.initialState, this.$props.product)
    this.p = Object.assign(this.p, this.initialState)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
