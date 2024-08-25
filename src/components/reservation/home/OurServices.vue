<script setup>
import { ref } from "vue";

const features = ref([
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />`,
    title: "Infinity Pool",
    desc: "Enjoy breathtaking views from our rooftop infinity pool, perfect for relaxation and sunset watching.",
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />`,
    title: "Gourmet Dining",
    desc: "Savor exquisite cuisine at our award-winning restaurants, featuring local and international flavors.",
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />`,
    title: "Spa & Wellness",
    desc: "Rejuvenate your body and mind at our luxurious spa, offering a range of treatments and therapies.",
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`,
    title: "24/7 Concierge",
    desc: "Our dedicated concierge team is available round the clock to assist with any requests or arrangements.",
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />`,
    title: "Fitness Center",
    desc: "Stay active in our state-of-the-art fitness center, equipped with the latest exercise machines and free weights.",
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />`,
    title: "Business Center",
    desc: "Stay connected and productive in our fully-equipped business center with high-speed internet and printing services.",
  },
]);
</script>

<template>
  <section class="py-14">
    <div
      class="px-4 mx-auto max-w-screen-xl text-gray-600 dark:text-gray-300 md:px-8"
    >
      <div class="mx-auto space-y-3 max-w-xl sm:text-center">
        <h3 class="font-semibold text-teal-600 dark:text-teal-400">
          Our Amenities
        </h3>
        <p
          class="text-3xl font-semibold text-gray-800 dark:text-white sm:text-4xl"
        >
          Luxury at Your Fingertips
        </p>
        <p>
          Experience world-class amenities designed to make your stay
          unforgettable. From relaxation to adventure, we have everything you
          need.
        </p>
      </div>
      <div class="mt-12">
        <ul class="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="(item, idx) in features" :key="idx" class="flex gap-x-4">
            <div
              class="flex flex-none justify-center items-center w-12 h-12 text-teal-600 bg-teal-50 rounded-lg dark:bg-teal-900 dark:text-teal-400"
            >
              <svg
                v-html="item.icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              ></svg>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-gray-800 dark:text-white">
                {{ item.title }}
              </h4>
              <p class="mt-3">
                {{ item.desc }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
