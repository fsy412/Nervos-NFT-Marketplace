<template>
  <div class="mb-2">
    <div class="max-w-sm h-80 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div class="mb-1">
        <div class="" ref="img">
          <!-- <img :src="imageUrl" class="h-60 w-full object-center object-cover group-hover:opacity-75" /> -->
        </div>
      </div>
      <div class="px-2">
        <h5 v-if="!loaded" class="h-80 rounded-lg animate-pulse mb-1 text-xl font-bold tracking-tight text-gray-300 bg-gray-300"></h5>
        <h5 v-else class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{{ metaData.title }}</h5>
        <p v-if="!loaded" class="h-10 rounded-lg animate-pulse mb-1 font-normal text-gray-300 bg-gray-300"></p>
        <p v-else class="mb-1 font-normal text-gray-400 dark:text-gray-400 text-center">{{ metaData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getJSONfromHash } from '../pinfile'
export default {
  props: ['metaDataHash'],
  methods: {},
  data() {
    return {
      metaData: {},
      loaded: false,
    }
  },
  async mounted() {
    let metaData = (await getJSONfromHash(this.metaDataHash)).data
    this.metaData = metaData
    const img = this.$refs.img
    let newImg = new Image()
    newImg.className = 'rounded-t-lg object-cover h-60 w-full hover:opacity-75'
    newImg.src = `https://ipfs.infura.io/ipfs/${metaData.image}`
    newImg.onload = () => {
      img.append(newImg)
      this.loaded = true
    }
  },
}
</script>
