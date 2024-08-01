<template>
  <div>
    <button @click="generateAccessToken">generate access token</button>
  </div>
</template>

<!-- eslint-disable -->
<script setup>
import { ref } from "vue";
import apiService from "@/services/apiService";
import axios from "axios";

const {
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_USERNAME,
  VITE_PASSWORD,
  VITE_BASE_URL,
} = import.meta.env;

const generateAccessToken = async () => {
  try {
    const response = await axios({
      url: `${VITE_BASE_URL}/oauth/v1/tokens`,
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
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log(VITE_CLIENT_ID);
  }
};
</script>
