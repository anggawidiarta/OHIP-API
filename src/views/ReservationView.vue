<script setup>
import { onMounted, computed, onUnmounted } from "vue";
import { useApisStore } from "@/stores/api";

const store = useApisStore();
let intervalId;

onMounted(() => {
  console.log("ReservationView");
  store.generateAccessToken();
  intervalId = setInterval(() => {
    store.generateAccessToken();
  }, 3600 * 1000); // 3600 * 1000 = 1 hour in milliseconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="about">
    <h1 class="text-red-500 font-bold">This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
