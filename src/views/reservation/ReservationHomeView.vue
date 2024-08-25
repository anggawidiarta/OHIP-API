<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useReservationStore } from "@/stores/reservation-store";
import { getToken } from "@/services/auth/auth-service";
import { scrollToSection } from "@/utils/helper";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RangeCalendar } from "@/components/ui/range-calendar";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useColorMode } from "@vueuse/core";
import {
  XIcon,
  MenuIcon,
  CalendarIcon,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
} from "lucide-vue-next";

const mode = useColorMode();

const toggleColorMode = () => {
  mode.value === "dark" ? (mode.value = "light") : (mode.value = "dark");
};

const mobileMenuOpen = ref(false);

const checkIn = ref(null);
const checkOut = ref(null);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

function setCheckIn(date) {
  checkIn.value = date;
}

function setCheckOut(date) {
  checkOut.value = date;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

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

// Functionality
const reservationStore = useReservationStore();

let intervalId;
// onMounted(() => {
//   document.title = "Reservation Authorization";
//   getToken();
//   intervalId = setInterval(() => {
//     getToken();
//   }, 3600 * 1000); // 3600 * 1000 = 1 hour in milliseconds
// });

// onUnmounted(() => {
//   clearInterval(intervalId);
// });

// calendar date picker
const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const value = ref({
  start: new CalendarDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  ),
  end: new CalendarDate(
    tomorrow.getFullYear(),
    tomorrow.getMonth() + 1,
    tomorrow.getDate()
  ),
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 px-4 lg:px-6 flex items-center py-3"
    >
      <a class="flex items-center justify-center" href="#">
        <!-- <span class="sr-only">Luxury Hotel</span> -->
        <img
          src="/img/reserved.png"
          alt="Reservation Authorization"
          class="h-12 w-12"
        />
        <span class="ml-2 text-2xl font-bold">Reservation Authorization</span>
      </a>
      <div class="ml-auto flex items-center">
        <Button variant="ghost" class="" @click="toggleColorMode">
          <Sun v-if="mode === 'dark'" class="h-6 w-6" />
          <Moon v-else class="h-6 w-6" />
          <span class="sr-only">Toggle color mode</span>
        </Button>
        <nav class="flex gap-3 sm:gap-6">
          <Button variant="ghost" class="hidden md:flex text-[1rem]">
            <a href="#services">Services</a>
          </Button>
          <Button variant="ghost" class="hidden md:flex text-[1rem]">
            <a href="#about">About</a>
          </Button>
          <Button variant="ghost" class="hidden md:flex text-[1rem]">
            <a href="#reservation">Book Now</a>
          </Button>
          <Button variant="ghost" class="hidden md:flex text-[1rem]">
            <a href="#gallery">Gallery</a>
          </Button>
        </nav>
      </div>

      <Button variant="ghost" class="md:hidden" @click="toggleMobileMenu">
        <component :is="mobileMenuOpen ? XIcon : MenuIcon" />
      </Button>
    </header>
    <nav
      v-if="mobileMenuOpen"
      class="md:hidden px-4 py-2 bg-background border-b"
    >
      <Button variant="ghost" class="w-full justify-start">
        <a href="#services">Services</a>
      </Button>
      <Button variant="ghost" class="w-full justify-start">
        <a href="#about">About</a>
      </Button>
      <Button variant="ghost" class="w-full justify-start">
        <a href="#reservation">Book Now</a>
      </Button>
      <Button variant="ghost" class="w-full justify-start">
        <a href="#gallery">Gallery</a>
      </Button>
    </nav>

    <main class="flex-1">
      <section
        class="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8"
      >
        <div class="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1
            class="dark:text-white text-[#232b2b] font-bold text-4xl xl:text-5xl"
          >
            One page Template for
            <span class="text-indigo-400"> Digital agency</span>
          </h1>
          <p
            class="dark:text-gray-300 text-slate-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0"
          >
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum
          </p>
          <div
            class="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start"
          >
            <Button
              @click="scrollToSection('create-reservation')"
              href="javascript:void(0)"
              class="w-full bg-teal-500 text-gray-50 dark:text-white text-center h-auto text-lg rounded-md shadow-md block sm:w-auto"
            >
              Book Now
            </Button>
          </div>
        </div>
        <div class="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img
            src="/img/beach.jpg"
            class="w-full mx-auto sm:w-10/12 lg:w-full rounded-lg shadow-md"
          />
        </div>
      </section>

      <section class="py-14">
        <div
          class="max-w-screen-xl mx-auto px-4 text-gray-600 dark:text-gray-300 md:px-8"
        >
          <div class="space-y-3 sm:text-right mb-12">
            <p
              class="text-teal-600 dark:text-teal-400 text-3xl font-semibold sm:text-4xl"
            >
              Our Story
            </p>
            <p>Discover the essence of luxury and comfort at [Hotel Name].</p>
          </div>
          <div class="mt-12">
            <p
              class="text-lg lg:text-xl text-gray-600 text-justify dark:text-gray-300 mb-12"
            >
              At [Hotel Name], we believe that every stay should be a memorable
              experience. Our hotel blends luxury with comfort, providing a
              perfect retreat for both business and leisure travelers. Located
              in the heart of the city, we offer world-class amenities,
              exceptional service, and a commitment to making your stay
              unforgettable.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="bg-teal-50 dark:bg-teal-900 p-6 rounded-lg">
                <h3
                  class="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2"
                >
                  Our Mission
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Our mission is to deliver unparalleled hospitality that
                  exceeds expectations, creating lasting impressions for all our
                  guests.
                </p>
              </div>
              <div class="bg-teal-50 dark:bg-teal-900 p-6 rounded-lg">
                <h3
                  class="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2"
                >
                  Our Vision
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  We envision a world where every traveler finds a home away
                  from home, where comfort meets luxury and service meets
                  excellence.
                </p>
              </div>
              <div class="bg-teal-50 dark:bg-teal-900 p-6 rounded-lg">
                <h3
                  class="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2"
                >
                  Our Values
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  We value integrity, excellence, and a commitment to
                  sustainability, ensuring that our guests enjoy a stay that is
                  both enriching and environmentally conscious.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-14">
        <div
          class="max-w-screen-xl mx-auto px-4 text-gray-600 dark:text-gray-300 md:px-8"
        >
          <div class="max-w-xl mx-auto space-y-3 sm:text-center">
            <h3 class="text-teal-600 dark:text-teal-400 font-semibold">
              Our Amenities
            </h3>
            <p
              class="text-gray-800 dark:text-white text-3xl font-semibold sm:text-4xl"
            >
              Luxury at Your Fingertips
            </p>
            <p>
              Experience world-class amenities designed to make your stay
              unforgettable. From relaxation to adventure, we have everything
              you need.
            </p>
          </div>
          <div class="mt-12">
            <ul class="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              <li
                v-for="(item, idx) in features"
                :key="idx"
                class="flex gap-x-4"
              >
                <div
                  class="flex-none w-12 h-12 bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 rounded-lg flex items-center justify-center"
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
                  <h4
                    class="text-lg text-gray-800 dark:text-white font-semibold"
                  >
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

      <section class="py-14">
        <div
          class="max-w-screen-xl mx-auto px-4 text-gray-600 dark:text-gray-300 md:px-8"
        >
          <div class="max-w-xl mx-auto space-y-3 sm:text-center mb-12">
            <h3 class="text-teal-600 dark:text-teal-400 font-semibold">
              Reserve Your Stay
            </h3>
            <p
              class="text-gray-800 dark:text-white text-3xl font-semibold sm:text-4xl"
            >
              Book Your Perfect Getaway
            </p>
            <p>
              Experience luxury and comfort by reserving your stay with us. Our
              easy booking process ensures a seamless experience.
            </p>
          </div>
          <form
            class="max-w-2xl mx-auto space-y-6"
            @submit.prevent="
              () => {
                console.log(
                  `start date : ${value.start}, end date : ${value.end}`
                );
              }
            "
          >
            <div class="space-y-2">
              <Label class="text-gray-800 dark:text-white">Stay Dates</Label>
              <div>
                <Popover>
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      :class="
                        cn(
                          'w-[280px] justify-start text-left font-normal',
                          !value && 'text-muted-foreground'
                        )
                      "
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      <template v-if="value.start">
                        <template v-if="value.end">
                          {{
                            df.format(value.start.toDate(getLocalTimeZone()))
                          }}
                          -
                          {{ df.format(value.end.toDate(getLocalTimeZone())) }}
                        </template>

                        <template v-else>
                          {{
                            df.format(value.start.toDate(getLocalTimeZone()))
                          }}
                        </template>
                      </template>
                      <template v-else> Pick a date </template>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0">
                    <RangeCalendar
                      v-model="value"
                      initial-focus
                      :number-of-months="2"
                      @update:start-value="
                        (startDate) => (value.start = startDate)
                      "
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div class="space-y-2">
              <Label for="guests" class="text-gray-800 dark:text-white"
                >Number of Guests</Label
              >
              <Select>
                <SelectTrigger
                  id="guests"
                  class="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent class="bg-white dark:bg-gray-800">
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              class="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >Book Now</Button
            >
          </form>
        </div>
      </section>

      <section id="gallery" class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <h2
            class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8"
          >
            Gallery
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <img
              v-for="n in 8"
              :key="n"
              src=""
              alt="Gallery Image"
              class="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>
    </main>
    <footer class="px-4 lg:px-6 h-14 flex items-center justify-center">
      <p class="text-xs text-gray-500">
        &copy; 2023 Luxury Hotel. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
