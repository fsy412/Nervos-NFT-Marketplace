<template>
  <div class="border shadow rounded-xl overflow-hidden h-96 flex flex-col">
    <div id="img" class="h-full" style="height: 80%">
      <img class="h-full w-full object-cover rounded-md hover:opacity-75" :src="`https://ipfs.infura.io/ipfs/${image}`" />
    </div>
    <div class="p-3 bg-gray-50 flex flex-col">
      <div class="bg-gray-50">
        <p class="text text-black">Nevers Logo</p>
      </div>
      <div class="bg-gray-50">
        <p class="text-xl font-bold text-black">Price - {{ toEth(price) }} ckETH</p>
      </div>
    </div>
  </div>
</template>

<script>
import UseWallet from '../wallet'
const { web3, walletGlobal } = UseWallet()

export default {
  props: ['tokenURI', 'image', 'price'],
  data() {
    return {}
  },
  methods: {
    toEth(price) {
      return web3.utils.fromWei(price, 'ether')
    },
  },
  mounted() {},
}
</script>
