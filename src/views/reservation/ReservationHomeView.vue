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

import HomeHeader from "@/components/reservation/home/HomeHeader.vue";
import AboutUs from "@/components/reservation/home/AboutUs.vue";
import HeroSection from "@/components/reservation/home/HeroSection.vue";
import OurServices from "@/components/reservation/home/OurServices.vue";
import RoomList from "@/components/reservation/room/RoomList.vue";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-vue-next";

import Swal from "sweetalert2";
// sweetalert2
const handleSubmit = async () => {
  // Show loading alert
  Swal.fire({
    title: "Loading...",
    text: "Fetching hotel availability",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    // Convert CalendarDate to JavaScript Date
    const startDate = value.value.start.toDate(getLocalTimeZone());
    const endDate = value.value.end.toDate(getLocalTimeZone());

    // Format dates as ISO strings (YYYY-MM-DD)
    reservationStore.params.roomStayStartDate = startDate
      .toLocaleDateString("en-CA")
      .split("T")[0];
    reservationStore.params.roomStayEndDate = endDate
      .toLocaleDateString("en-CA")
      .split("T")[0];

    console.log("Reservation params:", reservationStore.params);
    // Here you can call your reservation function, e.g., reservationStore.getHotelAvailability()
    await reservationStore.getHotelAvailability();

    // Close loading alert
    Swal.close();

    if (
      reservationStore.hotelAvailabilityData[0].roomStays[0].roomRates.length >
      0
    ) {
      console.log(
        reservationStore.hotelAvailabilityData[0].roomStays[0].roomRates.length
      );
      Swal.fire({
        title: "Hotel Availability Loaded",
        text: "Please select a room from the available options.",
        icon: "success",
        confirmButtonText: "Okay",
      });
    } else {
      Swal.fire({
        title: "No Rooms Available",
        text: "No rooms are available for the selected dates.",
        icon: "info",
        confirmButtonText: "Okay",
      });
    }
  } catch (error) {
    // Close loading alert
    Swal.close();

    Swal.fire({
      title: "Error",
      text: "An error occurred while fetching hotel availability. Please try again.",
      icon: "error",
      confirmButtonText: "Okay",
    });
    console.error("Error fetching hotel availability:", error);
  } finally {
    reservationStore.isShowRoomList = true;
  }
};

// Functionality
const reservationStore = useReservationStore();

let intervalId;
onMounted(() => {
  document.title = "Reservation Authorization";
  getToken();
  intervalId = setInterval(() => {
    getToken();
  }, 3600 * 1000); // 3600 * 1000 = 1 hour in milliseconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});

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
    <HomeHeader />

    <main class="flex-1">
      <HeroSection />

      <AboutUs />

      <section class="py-14" id="create-reservation">
        <div
          class="px-4 mx-auto max-w-screen-xl text-gray-600 dark:text-gray-300 md:px-8"
        >
          <div class="mx-auto mb-12 space-y-3 max-w-xl sm:text-center">
            <h3 class="font-semibold text-teal-600 dark:text-teal-400">
              Reserve Your Stay
            </h3>
            <p
              class="text-3xl font-semibold text-gray-800 dark:text-white sm:text-4xl"
            >
              Book Your Perfect Getaway
            </p>
            <p>
              Experience luxury and comfort by reserving your stay with us. Our
              easy booking process ensures a seamless experience.
            </p>
          </div>
          <form
            class="mx-auto space-y-6 max-w-2xl"
            @submit.prevent="handleSubmit"
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
                      <CalendarIcon class="mr-2 w-4 h-4" />
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
                  <PopoverContent class="p-0 w-auto">
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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="adults" class="text-gray-800 dark:text-white"
                  >Adults</Label
                >
                <Input
                  id="adults"
                  v-model="reservationStore.params.adults"
                  type="number"
                  min="1"
                  class="text-gray-800 bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div class="space-y-2">
                <Label for="children" class="text-gray-800 dark:text-white"
                  >Children</Label
                >
                <Input
                  id="children"
                  v-model="reservationStore.params.children"
                  type="number"
                  min="0"
                  class="text-gray-800 bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              class="w-full text-white bg-teal-600 hover:bg-teal-700"
              >Book Now</Button
            >
          </form>
        </div>
      </section>

      <section class="py-14">
        <div
          class="px-4 mx-auto max-w-screen-xl text-gray-600 dark:text-gray-300 md:px-8"
        >
          <RoomList
            v-if="
              reservationStore.hotelAvailabilityData[0]?.roomStays[0]?.roomRates
                .length > 0 && reservationStore.isShowRoomList
            "
          />
        </div>
      </section>

      <OurServices />

      <section id="gallery" class="py-12 w-full md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <h2
            class="mb-8 text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl"
          >
            Gallery
          </h2>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <img
              v-for="n in 8"
              :key="n"
              src=""
              alt="Gallery Image"
              class="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
    <footer class="flex justify-center items-center px-4 h-14 lg:px-6">
      <p class="text-xs text-gray-500">
        &copy; 2023 Luxury Hotel. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
