<template>
<div class="shadow-lg bg-white-pure rounded flex flex-col">
  <label class="inline-flex flex flex-col text-center justify-center border-dashed rounded-t w-full" v-bind:class="{'h-48': !p.imageUrl, 'border-4': !p.imageUrl && !file}">
    <img v-if="file" :src=this.imagePreview class="rounded-t"/>
    <img v-else-if="p.imageUrl" :src=thumbnailURL class="rounded-t"/>
    <div v-if="!file && !p.imageUrl && isEditing" class="flex flex-col text-center justify-center items-center">
      <!-- <span>Drag a file or</span> -->
      <span class="btn-blue">Select File</span>
    </div>
    <input type="file" :disabled="!isEditing" @change="previewImage" name="image" v-validate="{'image': true}" accept="image/*" class="hidden">
  </label>
  <div class="mt-auto px-4 py-4 flex items-center">
    <span v-if="!isEditing" class="text-2xl">{{p.name}}</span>
    <input :class="{'border-red': errors.first('name')}" @change="onChangeValidate" v-if="isEditing" :disabled="!isEditing" type="text" placeholder="Product Name" class="text-2xl w-full input" name="name" v-validate="{required: true}" v-model="p.name" />
    <div class="flex ml-auto w-1/3 justify-end">
      <span class="text-1xl">$</span>
      <span v-if="!isEditing" class="text-3xl">{{p.price}}</span>
      <input :class="{'border-red': errors.first('price')}" 
        @change="onChangeValidate" 
        v-if="isEditing" 
        :disabled="!isEditing" 
        type="text" 
        placeholder="00" 
        class="text-3xl w-full input text-right" 
        name="price" 
        v-validate="{required: true, numeric: true, min_value: 1}" v-model="p.price" />
    </div>
  </div>
  <div class="h-px bg-grey-light w-full" />
  <div class="px-4 py-2 flex items-center">
    <span v-if="!isEditing" class="block text-md my-2">{{p.description}}</span>
    <textarea :class="{'border-red': errors.first('description')}" 
    @change="onChangeValidate" 
    v-if="isEditing" 
    :disabled="!isEditing" 
    v-model="p.description" 
    v-validate="{required: true, min: 10}" 
    name="description" 
    placeholder="Product description" 
    class="text-md h-16 my-2 resize-none w-full input" />
  </div>
  <div class="h-px bg-grey-light w-full" />
  <div class="px-4 flex items-center justify-end">
    <input :class="{'border-red': errors.first('stock')}" 
    @change="onChangeValidate" 
    type="number" 
    v-if="isEditing" 
    :disabled="!isEditing" 
    v-model="p.stock" 
    v-validate="{required: true, numeric: true}" 
    name="stock" 
    class="text-md my-2 resize-none w-1/4 input" />
    <span v-if="!isEditing" class="block font-bold text-md my-2">{{p.stock}}</span>
    <span class="ml-2 font-bold text-grey-dark">Stock</span>
  </div>
  <div class="h-px bg-grey-light w-full" />
  <div class="px-4 py-2 flex flex-col">
    <span class="text-xs text-red" v-for="(error, index) in errors.all()" :key="index">{{error}}</span>
  </div>
  <div class="px-4 py-2">
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
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { storage } from '../../firebase'
import uuid from 'uuid/v1'

export default {
  name: 'ProductCard',
  data () {
    return {
      isEditing: false,
      initialState: {},
      p: {},
      file: null,
      imagePreview: null
    }
  },
  props: {
    product: Object
  },
  computed: {
    thumbnailURL() {
      return this.product.imageUrl.replace('images%2Fproducts%2F', 'images%2Fproducts%2Fthumb_')
    }
  },
  methods: {
    ...mapActions(['toggleActiveState', 'updateProduct', 'destroyProduct']),
    onChangeValidate() {
      this.$validator.validateAll();
    },
    toggleEdit () {
      this.isEditing = !this.isEditing
      if (this.isEditing === false) {
        this.p = Object.assign(this.p, this.initialState)
      }
    },
    save () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.updateProduct({
            product: this.product,
            newProduct: this.p
          })
          if (this.file) {
            this.uploadImage()
          }
          this.isEditing = false
        }
      })
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
      this.$validator.validateAll().then(valid => {
        if (valid && this.p.price > 0) {
          this.toggleActiveState(this.product)      
        }
      })
    },
    uploadImage() {
      let storageRef = storage.ref('images/products/');
      const filename = uuid() + '.jpeg'
      let imageRef = storageRef.child(filename)
      imageRef.put(this.file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          setTimeout(() => {
            this.updateProduct({
              product: this.product,
              newProduct: {
                imageUrl: url
              }
            })
            this.file = null;
          }, 5000);
        })
      });
      
    },
    previewImage(e) {
      this.file = e.target.files[0]
      let fr = new FileReader()

      fr.onload = event => {
        this.imagePreview = event.target.result
      }

      fr.readAsDataURL(this.file)
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
