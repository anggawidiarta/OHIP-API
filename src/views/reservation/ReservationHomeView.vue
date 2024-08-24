<template>
  <div class="flex flex-col min-h-screen">
    <header class="px-4 lg:px-6 h-14 flex items-center">
      <a class="flex items-center justify-center" href="#">
        <span class="sr-only">Luxury Hotel</span>
        <img src="" alt="Logo" class="h-10 w-10" />
        <span class="ml-2 text-2xl font-bold">Luxury Hotel</span>
      </a>
      <nav class="ml-auto flex gap-4 sm:gap-6">
        <Button variant="ghost" class="hidden md:flex">
          <a href="#services">Services</a>
        </Button>
        <Button variant="ghost" class="hidden md:flex">
          <a href="#about">About</a>
        </Button>
        <Button variant="ghost" class="hidden md:flex">
          <a href="#reservation">Book Now</a>
        </Button>
        <Button variant="ghost" class="hidden md:flex">
          <a href="#gallery">Gallery</a>
        </Button>
      </nav>
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
        class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black dark:bg-blue-500 text-white"
      >
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center space-y-4 text-center">
            <div class="space-y-2">
              <h1
                class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
              >
                Experience Luxury at Its Finest
              </h1>
              <p class="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Indulge in world-class amenities, breathtaking views, and
                unparalleled service at our Luxury Hotel.
              </p>
            </div>
            <Button class="bg-white text-black hover:bg-gray-200">
              <a href="#reservation">Book Your Stay Now</a>
            </Button>
          </div>
        </div>
      </section>
      <section id="services" class="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div class="container px-4 md:px-6">
          <h2
            class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8"
          >
            Our Services
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(service, index) in services"
              :key="index"
              class="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 class="text-xl font-bold mb-2">{{ service.title }}</h3>
              <p class="text-gray-600">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2
                class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4"
              >
                About Us
              </h2>
              <p class="text-gray-600 mb-4">
                Luxury Hotel has been setting the standard for excellence in
                hospitality for over 50 years. Our commitment to providing
                exceptional service and unforgettable experiences has made us a
                preferred choice for discerning travelers worldwide.
              </p>
              <p class="text-gray-600">
                From our meticulously designed rooms to our world-class
                amenities, every aspect of our hotel is crafted to ensure your
                utmost comfort and satisfaction. We invite you to experience the
                pinnacle of luxury and create lasting memories with us.
              </p>
            </div>
            <div class="relative h-[300px] md:h-[400px]">
              <img
                src=""
                alt="Luxury Hotel Exterior"
                class="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="reservation"
        class="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
      >
        <div class="container px-4 md:px-6">
          <h2
            class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8"
          >
            Book Your Stay
          </h2>
          <form class="max-w-2xl mx-auto space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div class="space-y-2">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label>Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      class="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      {{ checkIn ? formatDate(checkIn) : "Pick a date" }}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0">
                    <Calendar
                      mode="single"
                      :selected="checkIn"
                      @select="setCheckIn"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div class="space-y-2">
                <Label>Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      class="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      {{ checkOut ? formatDate(checkOut) : "Pick a date" }}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0">
                    <Calendar
                      mode="single"
                      :selected="checkOut"
                      @select="setCheckOut"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div class="space-y-2">
              <Label for="guests">Number of Guests</Label>
              <Select>
                <SelectTrigger id="guests">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <Label for="room-type">Room Type</Label>
              <Select>
                <SelectTrigger id="room-type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="standard">Standard Room</SelectItem>
                  <SelectItem value="deluxe">Deluxe Room</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" class="w-full">Book Now</Button>
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

<script setup>
import { ref } from "vue";
// import {
//   Calendar,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   Button,
//   Label,
//   Input,
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@components";
import { useColorMode } from "@vueuse/core";
// import { CalendarIcon, MenuIcon, XIcon } from "@icons";

const mode = useColorMode();

const mobileMenuOpen = ref(false);
const services = ref([
  {
    title: "Spa & Wellness",
    description: "Relax and rejuvenate at our world-class spa.",
  },
  {
    title: "Fine Dining",
    description: "Enjoy gourmet cuisine crafted by renowned chefs.",
  },
  {
    title: "Infinity Pool",
    description: "Take a dip in our luxurious infinity pool with ocean views.",
  },
]);

const checkIn = ref(null);
const checkOut = ref(null);

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

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
</script>

<style scoped>
/* Add any custom styles here */
</style>
