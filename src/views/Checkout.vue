<template>
<div class="min-h-screen bg-green-light flex flex-col">
  <Header />
  <div class="flex flex-col bg-green-light w-full">
    <div class="flex flex-col items-center h-full sm:py-16">
      <div class="md:w-2/3 xl:w-2/5 shadow-lg bg-white rounded flex flex-col flex-none">
        <div class="sm:flex py-4 px-4 sm:px-8 justify-between items-center">
          <div>
            <h1>Checkout</h1>
            <div class="flex flex-col" v-if="errors.any()">
              <h4>Errors</h4>
              <span class="text-xs text-red" v-for="(error, index) in errors.all()" :key="index">{{error}}</span>
            </div>
          </div>
          <div class="flex">
            <div class="flex flex-col justify-between">
              <div class="flex flex-col">
                <span>Items:</span>
                <span>"The basic stick"</span>
              </div>
              <div class="flex">
                <span class="font-bold self-center mt-auto mr-2">Total Price:</span>
                <span class="text-lg">$</span>
                <span class="text-2xl">10</span>
              </div>
            </div>
            <div class="ml-6 rounded w-24 h-24 bg-grey"></div>
          </div>
        </div>
        <div class="h-px w-full bg-grey-light my-2"/>
        <div class="py-4 px-4 sm:px-8">
          <div class="flex items-center mb-4">
            <div class="rounded-full border-2 font-bold border-green inline px-2 py-1 text-green mr-3">1</div>
            <h1 class="text-2xl">Your Basic Information</h1>
          </div>
          <div class="sm:flex">
            <label class="flex flex-col sm:w-1/2">
              <span class="mb-1 text-sm">First Name</span>
              <input type="text" class="input px-3 py-3" :class="{'border-red': errors.first('firstName')}" v-validate="{'required': true}" name="firstName" v-model="firstName" placeholder="Jane">
            </label>
            <label class="flex flex-col mt-4 sm:mt-0 sm:w-1/2 sm:ml-8">
              <span class="mb-1 text-sm">Last Name</span>
              <input type="text" class="input px-3 py-3" :class="{'border-red': errors.first('lastName')}" v-validate="{'required': true}" name="lastName" v-model="lastName" placeholder="Doe">
            </label>
          </div>
          <label class="flex flex-col sm:w-3/4 mt-4">
            <span class="mb-1 text-sm">Email</span>
            <input type="email" class="input px-3 py-3" :class="{'border-red': errors.first('email')}" v-validate="{'required': true, 'email': true}" name="email" v-model="email" placeholder="JaneDoe@example.com">
          </label>
        </div>
        <div class="h-px w-full bg-grey-light my-2"/>
        <div class="py-4 px-4 sm:px-8">
          <div class="flex items-center mb-4">
            <div class="rounded-full border-2 font-bold border-green inline px-2 py-1 text-green mr-3">2</div>
            <h1 class="text-2xl">Your Payment Information</h1>
          </div>
          <div class="sm:flex">
            <label class="flex flex-col w-full">
              <span class="mb-1 text-sm">Credit Card</span>
              <div ref="card"></div>
            </label>
            <!-- <label class="flex flex-col sm:w-2/3">
              <span class="mb-1 text-sm">Credit Card Number</span>
              <input type="text" class="input px-3 py-3" name="cardNumber" v-model="cardNumber" v-mask="'#### #### #### ####'" placeholder="5555 5555 5555 5555">
            </label>
            <label class="flex flex-col mt-4 sm:mt-0 sm:w-1/6 sm:ml-2">
              <span class="mb-1 text-sm">Exp Date</span>
              <input type="text" class="input px-3 py-3" name="cardExpDate" v-model="cardExpDate" v-mask="['# / ##', '## / ##']" placeholder="5/22">
            </label>
            <label class="flex flex-col mt-4 sm:mt-0 sm:w-1/6 sm:ml-2">
              <span class="mb-1 text-sm">CVC</span>
              <input type="text" class="input px-3 py-3" name="cardCvv" v-model="cardCVC" placeholder="805" maxlength="5">
            </label> -->
          </div>
        </div>
        <div class="h-px w-full bg-grey-light my-2"/>
        <div class="px-4 sm:px-8 py-4">
          <div class="flex items-center mb-4">
            <div class="rounded-full border-2 font-bold border-green inline px-2 py-1 text-green mr-3">3</div>
            <h1 class="text-2xl">Your Shipping Information</h1>
          </div>
          <label class="flex flex-col">
            <span class="mb-1 text-sm">Street Address</span>
            <input type="text" class="input px-3 py-3" :class="{'border-red': errors.first('street')}" v-validate="{'required': true, 'min': 5}" name="street" v-model="street" placeholder="123 Broadway">
          </label>
          <div class="sm:flex mt-4 justify-between">
            <label class="flex flex-col sm:w-1/3">
              <span class="mb-1 text-sm">City</span>
              <input type="text" class="input px-3 py-3" :class="{'border-red': errors.first('city')}" v-validate="{'required': true, 'min': 4}" name="city" v-model="city" placeholder="New York">
            </label>
            <label class="flex flex-col mt-4 sm:mt-0 sm:w-1/3 sm:ml-4">
              <span class="mb-1 text-sm">State</span>
              <div class="relative">
                <select name="state" v-model="state" :class="{'border-red': errors.first('state')}" v-validate="{'required': true}" class="appearance-none bg-white-pure border border-grey-light text-grey-darker px-3 py-3 pr-8 rounded w-full">
                  <option v-for="(state, index) in states" :key="index">{{state}}</option>
                </select>
                <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </label>
            <label class="flex flex-col mt-4 sm:mt-0 sm:w-1/3 sm:ml-4">
              <span class="mb-1 text-sm">Zip Code</span>
              <input type="text" class="input px-3 py-3" v-mask="'#####-####'" :class="{'border-red': errors.first('zipcode')}" maxlength="10" v-validate="{'required': true, 'min': 5}" name="zipcode" v-model="zipcode" placeholder="10001">
            </label>
          </div>
        </div>
        <div class="h-px w-full bg-grey-light my-2"/>
        <div class="px-4 sm:px-8 py-4 flex flex-col items-center">
          <button class="btn-green w-full text-2xl" @click="pay">Pay $10</button>
          <span class="mt-2 text-sm"><b>Need any help?</b> Don't Hesitate to <a href="#" class="text-black">contact support</a>!</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { stripeKey, stripeOptions } from '@/stripeConfig'
import Header from '@/components/Header.vue'
import { mapState } from 'vuex'
import _ from 'lodash'

let stripe = Stripe(stripeKey)
let elements = stripe.elements()
let card = undefined

export default {
  name: 'checkout',
  components: {
    Header,
  },
  mounted: function () {
    card = elements.create('card', {style: this.stripeOptions.style});
    card.mount(this.$refs.card);
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: 'New York',
      zipcode: '',
      
      hasCardErrors: false,
      stripeOptions: {
        style: {
          base: {
            color: '#32325d',
            fontFamily: 'system-ui, BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }
      },
    }
  },
  computed: {
    states: () => ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", " North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]
  },
  methods: {
    pay () {
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.

      stripe.createToken(card).then((result) => {
        if (result.error) {
          this.hasCardErrors = true;
          this.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
        } else {
          // we have payment token
        }
      });
    }
  }
}
</script>

<style scoped>
.StripeElement {
  background-color: white;
  width: 100%;
  padding: 12px 12px;
  border-radius: 4px;
  border: 1px solid #dae1e7;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>