<script setup>
import { onMounted, computed } from "vue";
import { useApisStore } from "@/stores/api";

const store = useApisStore();
onMounted(() => {
  console.log("ReservationView");
  store.generateAccessToken();
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
