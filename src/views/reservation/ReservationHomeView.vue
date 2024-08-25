<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
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
import FormInput from "@/components/reservation/form/FormInput.vue";
import FormSelect from "@/components/reservation/form/FormSelect.vue";
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
import { paymentMethods, nationalities, languages } from "@/config/constants";
import HomeFooter from "@/components/reservation/home/HomeFooter.vue";
import RoomSection from "@/components/reservation/room/RoomSection.vue";
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

    await reservationStore.getHotelAvailability();

    // Close loading alert
    Swal.close();

    if (
      reservationStore.hotelAvailabilityData[0].roomStays[0].roomRates.length >
      0
    ) {
      Swal.fire({
        title: "Hotel Availability Loaded",
        text: "Please select a room from the available options.",
        icon: "success",
        confirmButtonText: "Okay",
        didClose: () => {
          scrollToSection("room-list");
        },
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
  } finally {
    reservationStore.isShowRoomList = true;
  }
};

// function to createProfile function
const handleCreateProfile = async () => {
  reservationStore.postCreateGuestProfile();
  reservationStore.setReservationStep(3);
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

const reservationStepTitle = computed(() => {
  switch (reservationStore.reservationStep) {
    case 1:
      return "Book Your Perfect Getaway";
    case 2:
      return "Create Your Profile";
    case 3:
      return "Select Your Payment Method";
    default:
      return "Reserve Your Stay";
  }
});

const reservationStepDescription = computed(() => {
  switch (reservationStore.reservationStep) {
    case 1:
      return "Experience luxury and comfort by reserving your stay with us. Our easy booking process ensures a seamless experience.";
    case 2:
      return "Please provide your personal details to create your profile.";
    case 3:
      return "Choose your preferred payment method to complete the reservation.";
    default:
      return "Follow the steps to complete your reservation.";
  }
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
              {{ reservationStepTitle }}
            </p>
            <p class="text-gray-600 dark:text-gray-300 capitalize">
              {{ reservationStepDescription }}
            </p>
          </div>
          <form
            class="mx-auto space-y-6 max-w-2xl"
            @submit.prevent="handleSubmit"
            data-aos="fade-up"
            data-aos-duration="1000"
            v-if="reservationStore.reservationStep === 1"
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
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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

          <form
            class="mx-auto space-y-6 max-w-2xl"
            @submit.prevent="handleCreateProfile"
            data-aos="fade-up"
            data-aos-duration="1000"
            v-if="reservationStore.reservationStep === 2"
          >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <FormInput
                  v-model="reservationStore.params.givenName"
                  label="First Name"
                  placeholder="Enter First Name"
                  id="givenName"
                  required
                />
                <FormInput
                  v-model="reservationStore.params.middleName"
                  label="Middle Name (Optional)"
                  placeholder="Enter Middle Name"
                  id="middleName"
                />
                <FormInput
                  v-model="reservationStore.params.surName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  id="surName"
                  required
                />
                <FormInput
                  v-model="reservationStore.params.nameTitle"
                  label="Name Title"
                  placeholder="Enter Name Title"
                  id="nameTitle"
                />
              </div>
              <div class="space-y-2">
                <FormSelect
                  v-model="reservationStore.params.language"
                  label="Language"
                  :options="languages"
                  placeholder="Select Language"
                  required
                />
                <FormSelect
                  v-model="reservationStore.params.nationality"
                  label="Nationality"
                  :options="nationalities"
                  placeholder="Select Nationality"
                  required
                  multiple
                />
                <FormInput
                  v-model="reservationStore.params.guestEnveloperGreeting"
                  label="Envelope Greeting (Optional)"
                  placeholder="Envelope Greeting"
                  id="guestEnveloperGreeting"
                />
                <FormInput
                  v-model="reservationStore.params.guestSalutation"
                  label="Salutation (Optional)"
                  placeholder="Salutation"
                  id="guestSalutation"
                />
              </div>
            </div>
            <Button
              type="submit"
              class="w-full text-white bg-teal-600 hover:bg-teal-700"
              >Submit</Button
            >
          </form>

          <div
            v-if="reservationStore.reservationStep === 3"
            class="mx-auto space-y-6 max-w-2xl"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <form
              @submit.prevent="
                reservationStore.postReservationWithExistingProfile
              "
            >
              <ul class="mt-6 space-y-3">
                <li v-for="(item, idx) in paymentMethods" :key="idx">
                  <label :for="item.name" class="block relative">
                    <input
                      :id="item.name"
                      type="radio"
                      :value="item.value"
                      v-model="reservationStore.params.paymentMethod"
                      name="payment"
                      class="sr-only peer"
                      required
                    />
                    <div
                      class="flex gap-x-3 items-start p-4 w-full bg-white rounded-lg border ring-indigo-600 shadow-sm duration-200 cursor-pointer peer-checked:ring-2"
                    >
                      <div class="flex-none">
                        <img
                          :src="item.icon"
                          :alt="item.name"
                          class="w-8 h-8 sm:w-12 sm:h-12"
                        />
                      </div>
                      <div>
                        <h3 class="pr-3 font-medium leading-none text-gray-800">
                          {{ item.name }}
                        </h3>
                        <p class="mt-1 text-sm capitalize text-gray-600">
                          {{ item.description }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="flex absolute top-4 right-4 flex-none justify-center items-center w-4 h-4 text-white rounded-full border duration-200 peer-checked:bg-indigo-600 peer-checked:text-white"
                    >
                      <svg class="w-2.5 h-2.5" viewBox="0 0 12 10">
                        <polyline
                          fill="none"
                          stroke-width="2px"
                          stroke="currentColor"
                          stroke-dasharray="16px"
                          points="1.5 6 4.5 9 10.5 1"
                        ></polyline>
                      </svg>
                    </div>
                  </label>
                </li>
              </ul>
              <div class="flex items-center">
                <Button
                  type="submit"
                  class="w-full mt-3 text-white tracking-wide bg-teal-600 hover:bg-teal-700"
                  >Submit</Button
                >
              </div>
            </form>
          </div>
        </div>
      </section>

      <RoomSection
        v-if="
          reservationStore.hotelAvailabilityData[0]?.roomStays[0]?.roomRates
            .length > 0 && reservationStore.isShowRoomList
        "
      />

      <OurServices />

      <div
        class="h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent dark:via-teal-600"
      ></div>

      <HomeFooter />
    </main>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
