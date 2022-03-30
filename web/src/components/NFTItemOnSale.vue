<template>
  <div class="border shadow rounded-xl overflow-hidden h-96 flex flex-col">
    <div class="h-4/5" ref="img"></div>
    <div class="h-1/5 bg-gray-50 flex justify-between items-center w-full">
      <div>
        <span v-if="showPrice" class="px-2 text-xl font-bold text-black">Price - {{ 0 }} Eth</span>
      </div>
      <button class="mr-5" @click="onList">UnList</button>
    </div>
  </div>
</template>
<script>
import UseWallet from '../wallet'
import { unlistItem } from '../contract'
const { web3, walletGlobal } = UseWallet()

export default {
  props: ['item', 'showPrice'],
  created() {},
  methods: {},
  data() {
    return {
      loaded: false,
      url: ``,
    }
  },
  mounted() {
    console.log('nft item on sale', this.item)
    const img = this.$refs.img
    this.loaded = false
    let newImg = new Image()
    newImg.src = `https://ipfs.infura.io/ipfs/${this.item.image}`
    newImg.className = 'w-full h-full object-cover'
    newImg.onload = () => {
      img.append(newImg)
      this.url = newImg.src
      this.loaded = true
    }
  },
  methods: {
    async onList() {
      console.log('onList', this.item.itemId)
      await unlistItem(walletGlobal.account, this.item.itemId)
    },
  },
}
</script>
<style scoped></style>
