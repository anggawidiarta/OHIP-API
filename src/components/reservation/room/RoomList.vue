<script setup>
import { ref } from "vue";
import { useReservationStore } from "@/stores/reservation-store";

const reservationStore = useReservationStore();
const roomRates = ref(
  reservationStore.hotelAvailabilityData[0].roomStays[0].roomRates
);

const selectRoom = (roomRate) => {
  // Handle room selection logic here
  console.log("Selected Room:", roomRate);
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-aos="fade-up">
    <div
      v-for="(roomRate, index) in roomRates"
      :key="index"
      class="card bg-base-100 w-96 shadow-xl"
    >
      <figure>
        <img src="https://via.placeholder.com/400x300" alt="Room Image" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ roomRate.roomType }}</h2>
        <p>Rate Plan: {{ roomRate.ratePlanCode }}</p>
        <p>
          Price: {{ roomRate.total.amountBeforeTax }}
          {{ roomRate.total.currencyCode }}
        </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="selectRoom(roomRate)">
            Select
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 1rem;
}
</style>
