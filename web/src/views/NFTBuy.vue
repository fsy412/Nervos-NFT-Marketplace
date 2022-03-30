<template>
  <div class="container flex flex-row mt-10 pb-20">
    <div style="width: 60%">
      <div>
        <img :src="`https://ipfs.infura.io/ipfs/${image}`" class="rounded object-scale m-auto" />
      </div>
    </div>
    <div style="width: 40%">
      <span class="text-4xl font-bold">{{ title }}</span>
      <div class="mt-2 border-gray-200 sm:rounded-md sm:overflow-hidden">
        <div class="py-5 bg-white space-y-2">
          <div>
            <div class="text-gray-500"><span>Collections</span></div>
            <div class="cursor-pointer font-bold" @click="$router.push({ path: `/nfts/${nftContract}/${creator}/${metaDataHash}` })">{{ nftContract }}</div>
          </div>
          <div>
            <div class="text-gray-500">Description</div>
            <div class="">{{ description }}</div>
          </div>
          <div>
            <div class="text-gray-500">Creator</div>
            <div class="">{{ creator }}</div>
          </div>
          <div>
            <div class="text-gray-500">Royalties</div>
            <div class="">{{ royalty }}%</div>
          </div>
          <div>
            <div class="text-gray-500">Price</div>
            <div class="">{{ price }} ckETH</div>
          </div>
          <div>
            <div class="mt-6">
              <button v-if="isAuction" class="px-10 py-2 bg-blue-400 text-white rounded-lg" @click="onBid">Place a bid</button>
              <button v-else class="px-10 py-2 bg-blue-400 text-white rounded-lg" @click="onBuy">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @close="showModal = false" />
</template>
<script>
import UseWallet from '../wallet'
import { buyNFT, tokenURI, getCollectionByContract } from '../contract'
const { web3, walletGlobal } = UseWallet()
import { getJSONfromHash } from '../pinfile'

import Modal from '../components/Modal.vue'

export default {
  props: ['tokenId', 'nftAddress', 'creator', 'image', 'itemId'],
  components: {
    Modal,
  },
  data() {
    return {
      openTab: 1,
      creator: '',
      price: 0,
      royalty: 0,
      nftContract: '',
      itemId: '',
      image: '',
      title: '',
      description: '',
      metaDataHash: '',
      isAuction: false,
      showModal: false,
    }
  },
  async mounted() {
    console.log('NFTBuy.vue', this.$route.params)
    let tokenURI_ = await tokenURI(this.$route.params.tokenId, this.$route.params.nftAddress)
    let metaData = (await getJSONfromHash(tokenURI_)).data
    this.creator = this.$route.params.creator
    this.price = web3.utils.fromWei(this.$route.params.price, 'ether')
    this.nftContract = this.$route.params.nftAddress
    this.image = metaData.image
    this.title = metaData.title
    this.description = metaData.description
    this.royalty = metaData.royalty
    this.isAuction = this.$route.params.isAuction == 'true'
    this.itemId = this.$route.params.itemId

    let collection = await getCollectionByContract(this.nftContract)
    this.metaDataHash = collection.metaDataHash
  },
  methods: {
    toggleTabs(tabNumber) {
      this.openTab = tabNumber
    },
    async onBuy() {
      console.log('onBuy', walletGlobal.account, this.nftContract, this.itemId, this.price)
      let tx = await buyNFT(walletGlobal.account, this.nftContract, this.itemId, this.price)
      console.log(tx)
    },
    async onBid() {
      this.showModal = true
      // let tx = await createAuctionBid(walletGlobal.account, this.itemId, this.price)
      // console.log(tx)
    },
  },
}
</script>

<style scoped></style>
