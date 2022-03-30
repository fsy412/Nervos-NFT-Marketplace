<template>
  <nav class="bg-white border-b p-2 flex justify-between items-center">
    <a href="#" class="flex ml-5">
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="50.000000pt" height="50.000000pt" viewBox="0 0 200.000000 200.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path
            d="M1247 1493 c-4 -3 -7 -125 -7 -269 l0 -263 -95 -3 -95 -3 225 -225
225 -225 0 498 0 497 -123 0 c-68 0 -127 -3 -130 -7z"
          />
          <path
            d="M500 997 l0 -498 128 3 127 3 3 267 2 267 95 3 95 3 -225 225 -225
225 0 -498z"
          />
        </g>
      </svg>
      <span class="ml-1 self-center text-2xl font-semibold whitespace-nowrap dark:text-white" @click="$router.push({ name: 'Index' })">Nervos Marketplace</span>
    </a>
    <div class="flex mt-2 item-center mr-4 justify-items-center">
      <!-- <router-link to="/"><a class="mr-4 text-gray-500 font-semibold"> Explore </a></router-link> -->
      <div v-if="account != 'connect to wallet'">
        <router-link to="/create"><a class="mr-4 text-gray-500 font-semibold"> Create </a></router-link>
        <router-link to="/wallet"> <a class="mr-4 text-gray-500 font-semibold">Wallet </a></router-link>
      </div>
      <router-link to="#">
        <a class="px-4 py-2 text-gray-500 rounded mr-6text-gray-500 font-semibold hover:text-white hover:bg-blue-400" @click="onConnectWallet()">{{ account }} </a></router-link
      >
    </div>
  </nav>
</template>

<script>
import UseWallet from '../wallet'
const { connect, web3, walletGlobal } = UseWallet()

export default {
  data() {
    return {
      btnTxt: '',
      isVisible: false,
    }
  },
  computed: {
    walletTxt() {
      if (walletGlobal.account != '') {
        return walletGlobal.account
      }
    },
    account() {
      if (this.$store.getters.getAccount == '') return 'connect to wallet'
      let val = this.$store.getters.getAccount
      return val.substring(0, 6) + '...' + val.substring(val.length - 4, val.length)
    },
  },
  components: {},
  methods: {
    async onConnectWallet() {
      await connect()
      console.log('onConnectWallet', walletGlobal.account)
      this.$store.dispatch('updateLoginAccount', { account: walletGlobal.account })
    },
  },
}
</script>

<style scoped>
.text-primary {
  --tw-text-opacity: 1;
  color: rgba(120, 214, 75, var(--tw-text-opacity));
}
</style>
