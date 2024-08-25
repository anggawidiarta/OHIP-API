<script setup>
import { nextTick, onMounted, ref } from "vue";
import { useReservationStore } from "@/stores/reservation-store";
import {
  getRatePlanDescription,
  getRoomDescription,
  scrollToSection,
} from "@/utils/helper";

const reservationStore = useReservationStore();

const roomRates = ref(
  reservationStore.hotelAvailabilityData[0].roomStays[0].roomRates
);

const selectRoom = (roomRate) => {
  reservationStore.params.roomType = roomRate.roomType;
  reservationStore.params.ratePlanCode = roomRate.ratePlanCode;
  reservationStore.params.rateStartDate = roomRate.rates.rate[0].start;
  reservationStore.params.rateEndDate = roomRate.rates.rate[0].end;

  console.log(reservationStore.params);
  reservationStore.setReservationStep(2);

  scrollToSection("create-reservation");
  reservationStore.isShowRoomList = false;
  console.log(reservationStore.reservationStep);
};
</script>

<template>
  <p class="text-xl text-white font-semibold text-center">Select Room</p>
  <section class="flex justify-center items-center">
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      data-aos="fade-up"
    >
      <div
        v-for="(roomRate, index) in roomRates"
        :key="index"
        class="shadow-xl card bg-base-100 min-w-72 grow"
      >
        <figure>
          <img src="https://via.placeholder.com/400x300" alt="Room Image" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ getRoomDescription(roomRate.roomType) }}
          </h2>
          <!-- <p>Room Type: {{ roomRate.roomType }}</p> -->
          <p>Rate Plan: {{ getRatePlanDescription(roomRate.ratePlanCode) }}</p>
          <p>
            Price: {{ roomRate.total.amountBeforeTax }}
            {{ roomRate.total.currencyCode }}
          </p>
          <div class="justify-end card-actions">
            <button class="btn btn-primary" @click="selectRoom(roomRate)">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  margin: 1rem;
}
</style>
