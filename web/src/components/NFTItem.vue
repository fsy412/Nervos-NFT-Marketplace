<template>
  <div class="border shadow rounded-xl overflow-hidden h-96 flex flex-col">
    <div class="h-4/5" ref="img"></div>
    <div class="h-1/5 bg-gray-50 flex justify-between items-center w-full">
      <div>
        <span v-if="showPrice" class="px-2 text-xl font-bold text-black">Price - {{ 0 }} Eth</span>
      </div>
      <button class="mr-5 ont-bold">Sell</button>
    </div>
  </div>
</template>
<script>
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
    const img = this.$refs.img
    this.loaded = false
    let newImg = new Image()
    newImg.src = `https://cloudflare-ipfs.com/ipfs/${this.item.image}`
    newImg.className = 'w-full h-full object-cover'
    newImg.onload = () => {
      console.log('done')
      img.append(newImg)
      this.url = newImg.src
      this.loaded = true
    }
  },
}
</script>
<style scoped>
</style>