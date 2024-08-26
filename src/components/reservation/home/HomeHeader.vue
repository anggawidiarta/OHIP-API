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
    class="fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-3 bg-gray-200 dark:bg-gray-900 lg:px-6"
    id="header"
  >
    <a class="flex items-center justify-center" href="/">
      <img
        src="/img/reserved.png"
        alt="Reservation Authorization"
        class="w-12 h-12"
      />
      <span class="ml-2 text-xl md:text-2xl font-bold"
        >Reservation Authorization</span
      >
    </a>
    <div class="flex items-center ml-auto">
      <Button variant="ghost" class="" @click="toggleColorMode">
        <Sun v-if="mode === 'dark'" class="w-6 h-6" />
        <Moon v-else class="w-6 h-6" />
        <span class="sr-only">Toggle color mode</span>
      </Button>
      <nav class="flex gap-3">
        <Button variant="ghost" class="hidden md:flex text-[1rem]">
          <a href="/ohip-api-test">Api Testing</a>
        </Button>
        <Button variant="ghost" class="hidden md:flex text-[1rem]">
          <a href="/reservation-before">Reservation Before</a>
        </Button>
        <Button variant="ghost" class="hidden md:flex text-[1rem]">
          <a href="#create-reservation">Book Now</a>
        </Button>
      </nav>
    </div>

    <Button variant="ghost" class="md:hidden" @click="toggleMobileMenu">
      <component :is="isMobileMenuOpen ? XIcon : MenuIcon" />
    </Button>
  </header>
  <nav
    v-if="isMobileMenuOpen"
    class="fixed left-0 right-0 z-40 px-4 pt-6 sm:py-3 border-b top-16 md:hidden h-auto bg-background"
  >
    <Button variant="ghost" class="justify-start w-full">
      <a href="/ohip-api-test">API Testing</a>
    </Button>
    <Button variant="ghost" class="justify-start w-full">
      <a href="/reservation-before">Reservation Before</a>
    </Button>
    <Button variant="ghost" class="justify-start w-full">
      <a href="#create-reservation">Book Now</a>
    </Button>
  </nav>
</template>
