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

  <!-- Reservation Form -->
  <section id="reservation" class="py-16 bg-gray-800">
    <div class="container max-w-lg mx-auto">
      <h3 class="mb-6 text-2xl font-bold">Reservation Form</h3>
      <form class="p-8 bg-gray-900 rounded-lg">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            class="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg"
            placeholder="Your Name"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            class="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg"
            placeholder="Your Email"
          />
        </div>
        <div class="mb-4">
          <label for="checkin" class="block text-sm font-medium"
            >Check-in Date</label
          >
          <input
            type="date"
            id="checkin"
            class="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg"
          />
        </div>
        <div class="mb-4">
          <label for="checkout" class="block text-sm font-medium"
            >Check-out Date</label
          >
          <input
            type="date"
            id="checkout"
            class="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg"
          />
        </div>
        <div class="mb-6">
          <label for="guests" class="block text-sm font-medium"
            >Number of Guests</label
          >
          <input
            type="number"
            id="guests"
            class="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg"
            min="1"
            max="10"
            value="1"
          />
        </div>
        <button
          type="submit"
          class="w-full px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Submit Reservation
        </button>
      </form>
    </div>
  </section>

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
