<script setup>
import { useApisStore } from "@/stores/api";
import { useReservationStore } from "@/stores/reservation-store";
import Swal from "sweetalert2";

const reservationStore = useReservationStore();

const handleSubmit = async () => {
  await reservationStore.getHotelAvailability();
  if (
    reservationStore.hotelAvailabilityData[0].roomStays[0].roomRates.length > 0
  ) {
    console.log(
      reservationStore.hotelAvailabilityData[0].roomStays[0].roomRates.length
    );
    Swal.fire({
      title: "Hotel Availability Loaded",
      text: "Please select a room from the available options.",
      icon: "success",
      confirmButtonText: "Okay",
    });
  } else {
    Swal.fire({
      title: "Hotel Availability Not Loaded",
      text: "No rooms are available for the selected dates.",
      icon: "error",
      confirmButtonText: "Okay",
    });
  }
};

// const nextReservationStep = () => {
//   if (store.reservationStep < 5) {
//     store.reservationStep++;
//   }
// };

// const showReservationNotification = () => {
//   Swal.fire({
//     title: "Reservation Created",
//     text: `Your Reservation Id Is: ${store.reservationId}`,
//     icon: "success",
//     showCancelButton: true,
//     confirmButtonText: "Get Reservation Detail",
//     cancelButtonText: "Okay",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       store.getReservation();
//     }
//   });
// };

// const createReservation = async () => {
//   await store.createReservationWithExistingGuest();
//   showReservationNotification();
//   store.reservationStep = 0;
// };
</script>

<template>
  <section
    class="flex justify-center items-center p-12"
    id="create-reservation"
  >
    <div
      class="mx-auto w-full md:max-w-5xl xl:max-w-7xl bg-white dark:bg-[#181818] border-2 border-gray-300 dark:border-gray-700 rounded-md p-3"
    >
      <form
        data-aos="fade-up"
        data-aos-duration="1500"
        @submit.prevent="handleSubmit"
      >
        <p class="text-2xl font-bold">How Long Do You Wanna Stay ?</p>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1 mb-5">
            <label
              for="arrivalDate"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Arrival Date
            </label>
            <input
              type="date"
              v-model="reservationStore.params.roomStayStartDate"
              required
              name="arrivalDate"
              id="arrivalDate"
              title="Arrival Date"
              placeholder="Select Arrival Date"
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="departureDate"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Departure Date
            </label>
            <input
              type="date"
              required
              v-model="reservationStore.params.roomStayEndDate"
              name="departureDate"
              id="departureDate"
              title="Departure Date"
              placeholder="Select Departure Date"
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="adults"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Adults
            </label>
            <input
              type="number"
              v-model="reservationStore.params.adults"
              required
              disabled
              name="adults"
              id="adults"
              placeholder="Enter Adults Count"
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="children"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Children
            </label>
            <input
              type="number"
              v-model="reservationStore.params.children"
              required
              disabled
              name="children"
              id="children"
              placeholder="Enter Children Count"
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
        </div>
        <div>
          <button
            class="px-8 py-3 text-base font-semibold text-center text-white bg-indigo-600 rounded-md outline-none w-fit hover:shadow-form"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
