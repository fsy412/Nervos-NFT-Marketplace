<template>
  <div class="mt-10 container">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0 flex-1 justify-center">
          <span class="text-4xl font-bold 5">{{ title }}</span>
          <p class="mt-1 text-sm text-gray-600">{{ description }}</p>
          <div class="flex justify-center">
            <img class="rounded object-cover" style="height: 24rem" :src="`https://ipfs.infura.io/ipfs/${image}`" />
          </div>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="mb-6">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sale type</label>
              <div class="relative inline-flex">
                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                  <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" />
                </svg>
                <select v-model="saleType" class="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                  <option>Choose Type</option>
                  <option value="1">Fixed Price</option>
                  <option value="2">Bid</option>
                </select>
              </div>
            </div>
            <div class="mb-6">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sale price</label>
              <input v-model="price" type="text" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" />
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button v-if="!approved" class="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" @click="onApprove">Approve</button>
            <button v-if="approved" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" @click="onListMarket">List on market</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { isApprovedForAll, setApprovalForAll, createMarketItem, tokenURI, tokenOfOwnerByIndex, createMarketAuction } from '../contract'
import UseWallet from '../wallet'
const { web3, walletGlobal } = UseWallet()

export default {
  data() {
    return {
      nft: null,
      saleType: [],
      approved: false,
      title: '',
      description: '',
      image: '',
    }
  },
  async mounted() {
    this.nft = this.$route.params
    console.log(this.nft)
    this.approved = await isApprovedForAll(walletGlobal.account, this.nft.contractAddress)

    this.title = this.nft.title
    this.description = this.nft.description
    this.image = this.nft.image
  },
  methods: {
    async onListMarket() {
      let price = this.price
      if (this.saleType == 1) {
        console.log('market sale')
        let tx = await createMarketItem(walletGlobal.account, this.nft.contractAddress, this.nft.tokenId, price.toString())
        console.log(tx)
      } else if (this.saleType == 2) {
        console.log('auction sale')
        let floorPrice = '0.01'
        let auctionDays = 1
        let tx = await createMarketAuction(walletGlobal.account, this.nft.contractAddress, this.nft.tokenId, floorPrice, auctionDays)
        console.log(tx)
      }
    },
    async onApprove() {
      let contractAddress = this.nft.contractAddress
      console.log(walletGlobal.account, contractAddress)
      try {
        await setApprovalForAll(walletGlobal.account, true, contractAddress)
        this.approved = true
      } catch (error) {}
    },
  },
}
</script>
