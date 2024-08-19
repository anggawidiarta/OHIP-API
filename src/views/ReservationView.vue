<script setup>
import { onMounted, computed, onUnmounted } from "vue";
import { useApisStore } from "@/stores/api";
import { RouterLink } from "vue-router";

import FeatureSection from "@/components/reservation/FeatureSection.vue";
import ReservationFooter from "@/components/reservation/ReservationFooter.vue";
import ReservationHero from "@/components/reservation/ReservationHero.vue";
import ReservationAboutUs from "@/components/reservation/ReservationAboutUs.vue";
import ReservationMetric from "@/components/reservation/ReservationMetric.vue";
import FormCreateReservation from "@/components/reservation/form/FormCreateReservation.vue";
import FormComponent from "@/components/FormComponent.vue";

const store = useApisStore();
let intervalId;

onMounted(() => {
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
  <!-- Header -->
  <div class="navbar">
    <div class="flex-1">
      <a class="text-2xl btn btn-ghost">Reservation Authorization</a>
    </div>
    <div class="flex-none">
      <ul class="px-1 menu menu-horizontal">
        <li>
          <RouterLink class="text-xl" to="/">Home</RouterLink>
        </li>
      </ul>
    </div>
  </div>

  <!-- #region Hero Section -->
  <ReservationHero />
  <!-- #endregion -->

  <FormCreateReservation v-if="store.reservationStep > 0" />

  <!-- #region create guest profile -->
  <section class="flex items-center justify-center p-12" id="create-profile">
    <!-- Author: FormBold Team -->
    <div
      class="mx-auto w-full md:max-w-5xl xl:max-w-7xl bg-white dark:bg-[#181818] border-2 border-gray-300 dark:border-gray-700 rounded-md p-3"
    >
      <p class="text-2xl font-bold">Create Guest Profile</p>
      <p
        v-if="store.guestProfileId"
        class="mt-4 mb-6 text-lg text-green-600 dark:text-green-400"
      >
        Guest Profile Id: {{ store.guestProfileId }}
      </p>
      <p
        v-if="store.errorGuestProfilesMessage"
        class="mt-4 mb-6 text-lg text-red-500 dark:text-red-400"
      ></p>
      <form @submit.prevent="store.postGuestProfile">
        <div class="mb-5">
          <label
            for="guestGivenName"
            class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            First Name
          </label>
          <input
            v-model="store.params.guestGivenName"
            type="text"
            required
            name="guestGivenName"
            id="guestGivenName"
            placeholder="First Name"
            class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestMiddleName"
            class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Middle Name (Optional)
          </label>
          <input
            v-model="store.params.guestMiddleName"
            type="text"
            name="guestMiddleName"
            id="guestMiddleName"
            placeholder="Middle Name"
            class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestSurName"
            class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Last Name
          </label>
          <input
            v-model="store.params.guestSurName"
            type="text"
            name="guestSurName"
            required
            id="guestSurName"
            placeholder="Last Name"
            class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1 mb-5">
            <label
              for="guestNameSuffix"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Name Suffix
            </label>
            <input
              v-model="store.params.guestNameSuffix"
              type="text"
              name="guestNameSuffix"
              id="guestNameSuffix"
              placeholder="Name Suffix"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="guestNameTitle"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Name Title
            </label>
            <input
              v-model="store.params.guestNameTitle"
              type="text"
              name="guestNameTitle"
              required
              id="guestNameTitle"
              placeholder="Name Title"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-x-4">
          <div class="mb-5 lg:col-span-1 col-span-full">
            <label
              for="guestEnveloperGreeting"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Envelope Greeting (Optional)
            </label>
            <input
              v-model="store.params.guestEnveloperGreeting"
              type="text"
              name="guestEnveloperGreeting"
              id="guestEnveloperGreeting"
              placeholder="Envelope Greeting"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
          <div class="mb-5 lg:col-span-1 col-span-full">
            <label
              for="guestSalutation"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Salutation (Optional)
            </label>
            <input
              v-model="store.params.guestSalutation"
              type="text"
              name="guestSalutation"
              id="guestSalutation"
              placeholder="Salutation"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1 mb-5">
            <label
              for="guestLanguage"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Language
            </label>
            <input
              v-model="store.params.guestLanguage"
              type="text"
              required
              name="guestLanguage"
              id="guestLanguage"
              placeholder="Language"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
          <div class="col-span-1 mb-5">
            <label
              for="guestNationality"
              class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Nationality
            </label>
            <input
              v-model="store.params.guestNationality"
              type="text"
              required
              name="guestNationality"
              id="guestNationality"
              placeholder="Nationality"
              class="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
            />
          </div>
        </div>
        <!-- <div class="mb-5">
          <label
            for="markForHistory"
            class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Mark for History
          </label>
          <input
            v-model="store.params.markForHistory"
            type="checkbox"
            name="markForHistory"
            id="markForHistory"
            class="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
          />
        </div> -->
        <div>
          <button
            class="w-full px-8 py-3 text-base font-semibold text-center text-white bg-indigo-600 rounded-md outline-none hover:shadow-form"
            :disabled="!store.token"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
  <!-- #endregion -->

  <!-- #region create reservation -->
  <!-- TODO: hide reservation guest profile id later -->
  <FormComponent
    formClass="grid grid-cols-1 gap-4 w-full md:max-w-5xl xl:max-w-7xl w-full p-12 lg:p-0 mx-auto border-green-500 lg:grid-cols-2 xl:grid-cols-3"
    buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-blue-500 rounded shadow w-fit"
    buttonText="Create Reservation"
    :errorMessage="store.errorMessage"
    @submit="store.createReservationWithExistingGuest"
  >
    <h3 class="text-xl font-semibold col-span-full">Form Create Reservation</h3>
    <label class="flex items-center gap-2 input input-bordered">
      Guest Profile ID:
      <input
        disabled
        required
        type="text"
        v-model="store.guestProfileId"
        class="grow"
      />
    </label>
    <label class="flex items-center gap-2 input input-bordered">
      Rate Start Date:
      <input type="date" v-model="store.params.startDate" class="grow" />
    </label>
    <label class="flex items-center gap-2 input input-bordered">
      Rate End Date:
      <input type="date" v-model="store.params.endDate" class="grow" />
    </label>
    <label class="flex items-center gap-2 input input-bordered">
      Room Type Charged:
      <input type="text" v-model="store.params.roomTypeCharged" class="grow" />
    </label>
    <label class="flex items-center gap-2 input input-bordered">
      Rate Plan Code:
      <input
        type="text"
        v-model="store.params.ratePlanCode"
        class="grow"
        required
      />
    </label>
    <label class="w-full form-control">
      <select
        class="w-full select select-bordered"
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
    </label>
    <label class="w-full form-control">
      <select
        class="w-full select select-bordered"
        v-model="store.params.guaranteeCode"
        title="Room Type:"
        required
      >
        <option value="" disabled>Guarantee Code:</option>
        <option value="CC">CC</option>
        <option value="CHECK IN">CHECK IN</option>
        <option value="DRQ">DB</option>
        <option value="DRV">DRV</option>
        <option value="PM">PM</option>
      </select>
    </label>
    <label class="flex items-center gap-2 input input-bordered">
      Children:
      <input
        type="number"
        required
        v-model="store.params.children"
        class="grow"
      />
    </label>
    <label class="flex items-center gap-2 input input-bordered">
      Adults:
      <input
        type="number"
        v-model="store.params.adults"
        class="grow"
        required
      />
    </label>
    <label class="flex items-center gap-2 input input-bordered">
      Arrival Date:
      <input type="date" v-model="store.params.arrivalDate" class="grow" />
    </label>
    <label class="flex items-center gap-2 input input-bordered">
      Departure Date:
      <input type="date" v-model="store.params.departureDate" class="grow" />
    </label>
    <p
      class="font-bold text-red-500 col-span-full text-end"
      v-if="store.isGuestProfileNotFound"
    >
      *Guest Profile Id Is Not Found, Create Guest Profile First To Obtain Guest
      Profile Id
    </p>

    <p
      v-if="store.reservationId"
      class="text-xl font-bold text-green-500 col-span-full text-end"
    >
      Reservation Id: {{ store.reservationId }}
    </p>
  </FormComponent>
  <!-- #endregion -->

  <!-- #region feature section -->
  <FeatureSection />
  <!-- #endregion -->

  <!-- #region about us -->
  <ReservationAboutUs />
  <!-- #endregion -->

  <hr
    class="h-px my-6 bg-transparent border-t-0 opacity-25 bg-gradient-to-r from-transparent to-transparent via-neutral-500 dark:via-neutral-400"
  />

  <!-- #region metrics section -->
  <ReservationMetric />
  <!-- #endregion -->

  <hr
    class="h-px my-12 bg-transparent border-t-0 opacity-25 bg-gradient-to-r from-transparent to-transparent via-neutral-500 dark:via-neutral-400"
  />

  <!-- gallery -->
  <section
    class="pt-8 pb-4 text-gray-700 body-font dark:bg-[#181818] bg-slate-300"
    id="gallery"
  >
    <div
      class="flex justify-center py-12 text-3xl font-bold text-center text-black dark:text-white"
    >
      Gallery
    </div>

    <div
      class="grid grid-cols-1 gap-4 p-4 pb-8 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div class="relative group">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Image 1"
          class="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
        />
      </div>

      <div class="relative group">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Image 1"
          class="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
        />
      </div>

      <div class="relative group">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Image 1"
          class="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
        />
      </div>
      <div class="relative group">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Image 1"
          class="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
        />
      </div>
      <!-- Repeat this div for each image -->
    </div>
    <!-- <div class="divider divider-success !m-0 !p-0 !bg-transparent"></div> -->
  </section>

  <!-- Footer -->
  <ReservationFooter />
</template>

<style></style>
