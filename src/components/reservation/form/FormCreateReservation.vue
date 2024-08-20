<script setup>
import { useApisStore } from "@/stores/api";
import { notification, showNotification } from "@/utils/notification";
import Swal from "sweetalert2";

const store = useApisStore();

const nextReservationStep = () => {
  if (store.reservationStep < 5) {
    store.reservationStep++;
  }
};

const showReservationNotification = () => {
  Swal.fire({
    title: "Reservation Created",
    text: `Your Reservation Id Is: ${store.reservationId}`,
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Get Reservation Detail",
    cancelButtonText: "Okay",
  }).then((result) => {
    if (result.isConfirmed) {
      store.getReservation();
    }
  });
};

const createReservation = async () => {
  await store.createReservationWithExistingGuest();
  showReservationNotification();
  store.reservationStep = 0;
};
</script>

<template>
  <section
    class="flex justify-center items-center p-12"
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
              v-model="store.params.departureDate"
              type="date"
              required
              name="departureDate"
              id="departureDate"
              title="Departure Date"
              placeholder="Select Departure Date"
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="rateStartDate"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Rate Start Date
            </label>
            <input
              v-model="store.params.startDate"
              type="date"
              required
              name="rateStartDate"
              id="rateStartDate"
              title="Rate Start Date"
              placeholder="Select Rate Start Date"
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="rateEndDate"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Rate End Date
            </label>
            <input
              v-model="store.params.endDate"
              type="date"
              required
              name="rateEndDate"
              id="rateEndDate"
              placeholder="Select Rate End Date"
              title="Rate End Date"
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
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
              for="ratePlanCode"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Rate Plan:
            </label>
            <select
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
              v-model="store.params.ratePlanCode"
              title="Rate Plan"
              required
            >
              <option value="" disabled>Rate Plan:</option>
              <option value="FITRACK">FITRACK</option>
              <option value="FITRACK - ES">FITRACK - ES</option>
            </select>
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="roomType"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Room Type:
            </label>
            <select
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
              v-model="store.params.roomType"
              title="Room Type"
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
              for="guaranteeCode"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Guarantee Code:
            </label>
            <select
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
              v-model="store.params.guaranteeCode"
              title="Guarantee Code"
              required
            >
              <option value="" disabled>Guarantee Code:</option>
              <option value="CC">Credit Card Guaranteed</option>
              <option value="CHECK IN">Checked In</option>
              <option value="DB">Direct Bill Guaranteed</option>
              <option value="DRQ">Deposit Requested</option>
              <option value="DRV">Deposit Received</option>
              <option value="PM">Posting Master Use</option>
            </select>
          </div>
          <!-- TODO: package code not been implemented, because the post request is not required it yet -->
          <div class="col-span-1 mb-5">
            <label
              for="departureDate"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Package Code:
            </label>
            <select
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
              v-model="store.params.packageCode"
              title="Package Code"
              required
            >
              <option value="" disabled>Package Code:</option>
              <option value="SURF">Surf Slot</option>
              <option value="TKT">Flight Ticket</option>
              <option value="VIP ASST">VIP Airport Assistance</option>
            </select>
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="paymentMethod"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Payment Method:
            </label>
            <select
              class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
              v-model="store.params.paymentMethod"
              title="Payment Method"
              required
            >
              <option value="" disabled>Payment Method:</option>
              <option value="AX">American Express</option>
              <option value="BT">Bank Transfer</option>
              <option value="CA">Cash</option>
              <option value="CL">City Ledger</option>
              <option value="MC">MasterCard</option>
              <option value="VA">Visa Card</option>
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
        @submit.prevent="createReservation"
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
              v-model="store.params.children"
              type="number"
              required
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
            :disabled="!store.token"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.reservation-form {
  max-width: 400px;
  margin: auto;
}
</style>
