<template>
  <main class="container pb-10">
    <div class="mt-2 grid grid-cols-3 text-center">
      <button class="p-2 bg-white text-gray-500 hover:text-white hover:bg-blue-300" @click="tab(1)">
        <span class="flex flex-col content-center justify-center">
          <i class="text-xl fa fa-list"></i>
          OWNED
        </span>
      </button>

      <button class="bg-white text-gray-500 hover:text-white hover:bg-blue-300" @click="tab(2)">
        <span class="flex flex-col content-center justify-center">
          <i class="text-xl fas fa-cart-plus"></i>
          ON SALE
        </span>
      </button>

      <button class="bg-white text-gray-500 hover:text-white hover:bg-blue-300" @click="tab(3)">
        <span class="flex flex-col content-center justify-center">
          <i class="text-2xl fas fa-dollar-sign"></i>
          MY OFFER
        </span>
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4" v-if="num == 1">
      <div v-for="item in myNfts" :key="item.id"><NFTItem :item="item" :showPrice="false" @click="toSell(item)" /></div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4" v-if="num == 2">
      <div v-for="item in myNfts" :key="item.id"><NFTItemOnSale :item="item" :showPrice="false" /></div>
    </div>
  </main>
</template>

<script>
import NFTItem from '../components/NFTItem'
import NFTItemOnSale from '../components/NFTItemOnSale'
import { tokenURI, fetchMyNFT, fetchItemsCreated } from '../contract'
import { getJSONfromHash } from '../pinfile'
import UseWallet from '../wallet'
const { web3, walletGlobal } = UseWallet()

export default {
  components: {
    NFTItem,
    NFTItemOnSale,
  },
  data() {
    return {
      showMyItem: true,
      collections: [],
      num: 1,
      nfts: [],
      myNfts: [],
    }
  },
  async mounted() {
    this.tab(1)
  },
  methods: {
    toSell(item) {
      this.$router.push({ name: 'Sell', params: item })
    },
    onBtnUnlisted(val) {
      console.log('onBtnUnlisted click ', val)
    },
    async tab(index) {
      this.num = index
      this.myNfts = []
      if (index == 1) {
        const res = await fetchMyNFT(walletGlobal.account)
        console.log(res)
        res.map(async (x) => {
          let nft = {}
          nft = Object.assign(nft, x)
          nft.tokenURI = await tokenURI(x.tokenId, x.nftContract)
          Object.assign(nft, (await getJSONfromHash(nft.tokenURI)).data)
          console.log(nft)
          this.myNfts.push(nft)
        })
      }
      if (index == 2) {
        let res = await fetchItemsCreated(walletGlobal.account)
        console.log(res)
        res.map(async (x) => {
          let nft = {}
          nft = Object.assign(nft, x)
          nft.tokenURI = await tokenURI(x.tokenId, x.nftContract)
          Object.assign(nft, (await getJSONfromHash(nft.tokenURI)).data)
          console.log(nft)
          this.myNfts.push(nft)
        })
      }
    },
  },
}
</script>

<style scoped></style>
