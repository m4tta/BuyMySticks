<template>
  <form @submit.prevent="register" class="shadow-lg bg-white rounded flex flex-col lg:w-1/5">
    <div v-if="accountCreatedSuccess" class="m-4 px-4 py-2 bg-green-lighter rounded border border-green">
      <span>Account created.</span>
    </div>
    <div class="p-4">
      <label class="flex flex-col mb-3">
        <span class="text-sm uppercase tracking-wider font-semibold">email</span>
        <input
          :class="{'border-red': errors.first('email')}" 
          v-validate="{'required': true, 'email': true}" 
          v-model="email" 
          name="email" placeholder="Email" type="email" class="input px-4 py-2 leading-normal">
          <span class="text-sm text-red">{{errors.first('email')}}</span>
      </label>
      <label class="flex flex-col mb-3">
        <span class="text-sm uppercase tracking-wider font-semibold">password</span>
        <input
          :class="{'border-red': errors.first('password')}" 
          v-validate="{'required': true}" 
          v-model="password" 
          name="password" placeholder="Password" class="input px-4 py-2 leading-normal" type="password">
          <span class="text-sm text-red">{{errors.first('password')}}</span>
      </label>
      <label class="flex flex-col mb-3">
        <span class="text-sm uppercase tracking-wider font-semibold">password confirmation</span>
        <input
          :class="{'border-red': errors.first('passwordConfirmation')}" 
          v-validate="{'required': true, 'confirmed': 'password'}" 
          v-model="passwordConfirmation" placeholder="Password confirmation" 
          name="passwordConfirmation" class="input px-4 py-2 leading-normal" type="password">
          <span class="text-sm text-red">{{errors.first('passwordConfirmation')}}</span>
      </label>
    </div>
    <div class="px-4 pb-4 flex justify-between">
      <router-link tag="a" to="login" class="btn-outline-black">Back to login</router-link>
      <button :disabled=accountCreatedSuccess type="submit" class="btn-green ml-6">Register</button>
    </div>
  </form>
</template>

<script>
import { firebase } from '../../firebase'

export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      accountCreatedSuccess: false,
    }
  },
  methods: {
    register() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.createUserWithEmailAndPassword({
            email: this.email,
            password: this.password
          }).then(() => {
            this.$router.push('/')
          })
        }
      })

    }
  }
}
</script>
