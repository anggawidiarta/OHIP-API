<script setup>
import { onMounted, computed, onUnmounted } from "vue";
import { useApisStore } from "@/stores/api";
import { RouterLink } from "vue-router";

import FeatureSection from "@/components/reservation/FeatureSection.vue";
import ReservationFooter from "@/components/reservation/ReservationFooter.vue";
import ReservationHero from "@/components/reservation/ReservationHero.vue";
import ReservationAboutUs from "@/components/reservation/ReservationAboutUs.vue";
import ReservationMetric from "@/components/reservation/ReservationMetric.vue";

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
  <!-- Header -->
  <div class="navbar">
    <div class="flex-1">
      <a class="text-xl btn btn-ghost">daisyUI</a>
    </div>
    <div class="flex-none">
      <ul class="px-1 menu menu-horizontal">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="p-2 rounded-t-none bg-base-100">
              <li><a>Link 1</a></li>
              <li><a>Link 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>

  <!-- #region Hero Section -->
  <ReservationHero />
  <!-- #endregion -->

  <!-- #region Reservation Form -->
  <section class="flex items-center justify-center p-12">
    <!-- Author: FormBold Team -->
    <div class="mx-auto w-full max-w-5xl bg-white dark:bg-[#181818]">
      <p class="text-2xl font-bold">Create Guest Profile</p>
      <form @submit.prevent="store.postGuestProfile">
        <div class="mb-5">
          <label
            for="guestGivenName"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Given Name
          </label>
          <input
            v-model="store.params.guestGivenName"
            type="text"
            name="guestGivenName"
            id="guestGivenName"
            placeholder="Given Name"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestMiddleName"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Middle Name
          </label>
          <input
            v-model="store.params.guestMiddleName"
            type="text"
            name="guestMiddleName"
            id="guestMiddleName"
            placeholder="Middle Name"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestSurName"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Surname
          </label>
          <input
            v-model="store.params.guestSurName"
            type="text"
            name="guestSurName"
            id="guestSurName"
            placeholder="Surname"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestNameSuffix"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Name Suffix
          </label>
          <input
            v-model="store.params.guestNameSuffix"
            type="text"
            name="guestNameSuffix"
            id="guestNameSuffix"
            placeholder="Name Suffix"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestNameTitle"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Name Title
          </label>
          <input
            v-model="store.params.guestNameTitle"
            type="text"
            name="guestNameTitle"
            id="guestNameTitle"
            placeholder="Name Title"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestEnveloperGreeting"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Envelope Greeting
          </label>
          <input
            v-model="store.params.guestEnveloperGreeting"
            type="text"
            name="guestEnveloperGreeting"
            id="guestEnveloperGreeting"
            placeholder="Envelope Greeting"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestSalutation"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Salutation
          </label>
          <input
            v-model="store.params.guestSalutation"
            type="text"
            name="guestSalutation"
            id="guestSalutation"
            placeholder="Salutation"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestNameType"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Name Type
          </label>
          <input
            v-model="store.params.guestNameType"
            required
            type="text"
            name="guestNameType"
            id="guestNameType"
            placeholder="Name Type"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestLanguage"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Language
          </label>
          <input
            v-model="store.params.guestLanguage"
            type="text"
            name="guestLanguage"
            id="guestLanguage"
            placeholder="Language"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="guestNationality"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Nationality
          </label>
          <input
            v-model="store.params.guestNationality"
            type="text"
            name="guestNationality"
            id="guestNationality"
            placeholder="Nationality"
            class="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="markForHistory"
            class="mb-3 block text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Mark for History
          </label>
          <input
            v-model="store.params.markForHistory"
            type="checkbox"
            name="markForHistory"
            id="markForHistory"
            class="rounded-md border border-gray-300 bg-white dark:bg-gray-700 py-3 px-6 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>
        <div>
          <button
            class="hover:shadow-form w-full rounded-md bg-indigo-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            :disabled="!store.token"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
  <!-- #endregion -->

  <!-- #region feature section -->
  <FeatureSection />
  <!-- #endregion -->

  <!-- #region about us -->
  <ReservationAboutUs />
  <!-- #endregion -->

  <hr
    class="h-px my-6 bg-transparent border-t-0 opacity-25 bg-gradient-to-r from-transparent via-neutral-500 to-transparent dark:via-neutral-400"
  />

  <!-- #region metrics section -->
  <ReservationMetric />
  <!-- #endregion -->

  <hr
    class="h-px my-12 bg-transparent border-t-0 opacity-25 bg-gradient-to-r from-transparent via-neutral-500 to-transparent dark:via-neutral-400"
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
