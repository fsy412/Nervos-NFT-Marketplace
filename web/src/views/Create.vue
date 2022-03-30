<template>
  <main ref="main" class="overflow-auto overflow-y-auto container">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
      <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 h-80">
        <div class="px-8 py-6 flex flex-col justify-center text-center">
          <div class="font-bold text-xl mb-2 py-4">Create New Collection</div>
          <div class="mt-1 flex justify-center px-3 pt-2 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
          <div class="py-4">
            <button class="mt-4 p-3 bg-blue-400 text-white rounded" @click="$router.push({ path: 'create_collection' })">Create New Collection</button>
          </div>
        </div>
      </div>
      <router-link :to="`/nfts/${item.contractAddress}/${item.creator}/${item.metaDataHash}`" v-for="item in collections" :key="item.id"><CollectionItem :metaDataHash="item.metaDataHash" /> </router-link>
    </div>
  </main>
</template>
<script>
import { getUserCollections } from '../contract'
import CollectionItem from '../components/CollectionItem'
import UseWallet from '../wallet'
const { web3, walletGlobal } = UseWallet()

export default {
  components: {
    CollectionItem,
  },
  data() {
    return {
      collections: [],
    }
  },
  async mounted() {
    let list = await getUserCollections(walletGlobal.account)
    this.collections = list.filter((item) => item.metaDataHash != '')
    console.log('Create.vue', this.collections)
  },
  methods: {},
}
</script>
