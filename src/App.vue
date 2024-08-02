<template>
  <div class="flex flex-wrap">
    <div class="w-full sm:w-8/12 mb-10">
      <div class="container mx-auto h-full sm:p-10">
        <nav class="flex px-4 justify-between items-center">
          <div class="text-4xl font-bold">
            Test - Get Access Token<span class="text-green-700">.</span>
          </div>
          <div>
            <img
              src="https://image.flaticon.com/icons/svg/497/497348.svg"
              alt=""
              class="w-8"
            />
          </div>
        </nav>
        <header
          class="container px-4 lg:flex mt-10 items-center h-full lg:mt-0"
        >
          <div class="w-full">
            <h1 class="text-4xl lg:text-6xl font-bold">
              Generate Access Token for your application
            </h1>
            <div class="w-20 h-2 bg-green-700 my-4"></div>
            <p class="text-xl mb-10">
              This page is used to generate an access token for your
              application.
            </p>
            <button
                @click="generateAccessToken"
                class="bg-yellow-500 my-4 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Generate Access Token
              </button>
              <p class="text-red-500 mb-2">*You Need To Generate Access Token First To Use These Functions</p>
            <div class="grid grid-cols-2 w-fit gap-3">
              <button
                :disabled="!token?true:false"
                @click="generateAccessToken"
                class="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Generate Access Token
              </button>
              <button
              :disabled="!token?true:false"

                @click="generateAccessToken"
                class="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Generate Access Token
              </button>
              <button
              
              :disabled="!token?true:false"
              @click="generateAccessToken"
                class="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Generate Access Token
              </button>
              <button
              :disabled="!token?true:false"
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
    <img
      src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      alt="Leafs"
      class="w-full h-48 object-cover sm:h-screen sm:w-4/12"
    />
  </div>
</template>

<!-- eslint-disable -->
<script setup>
import { ref } from "vue";
import apiService from "@/services/apiService";
import axios from "axios";

const token = ref("");

const {
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_USERNAME,
  VITE_PASSWORD,
  VITE_BASE_URL,
} = import.meta.env;
//  url: `https://cors-anywhere.herokuapp.com/${VITE_BASE_URL}/oauth/v1/tokens`

//`http://localhost:5173/api/oauth/v1/tokens`
const generateAccessToken = async () => {
  try {
    const response = await axios({
      url: `${VITE_BASE_URL}/api/oauth/v1/tokens`,
      method: "POST",
      data: {
        username: VITE_USERNAME,
        password: VITE_PASSWORD,
        grant_type: "password",
      },
      auth: {
        username: VITE_CLIENT_ID,
        password: VITE_CLIENT_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
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
