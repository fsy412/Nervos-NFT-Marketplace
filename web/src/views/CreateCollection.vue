<template>
  <div class="my-10 container">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1"></div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label
                  for="company-website"
                  class="block text-sm font-medium text-gray-700"
                >
                  Name
                  <span class="text-red-500">*</span>
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    v-model="name"
                    class="focus:ring-indigo-500 focus:border-none flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="Name"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label
                  for="company-website"
                  class="block text-sm font-medium text-gray-700"
                >
                  Symbol
                  <span class="text-red-500">*</span>
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    v-model="symbol"
                    class="focus:ring-indigo-500 focus:border-none flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="Symbol"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label
                  for="company-website"
                  class="block text-sm font-medium text-gray-700"
                >
                  Title
                  <span class="text-red-500">*</span>
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    v-model="title"
                    class="focus:ring-indigo-500 focus:border-none flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="Title"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div class="mt-1">
                <textarea
                  v-model="description"
                  rows="3"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Cover photo
              </label>
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <!--SUCCESS-->
                  <div v-if="isSuccess">
                    <ul class="list-unstyled">
                      <li v-for="file in coverFile" :key="file.id">
                        <img :src="file.url" :alt="file.originalName" />
                      </li>
                    </ul>
                  </div>

                  <div
                    v-if="showUploadCover"
                    class="flex text-sm text-gray-600"
                  >
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <input
                        id="file-upload"
                        multiple
                        :name="uploadFieldName"
                        type="file"
                        class="sr-only"
                        @change="
                          coverFileChange(
                            $event.target.name,
                            $event.target.files
                          )
                        "
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <!--FAILED-->
              <div v-if="isFailed">
                <h2>Uploaded failed.</h2>
                <p>
                  <a href="javascript:void(0)" @click="reset()">Try again</a>
                </p>
                <pre>{{ uploadError }}</pre>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Banner
              </label>
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <!--SUCCESS-->
                  <div v-if="isSuccess">
                    <ul class="list-unstyled">
                      <li v-for="file in bannerFile" :key="file.id">
                        <img :src="file.url" :alt="file.originalName" />
                      </li>
                    </ul>
                  </div>

                  <div
                    v-if="showUploadBanner"
                    class="flex text-sm text-gray-600"
                  >
                    <label
                      for="file-upload2"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <input
                        id="file-upload2"
                        multiple
                        :name="uploadFieldName"
                        type="file"
                        class="sr-only"
                        @change="
                          bannerFileChange(
                            $event.target.name,
                            $event.target.files
                          )
                        "
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="onCreate"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createCollection } from "../contract";
import { upload } from "../file_upload";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { pinFileToIPFS, pinJSONToIPFS } from "../pinfile";

import UseWallet from "../wallet";
const { web3, walletGlobal } = UseWallet();

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "create_collection",
  data() {
    return {
      coverFile: [],
      bannerFile: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos",
      uploadLogo: "photos",
      file: null,
      title: "",
      subtitle: "",
      description: "",
      coverImgHash: "",
      bannerImgHash: "",
      showUploadCover: true,
      showUploadBanner: true,
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },

  methods: {
    saveCover(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      upload(formData)
        .then((x) => {
          this.coverFile = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch((err) => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    saveBanner(formData) {
      this.currentStatus = STATUS_SAVING;
      upload(formData)
        .then((x) => {
          this.bannerFile = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch((err) => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    async coverFileChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      this.file = fileList[0];
      this.showUploadCover = false;
      this.saveCover(formData);
      try {
        const added = await pinFileToIPFS(this.file);
        this.coverImgHash = added.data.IpfsHash;
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    },
    async bannerFileChange(fieldName, fileList) {
      console.log("00000 bannerFileChange");
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      this.file = fileList[0];
      this.showUploadBanner = false;
      this.saveBanner(formData);
      try {
        console.log("111111 bannerFileChange");
        const added = await pinFileToIPFS(this.file);
        console.log("added", added.data.IpfsHash, added);
        this.bannerImgHash = added.data.IpfsHash;
      } catch (error) {
        console.log("Error uploading banner file: ", error);
      }
    },
    async onCreate() {
      console.log(
        "create collection:",
        this.title,
        this.subtitle,
        this.description
      );
      let creationValue = 20;
      const jsonHash = await pinJSONToIPFS({
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        image: this.coverImgHash,
        banner: this.bannerImgHash,
      });
      console.log("jsonHash", jsonHash);
      // this.$toast.success(`Metadata created hash: ${jsonHash}`)
      let tx = await createCollection(
        walletGlobal.account,
        this.name,
        this.symbol,
        jsonHash.data.IpfsHash,
        creationValue
      );
      console.log("tx", tx);
      this.$toast.success(`Collection created`);
    },
  },
};
</script>
