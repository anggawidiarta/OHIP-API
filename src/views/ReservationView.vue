<script setup>
import { onMounted, computed, onUnmounted } from "vue";
import { useApisStore } from "@/stores/api";
import { RouterLink } from "vue-router";

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
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="bg-base-100 rounded-t-none p-2">
              <li><a>Link 1</a></li>
              <li><a>Link 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>

  <!-- Hero Section -->
  <section class="px-2 py-32 bg-white md:px-0">
    <div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
      <div class="flex flex-wrap items-center sm:-mx-3">
        <div class="w-full md:w-1/2 md:px-3">
          <div
            class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"
          >
            <h1
              class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              <span class="block xl:inline">Useful Tools to</span>
              <span class="block text-indigo-600 xl:inline"
                >Help You Build Faster.</span
              >
            </h1>
            <p
              class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl"
            >
              It's never been easier to build beautiful websites that convey
              your message and tell your story.
            </p>
            <div class="relative flex flex-col sm:flex-row sm:space-x-4">
              <a
                href="#_"
                class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
              >
                Create Reservation
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <!-- <a
                href="#_"
                class="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
              >
                Learn More
              </a> -->
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2">
          <div
            class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Reservation Form -->
  <section id="reservation" class="py-16 bg-gray-800">
    <div class="container mx-auto max-w-lg">
      <h3 class="text-2xl font-bold mb-6">Reservation Form</h3>
      <form class="bg-gray-900 p-8 rounded-lg">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            class="mt-1 p-2 w-full bg-gray-700 text-white rounded-lg border border-gray-600"
            placeholder="Your Name"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            class="mt-1 p-2 w-full bg-gray-700 text-white rounded-lg border border-gray-600"
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
            class="mt-1 p-2 w-full bg-gray-700 text-white rounded-lg border border-gray-600"
          />
        </div>
        <div class="mb-4">
          <label for="checkout" class="block text-sm font-medium"
            >Check-out Date</label
          >
          <input
            type="date"
            id="checkout"
            class="mt-1 p-2 w-full bg-gray-700 text-white rounded-lg border border-gray-600"
          />
        </div>
        <div class="mb-6">
          <label for="guests" class="block text-sm font-medium"
            >Number of Guests</label
          >
          <input
            type="number"
            id="guests"
            class="mt-1 p-2 w-full bg-gray-700 text-white rounded-lg border border-gray-600"
            min="1"
            max="10"
            value="1"
          />
        </div>
        <button
          type="submit"
          class="bg-green-600 w-full text-white py-3 px-6 rounded-lg hover:bg-green-700"
        >
          Submit Reservation
        </button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-black text-center py-6">
    <p class="text-gray-500">&copy; 2024 Elegant Hotel. All rights reserved.</p>
  </footer>
</template>

<style></style>
