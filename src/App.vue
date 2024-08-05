<!-- eslint-disable -->
<script setup>
import { ref } from "vue";
import { JsonViewer } from "vue3-json-viewer";
import axios from "axios";

const token = ref("");
const isLoading = ref(true);
const jsonData = ref({});

const {
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_USERNAME,
  VITE_PASSWORD,
  VITE_BASE_URL,
  VITE_APP_KEY,
} = import.meta.env;

//  url: `https://cors-anywhere.herokuapp.com/${VITE_BASE_URL}/oauth/v1/tokens`

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
      withCredentials: true,
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

const getHotelAvailability = async () => {
  try {
    console.log("Access Token:", token.value.access_token); // Log the access token
    const response = await axios({
      url: `http://localhost:5173/api/par/v1/hotels/SUMBA/availability`,
      method: "GET",
      params: {
        roomStayStartDate: "2024-08-05",
        roomStayEndDate: "2024-08-06",
        roomStayQuantity: 2,
        adults: 1,
        children: 0,
        limit: 5,
      },
      headers: {
        "Accept-Language": "*",
        "Content-Type": "application/json",
        "x-app-key": VITE_APP_KEY,
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        "x-hotelid": "SUMBA",
        "x-app-key": VITE_APP_KEY,
        Authorization: "Bearer " + token.value.access_token,
      },
    });
    jsonData.value = response.data;
    console.log(jsonData);
  } catch (error) {
    console.error(
      "Error fetching hotel availability:",
      error.response ? error.response.data : error.message
    );
  } finally {
    console.log(VITE_CLIENT_ID);
  }
};
</script>

<template>
  <div class="flex flex-wrap">
    <div class="mb-10 w-full md:w-8/12">
      <div class="container mx-auto h-full sm:p-10">
        <nav class="flex justify-between items-center px-4">
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
          class="container items-center px-4 mt-10 h-full lg:flex lg:mt-0"
        >
          <div class="w-full">
            <h1 class="text-4xl font-bold capitalize lg:text-6xl">
              Generate Access Token Page
            </h1>
            <div class="my-4 w-20 h-2 bg-green-700"></div>
            <p class="mb-10 text-xl">
              This page is used to generate an access token for your
              application.
            </p>
            <button
              @click="generateAccessToken"
              class="px-4 py-2 my-4 text-2xl font-medium text-white bg-yellow-700 rounded shadow transition-all duration-150 hover:bg-yellow-300"
            >
              Generate Access Token
            </button>
            <p class="mb-2 text-red-500" v-if="!token">
              *You Need To Generate Access Token First To Use These Functions
            </p>
            <p class="mb-2 text-green-500" v-else-if="token">
              " Token Has Been Generated Successfully
            </p>
            <div class="flex flex-col gap-3 w-fit">
              <button
                :disabled="!token ? true : false"
                @click="getHotelAvailability"
                class="px-4 py-2 text-2xl font-medium text-white bg-green-500 rounded shadow"
              >
                Search Hotel Availability
              </button>
              <button
                :disabled="!token ? true : false"
                @click="generateAccessToken"
                class="px-4 py-2 text-2xl font-medium text-white bg-green-500 rounded shadow"
              >
                Generate Access Token
              </button>
              <button
                :disabled="!token ? true : false"
                @click="generateAccessToken"
                class="px-4 py-2 text-2xl font-medium text-white bg-green-500 rounded shadow"
              >
                Generate Access Token
              </button>
              <button
                :disabled="!token ? true : false"
                @click="generateAccessToken"
                class="px-4 py-2 text-2xl font-medium text-white bg-green-500 rounded shadow"
              >
                Generate Access Token
              </button>
            </div>
          </div>
        </header>
      </div>
    </div>
    <div class="w-full flex flex-col md:w-4/12">
      <img
        v-if="!token"
        src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="Leafs"
        class="object-cover w-full h-48 md:h-screen"
      />
      <div v-else class="p-3 h-full">
        <JsonViewer
          :value="token"
          copyable
          expandable
          boxed
          sort
          theme="jv-dark"
        />
      </div>
      <div v-if="jsonData && token" class="p-3 h-full">
        <JsonViewer
          :value="jsonData"
          copyable
          expandable
          boxed
          sort
          theme="jv-dark"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
