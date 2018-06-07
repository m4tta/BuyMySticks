<template>
  <form @submit.prevent="login" class="shadow-lg bg-white rounded flex flex-col lg:w-1/5">
    <div class="p-4">
      <label class="flex flex-col mb-3">
        <span class="text-sm uppercase tracking-wider font-semibold">email</span>
        <input 
          :class="{'border-red': errors.first('email')}" 
          v-validate="{'required': true, 'email': true}" 
          v-model="email" 
          placeholder="Email" name="email" class="input px-4 py-2 leading-normal" type="email">
          <span class="text-sm text-red">{{errors.first('email')}}</span>
      </label>
      <label class="flex flex-col mb-3">
        <span class="text-sm uppercase tracking-wider font-semibold">password</span>
        <input 
          :class="{'border-red': errors.first('password')}" 
          v-validate="{'required': true}" 
          v-model="password" 
          placeholder="Password" name="password" class="input px-4 py-2 leading-normal" type="password">
          <span class="text-sm text-red">{{errors.first('password')}}</span>
      </label>
    </div>
    <div class="px-4 pb-4 flex justify-between">
      <router-link tag="a" to="register" class="btn-outline-black">Register</router-link>
      <button type="submit" class="btn-green">Login</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters(['userHasRole'])
  },
  methods: {
    ...mapActions(['signInWithPass']),
    login() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.signInWithPass({
            email: this.email,
            password: this.password
          }).then(() => {
            if (this.userHasRole('admin')) {
              this.$router.push('/dashboard')
            }
          })
        }
      })

    }
  }
}
</script>
