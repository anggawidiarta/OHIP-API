<script setup>
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, Sun, Moon } from "lucide-vue-next";

import { useColorMode } from "@vueuse/core";
import { ref } from "vue";

const mode = useColorMode();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const toggleColorMode = () => {
  mode.value === "dark" ? (mode.value = "light") : (mode.value = "dark");
};
</script>

<template>
  <header
    class="flex fixed top-0 right-0 left-0 z-50 items-center px-4 py-3 bg-white dark:bg-gray-900 lg:px-6"
  >
    <a class="flex justify-center items-center" href="#">
      <!-- <span class="sr-only">Luxury Hotel</span> -->
      <img
        src="/img/reserved.png"
        alt="Reservation Authorization"
        class="w-12 h-12"
      />
      <span class="ml-2 text-2xl font-bold">Reservation Authorization</span>
    </a>
    <div class="flex items-center ml-auto">
      <Button variant="ghost" class="" @click="toggleColorMode">
        <Sun v-if="mode === 'dark'" class="w-6 h-6" />
        <Moon v-else class="w-6 h-6" />
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
  <nav v-if="mobileMenuOpen" class="px-4 py-2 border-b md:hidden bg-background">
    <Button variant="ghost" class="justify-start w-full">
      <a href="#services">Services</a>
    </Button>
    <Button variant="ghost" class="justify-start w-full">
      <a href="#about">About</a>
    </Button>
    <Button variant="ghost" class="justify-start w-full">
      <a href="#reservation">Book Now</a>
    </Button>
    <Button variant="ghost" class="justify-start w-full">
      <a href="#gallery">Gallery</a>
    </Button>
  </nav>
</template>
