<template>
  <div>
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid rounded-t">
            <h3 class="text-2xl font-semibold">Place a bid</h3>
            <button class="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none " v-on:click="toggleModal()">
              <span class="h-6 w-6 text-2xl block outline-none focus:outline-none"> × </span>
            </button>
          </div>
          <!--body-->
          <div class="relative flex-auto">
            <div class="shadow sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3 sm:col-span-2">
                    <label for="company-website" class="block text-sm font-medium text-gray-700"> Bid price </label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input type="text" class="bg-gray-200  p-2 focus:outline-none flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 text-xl" placeholder="price" />
                    </div>
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="p-2 min-w-full bg-blue-300 rounded-lg text-white">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: 'large-modal',
  data() {
    return {
      showModal: true,
    }
  },
  methods: {
    toggleModal: function () {
      this.$emit('close')
    },
  },
}
</script>
