<script setup>
import { ref } from "vue";
import { useReservationStore } from "@/stores/reservation-store";
import {
  getRatePlanDescription,
  getRoomDescription,
  scrollToSection,
} from "@/utils/helper";
import { Button } from "@/components/ui/button";

const reservationStore = useReservationStore();

const roomRates = ref(
  reservationStore.hotelAvailabilityData[0]?.roomStays[0]?.roomRates
);

const selectRoom = (roomRate) => {
  reservationStore.params.roomType = roomRate.roomType;
  reservationStore.params.ratePlanCode = roomRate.ratePlanCode;
  reservationStore.params.rateStartDate = roomRate.rates.rate[0].start;
  reservationStore.params.rateEndDate = roomRate.rates.rate[0].end;
  reservationStore.params.amountBeforeTax = roomRate.total.amountBeforeTax;
  reservationStore.params.marketCode = roomRate.marketCode;
  reservationStore.params.sourceCode = roomRate.sourceCode;

  reservationStore.setReservationStep(2);

  scrollToSection("create-reservation");
  reservationStore.isShowRoomList = false;
};
</script>

<template>
  <div class="mx-auto mb-12 space-y-3 max-w-xl sm:text-center">
    <h3 class="font-semibold text-teal-600 dark:text-teal-400">
      Choose Your Ideal Room
    </h3>
    <p class="text-3xl font-semibold text-gray-800 dark:text-white sm:text-4xl">
      Find Your Perfect Retreat
    </p>
    <p>
      Discover the ultimate in luxury and comfort by selecting the room type
      that suits you best. Our streamlined booking process makes it easy and
      memorable.
    </p>
  </div>

  <section class="flex justify-center items-center">
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      data-aos="fade-up"
    >
      <div
        v-for="(roomRate, index) in roomRates"
        :key="index"
        class="shadow-xl card bg-white dark:bg-gray-800 min-w-72 grow"
      >
        <figure>
          <img
            :src="`/img/room/room-${index + 1}.webp`"
            alt="Room Image"
            class="rounded-t-lg max-h-[250px] object-cover w-full h-[250px]"
          />
        </figure>
        <div class="card-body p-4">
          <h2 class="card-title text-gray-800 dark:text-white">
            {{ getRoomDescription(roomRate.roomType) }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ getRatePlanDescription(roomRate.ratePlanCode) }}
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            {{ roomRate.total.amountBeforeTax }}
            {{ roomRate.total.currencyCode }}
          </p>
          <div class="justify-end card-actions mt-4">
            <Button
              class="btn-primary bg-teal-600 tracking-wider hover:bg-teal-700 text-white"
              @click="selectRoom(roomRate)"
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  margin: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
}
.card-body {
  background-color: var(--color-bg);
}
</style>
