<template>
  <div class="mt-10 container">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
          <p class="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.</p>
          <preview :file="file" />
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-gray-50 space-y-6 sm:p-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="company-website" class="block text-sm font-medium text-gray-700">
                  Name
                  <span class="text-red-500">*</span>
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input v-model="title" type="text" name="company-website" id="company-website" class="focus:outline-none flex-1 block w-full rounded-none rounded-r-md sm:text-sm bg-white" placeholder="Name" />
                </div>
              </div>
            </div>

            <div>
              <label for="about" class="block text-sm font-medium text-gray-700"> Description </label>
              <div class="mt-1">
                <textarea v-model="description" id="about" name="about" rows="3" class="shadow-sm focus:ring-blue-500 focus:outline-none mt-1 block w-full sm:text-sm bg-white border-gray-300 rounded-md" placeholder="Description"></textarea>
              </div>
            </div>

            <div>
              <div class="mt-1 flex items-center">
                <div class="relative pt-1 w-5/12">
                  <label for="customRange3" class="form-label text-gray-700">Royalties</label>
                  <input type="range" class="bg-gray-400 form-range appearance-none w-full h-1 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none underline" min="0" max="15" step="1" value="0" @input="onChg($event)" />
                  <label> {{ royalty }}%</label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"> Cover photo </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload image</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="filesChange($event.target.files[0])" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" @click="onCreate">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Preview from '../components/Preview.vue'
import { pinFileToIPFS, pinJSONToIPFS } from '../pinfile'
import { mint } from '../contract'
import UseWallet from '../wallet'
const { web3, walletGlobal } = UseWallet()

export default {
  props: ['contractAddress'],
  components: {
    Preview,
  },
  data() {
    return {
      file: null,
      rawFile: null,
      royalty: 0,
      title: '',
      description: '',
    }
  },
  methods: {
    filesChange(file) {
      this.rawFile = file
      let reader = new FileReader()
      let that = this
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        that.file = this.result
      }
    },
    onChg(ev) {
      this.royalty = ev.target.value
    },
    async onCreate() {
      let metaData = { title: this.title, description: this.description, royalty: this.royalty }
      console.log('metaData', metaData)
      const added = await pinFileToIPFS(this.rawFile)
      const { IpfsHash } = added.data
      console.log('file ipfsHash:', IpfsHash)
      this.$toast.success(`Metadata created hash: ${IpfsHash}`)
      const tokenHash = await pinJSONToIPFS({ ...metaData, image: IpfsHash })
      console.log('token IpfsHassh:', tokenHash.data.IpfsHash)
      let tx = await mint(walletGlobal.account, tokenHash.data.IpfsHash, this.royalty, this.contractAddress)
      this.$toast.success(`Transaction submitted`)
      console.log('tx', tx)
    },
  },
}
</script>
