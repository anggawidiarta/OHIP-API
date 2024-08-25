<script setup>
import { scrollToSection } from "@/utils/helper";
import { Button } from "@/components/ui/button";
</script>
<template>
  <section
    class="items-center px-4 pb-12 mx-auto mt-24 max-w-screen-xl lg:flex md:px-8"
  >
    <div class="flex-1 space-y-4 sm:text-center lg:text-left">
      <h1 class="dark:text-white text-[#232b2b] font-bold text-4xl xl:text-5xl">
        One page Template for
        <span class="text-indigo-400"> Digital agency</span>
      </h1>
      <p
        class="max-w-xl leading-relaxed dark:text-gray-300 text-slate-500 sm:mx-auto lg:ml-0"
      >
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum
      </p>
      <div
        class="justify-center items-center pt-10 space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start"
      >
        <Button
          @click="scrollToSection('create-reservation')"
          href="javascript:void(0)"
          class="block w-full h-auto text-lg text-center text-gray-50 bg-teal-500 rounded-md shadow-md dark:text-white sm:w-auto"
        >
          Book Now
        </Button>
      </div>
    </div>
    <div class="flex-1 mt-7 text-center lg:mt-0 lg:ml-3">
      <img
        src="/img/beach.jpg"
        class="mx-auto w-full rounded-lg shadow-md sm:w-10/12 lg:w-full"
      />
    </div>
  </section>
</template>
