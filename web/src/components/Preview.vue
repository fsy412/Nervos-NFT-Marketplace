<template>
  <div class="mx-auto m-8 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
    <div>
      <img class="object-center object-cover h-96" :src="file" alt="photo" />
      <div class="flex flex-col">
        <div>
          <p class="ml-2 mt-2 text-md text-gray-600 font-normal">description</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      default: null,
    },
  },
}
</script>
