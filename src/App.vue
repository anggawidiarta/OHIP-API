<template>
  <div class="flex flex-wrap">
    <div class="w-full md:w-8/12 mb-10">
      <div class="container mx-auto h-full sm:p-10">
        <nav class="flex px-4 justify-between items-center">
          <div class="text-4xl font-bold">
            OHIP Test - Get Access Token<span class="text-green-700">.</span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                class="hover:fill-green-500"
                fill-rule="evenodd"
                d="M12.667 6.542A3.208 3.208 0 0 1 8.86 9.694l-.438.492a.44.44 0 0 1-.327.147h-.678v.73a.437.437 0 0 1-.438.437H6.25v.73a.437.437 0 0 1-.437.437H3.77a.437.437 0 0 1-.438-.438v-1.423a.44.44 0 0 1 .128-.31l2.95-2.949a3.208 3.208 0 0 1 3.047-4.214a3.2 3.2 0 0 1 3.209 3.209m-3.209-.875a.875.875 0 1 0 1.75 0a.875.875 0 0 0-1.75 0"
              />
            </svg>
          </div>
        </nav>
        <header
          class="container px-4 lg:flex mt-10 items-center h-full lg:mt-0"
        >
          <div class="w-full">
            <h1 class="text-4xl lg:text-6xl font-bold capitalize">
              Generate Access Token Page
            </h1>
            <div class="w-20 h-2 bg-green-700 my-4"></div>
            <p class="text-xl mb-10">
              This page is used to generate an access token for your
              application.
            </p>
            <button
              @click="generateAccessToken"
              class="bg-yellow-700 hover:bg-yellow-300 my-4 text-white text-2xl font-medium px-4 py-2 rounded shadow transition-all duration-150"
            >
              Generate Access Token
            </button>
            <p class="text-red-500 mb-2" v-if="!token">
              *You Need To Generate Access Token First To Use These Functions
            </p>
            <p class="text-green-500 mb-2" v-else-if="token">
              " Token Has Been Generated Successfully
            </p>
            <div class="flex flex-col w-fit gap-3">
              <button
                :disabled="!token ? true : false"
                @click="generateAccessToken"
                class="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Generate Access Token
              </button>
              <button
                :disabled="!token ? true : false"
                @click="generateAccessToken"
                class="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Generate Access Token
              </button>
              <button
                :disabled="!token ? true : false"
                @click="generateAccessToken"
                class="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Generate Access Token
              </button>
              <button
                :disabled="!token ? true : false"
                @click="generateAccessToken"
                class="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Generate Access Token
              </button>
            </div>
          </div>
        </header>
      </div>
    </div>
    <div class="w-full md:w-4/12">
      <img
        v-if="!token"
        src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="Leafs"
        class="w-full h-48 object-cover md:h-screen"
      />
      <div v-else class="p-3 h-full">
        <JsonViewer :value="token" copyable expandable boxed sort theme="jv-light"/>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable -->
<script setup>
import { ref } from "vue";
import { JsonViewer } from "vue3-json-viewer";
import apiService from "@/services/apiService";
import axios from "axios";

const token = ref("");

const {
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_USERNAME,
  VITE_PASSWORD,
  VITE_BASE_URL,
  VITE_APP_KEY,
} = import.meta.env;
//  url: `https://cors-anywhere.herokuapp.com/${VITE_BASE_URL}/oauth/v1/tokens`

//`http://localhost:5173/api/oauth/v1/tokens`
const generateAccessToken = async () => {
  try {
    const response = await axios({
      url: `http://localhost:5173/api/oauth/v1/tokens`,
      method: "POST",
      data: {
        username: VITE_USERNAME,
        password: VITE_PASSWORD,
        grant_type: "password",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        "x-app-key": VITE_APP_KEY,
        Authorization:
          "Basic " + btoa(VITE_CLIENT_ID + ":" + VITE_CLIENT_SECRET),
      },
    });
    token.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log(VITE_CLIENT_ID);
  }
};
</script>
