<script setup>
import { ref } from "vue";

import { useApisStore } from "@/stores/api";

const store = useApisStore();

const nextReservationStep = () => {
  if (store.reservationStep < 5) {
    store.reservationStep++;
  }
};

const reservationStep = ref(1);
const reservation = ref({
  startDate: "",
  endDate: "",
  roomType: "",
  ratePlanCode: "",
});

const nextStep = () => {
  if (reservationStep.value < 3) {
    reservationStep.value++;
  }
};

const submitReservation = () => {
  reservationStep.value = 4;
  // Implementasi untuk menyimpan data ke server bisa ditambahkan di sini
};
</script>

<template>
  <section
    class="flex items-center justify-center p-12"
    id="create-reservation"
  >
    <div
      class="mx-auto w-full md:max-w-5xl xl:max-w-7xl bg-white dark:bg-[#181818] border-2 border-gray-300 dark:border-gray-700 rounded-md p-3"
    >
      <p class="text-2xl font-bold">Create Reservation</p>
      <form
        v-if="store.reservationStep === 1"
        @submit.prevent="nextReservationStep"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1 mb-5">
            <label
              for="arrivalDate"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Arrival Date
            </label>
            <input
              v-model="store.params.arrivalDate"
              type="date"
              required
              name="arrivalDate"
              id="arrivalDate"
              placeholder="Select Arrival Date"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
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
              v-model="store.params.departureDate"
              type="date"
              required
              name="departureDate"
              id="departureDate"
              placeholder="Select Departure Date"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
        </div>
        <div>
          <button
            class="px-8 py-3 text-base font-semibold text-center text-white bg-indigo-600 rounded-md outline-none w-fit hover:shadow-form"
            :disabled="!store.token"
          >
            Next
          </button>
        </div>
      </form>

      <form
        v-if="store.reservationStep === 2"
        @submit.prevent="nextReservationStep"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1 mb-5">
            <label
              for="departureDate"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Rate Plan Code:
            </label>
            <select
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
              v-model="store.params.ratePlanCode"
              title="Rate Plan:"
              required
            >
              <option value="" disabled>Room Type:</option>
              <option value="FITRACK">FITRACK</option>
              <option value="FITRACK - ES">FITRACK - ES</option>
            </select>
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="departureDate"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Room Type Code:
            </label>
            <select
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
              v-model="store.params.roomType"
              title="Room Type:"
              required
            >
              <option value="" disabled>Room Type:</option>
              <option value="KS1B">KS1B</option>
              <option value="KT1B">KT1B</option>
              <option value="LA1B">LA1B</option>
              <option value="LB1B">LB1B</option>
              <option value="MR1B">MR1B</option>
              <option value="RK1B">RK1B</option>
              <option value="WA1B">WA1B</option>
            </select>
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="departureDate"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Guarantee Code:
            </label>
            <select
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
              v-model="store.params.guaranteeCode"
              title="Guarantee Code:"
              required
            >
              <option value="" disabled>Guarantee Code:</option>
              <option value="CC">CC</option>
              <option value="CHECK IN">CHECK IN</option>
              <option value="DB">DB</option>
              <option value="DRQ">DRQ</option>
              <option value="DRV">DRV</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div>
          <button
            class="px-8 py-3 text-base font-semibold text-center text-white bg-indigo-600 rounded-md outline-none w-fit hover:shadow-form"
            :disabled="!store.token"
          >
            Next
          </button>
        </div>
      </form>

      <form
        v-if="store.reservationStep === 3"
        @submit.prevent="nextReservationStep"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1 mb-5">
            <label
              for="adults"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Adults
            </label>
            <input
              v-model="store.params.adults"
              type="number"
              required
              name="adults"
              id="adults"
              placeholder="Enter Adults Count"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
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
              v-model="store.params.children"
              type="number"
              required
              name="children"
              id="children"
              placeholder="Enter Children Count"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
        </div>
        <div>
          <button
            class="px-8 py-3 text-base font-semibold text-center text-white bg-indigo-600 rounded-md outline-none w-fit hover:shadow-form"
            :disabled="!store.token"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  </section>

  <div class="reservation-form hidden" id="reservation-test">
    <!-- Form 1: Tanggal Awal dan Tanggal Akhir -->
    <form v-if="reservationStep === 1" @submit.prevent="nextStep">
      <h2>Pilih Tanggal</h2>
      <label for="start-date">Tanggal Awal:</label>
      <input
        type="date"
        v-model="reservation.startDate"
        id="start-date"
        required
      />

      <label for="end-date">Tanggal Akhir:</label>
      <input type="date" v-model="reservation.endDate" id="end-date" required />

      <button type="submit">Oke</button>
    </form>

    <!-- Form 2: Pilih Jenis Kamar -->
    <form
      v-if="reservationStep === 2"
      @submit.prevent="nextStep"
      data-aos="fade-up"
    >
      <h2>Pilih Jenis Kamar</h2>
      <label for="room-type">Jenis Kamar:</label>
      <select v-model="reservation.roomType" id="room-type" required>
        <option value="" disabled>Pilih jenis kamar</option>
        <option value="standard">Standard</option>
        <option value="deluxe">Deluxe</option>
        <option value="suite">Suite</option>
      </select>

      <button type="submit">Lanjutkan</button>
    </form>

    <!-- Form 3: Pilih Rate Plan Code -->
    <form v-if="reservationStep === 3" @submit.prevent="submitReservation">
      <h2>Pilih Rate Plan Code</h2>
      <label for="rate-plan">Rate Plan Code:</label>
      <select v-model="reservation.ratePlanCode" id="rate-plan" required>
        <option value="" disabled>Pilih rate plan code</option>
        <option value="R1">R1 - Basic Rate</option>
        <option value="R2">R2 - Flexible Rate</option>
        <option value="R3">R3 - Non-refundable Rate</option>
      </select>

      <button type="submit">Simpan</button>
    </form>

    <!-- Konfirmasi -->
    <div v-if="reservationStep === 4">
      <h2>Reservasi Berhasil!</h2>
      <p>Tanggal: {{ reservation.startDate }} - {{ reservation.endDate }}</p>
      <p>Jenis Kamar: {{ reservation.roomType }}</p>
      <p>Rate Plan Code: {{ reservation.ratePlanCode }}</p>
    </div>
  </div>
</template>

<style scoped>
.reservation-form {
  max-width: 400px;
  margin: auto;
}
</style>
