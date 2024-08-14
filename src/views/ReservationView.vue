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

  <!-- Hero Section -->
  <section class="px-2 py-24 bg-white md:px-0">
    <div class="container items-center max-w-7xl px-8 mx-auto xl:px-5">
      <div class="flex flex-wrap items-center sm:-mx-3">
        <div class="w-full md:w-1/2 md:px-3">
          <div
            class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"
          >
            <h1
              class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              <span class="block xl:inline">Luxurious Stays</span>
              <span class="block text-indigo-600 xl:inline">
                At Your Fingertips
              </span>
            </h1>
            <p
              class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl"
            >
              Experience unparalleled comfort and elegance with our seamless
              hotel reservation process. Your perfect getaway is just a click
              away.
            </p>
            <div class="relative flex flex-col sm:flex-row sm:space-x-4">
              <a
                href="#reservation"
                class="flex items-center px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md w-fit sm:mb-0 hover:bg-indigo-700 sm:w-auto"
              >
                Book Now
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
            <img src="/img/beach.jpg" />
          </div>
        </div>
      </div>
    </div>
  </section>

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

  <!-- gallery -->
  <section
    class="pt-8 pb-4 text-gray-700 body-font dark:bg-[#191E24] bg-slate-300"
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
    <div class="divider divider-success !m-0 !p-0 !bg-transparent"></div>
  </section>

  <!-- Footer -->
  <footer
    class="px-5 pb-5 rounded footer footer-center bg-base-200 text-base-content"
  >
    <nav class="grid grid-flow-col gap-4">
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </nav>
    <nav>
      <div class="grid grid-flow-col gap-4">
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
            ></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
            ></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            ></path>
          </svg>
        </a>
      </div>
    </nav>
    <aside>
      <p>
        Copyright © {{ new Date().getFullYear() }} - All right reserved by ACME
        Industries Ltd
      </p>
    </aside>
  </footer>
</template>

<style></style>
