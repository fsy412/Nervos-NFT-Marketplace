<template>
  <div class="bg">
    <div class="upperEmpty">
      <h1 class="text-white text-6xl pt-24 pl-20">Nervos NFT Marketplace</h1>
      <p class="text-white ml-20 mt-3 text-3xl">Powered by Godwoken Layer2</p>
      <div class="pt-12">
        <button class="ml-20 bg-gray-700 text-white py-2 px-10 rounded-sm" href="#explore" @click="showExplore">Explore</button>
        <button class="ml-3 bg-gray-200 py-2 px-20 rounded-sm text-gray-800" href="#explore" @click="onCreate">Create</button>
      </div>
    </div>
    <div ref="main" class="container overflow-auto overflow-y-auto list">
      <p ref="explore" class="mt-5 mb-3 text-4xl ml-6 font-bold text-center">Explore All NFTs</p>
      <div v-if="loaded" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 pb-10">
        <div v-for="item in nfts" :key="item.id"><MarketItem :tokenURI="item.tokenURI" :image="item.image" :price="item.price" @click="toBuy(item)" /></div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <div v-for="i in emptyList" :key="i" class="h-96 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMarketItems, tokenURI } from '../contract'
import { getJSONfromHash } from '../pinfile'
import MarketItem from '../components/MarketItem.vue'
import UseWallet from '../wallet'
const { connect, walletGlobal } = UseWallet()

export default {
  components: {
    MarketItem,
  },
  data() {
    return {
      nfts: [],
      emptyList: [{}, {}, {}, {}, {}, {}, {}, {}],
      loaded: false,
    }
  },
  methods: {
    toBuy(nft) {
      this.$router.push({ path: `/buy/${nft.tokenId}/${nft.nftContract}/${nft.price}/${nft.creator}/${nft.isAuction}/${nft.itemId}` })
    },
    showExplore() {
      this.$nextTick(function () {
        window.scrollTo({ behavior: 'smooth', top: this.$refs.explore.offsetTop })
      })
    },
    async onCreate() {
      if (walletGlobal.account == '') {
        await connect()
        this.$store.dispatch('updateLoginAccount', { account: walletGlobal.account })
      }
      this.$router.push({ path: '/create' })
    },
  },
  async mounted() {
    let res = await fetchMarketItems()
    Promise.all(
      res[0].map(async (item) => {
        let nft = {}
        Object.assign(nft, item)
        nft.tokenURI = await tokenURI(item.tokenId, item.nftContract)
        Object.assign(nft, (await getJSONfromHash(nft.tokenURI)).data)
        this.nfts.push(nft)
        console.log('nft:', nft)
      })
    )
    this.loaded = true
  },
}
</script>
<style scoped>
.upperEmpty {
  height: 100vh;
}
.list {
  height: 100vh;
}
.bg {
  height: 100vh;
  background: url(/nervos-shapes-bg.jpg);
  background-repeat: no-repeat;
}
</style>
