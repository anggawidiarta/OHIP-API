<!-- eslint-disable -->
<script setup>
import { ref, watch } from "vue";
import { JsonViewer } from "vue3-json-viewer";
import axios from "axios";

import { useApisStore } from "@/stores/api";

const store = useApisStore();
</script>

<template>
  <div class="flex flex-wrap">
    <div class="mb-10 w-full">
      <div class="container mx-auto h-full sm:p-10">
        <nav class="flex justify-between items-center px-4">
          <div class="text-4xl font-bold">
            OHIP Test - Get Access Token<span class="text-green-700">.</span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                class="hover:fill-green-500"
                fill-rule="evenodd"
                d="M12.667 6.542A3.208 3.208 0 0 1 8.86 9.694l-.438.492a.44.44 0 0 1-.327.147h-.678v.73a.437.437 0 0 1-.438.437H6.25v.73a.437.437 0 0 1-.437.437H3.77a.437.437 0 0 1-.438-.438v-1.423a.44.44 0 0 1 .128-.31l2.95-2.949a3.208 3.208 0 0 1 3.047-4.214a3.2 3.2 0 0 1 3.209 3.209m-3.209-.875a.875.875 0 1 0 1.75 0a.875.875 0 0 0-1.75 0"
              />
            </svg>
          </div>
        </nav>
        <header class="container px-4 mt-10 lg:flex lg:mt-16">
          <div class="w-full">
            <h1 class="text-4xl font-bold capitalize lg:text-6xl">
              Generate Access Token Page
            </h1>
            <div class="my-4 w-20 h-2 bg-green-700"></div>
            <p class="mb-10 text-xl">
              This page is used to generate an access token for your
              application.
            </p>
            <button
              @click="store.generateAccessToken()"
              class="px-4 py-2 my-4 text-2xl font-medium text-white bg-yellow-700 rounded shadow transition-all duration-150 hover:bg-yellow-300"
            >
              Generate Access Token
            </button>
            <p class="mb-2 text-red-500" v-if="!store.token">
              *You Need To Generate Access Token First To Use These Functions
            </p>
            <p class="mb-2 text-green-500" v-else-if="store.token">
              " Token Has Been Generated Successfully
            </p>
            <div class="flex flex-col gap-6 w-full">
              <!-- #region getHotelAvailability -->
              <div
                class="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Start Date:
                  <input
                    type="date"
                    v-model="store.params.startDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  End Date:
                  <input
                    type="date"
                    v-model="store.params.endDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Room Quantity:
                  <input
                    type="number"
                    v-model="store.params.roomStayQuantity"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Adults:
                  <input
                    type="number"
                    v-model="store.params.adults"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Children:
                  <input
                    type="number"
                    v-model="store.params.children"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Child Age:
                  <input
                    type="number"
                    v-model="store.params.childAge"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Code:
                  <input
                    type="text"
                    v-model="store.params.ratePlanCode"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Room Type Code:
                  <input
                    type="text"
                    v-model="store.params.roomTypeCode"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Include Closed Rates:
                  <input
                    type="checkbox"
                    v-model="store.params.includeClosedRates"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Include Default Rate Plan Set:
                  <input
                    type="checkbox"
                    v-model="store.params.includeDefaultRatePlanSet"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Set:
                  <input
                    type="text"
                    v-model="store.params.ratePlanSet"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Page Pointer Key:
                  <input
                    type="text"
                    v-model="store.params.pagePointerKey"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 1 Count:
                  <input
                    type="number"
                    v-model="store.params.bucket1Count"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 2 Count:
                  <input
                    type="number"
                    v-model="store.params.bucket2Count"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 3 Count:
                  <input
                    type="number"
                    v-model="store.params.bucket3Count"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 4 Count:
                  <input
                    type="number"
                    v-model="store.params.bucket4Count"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 5 Count:
                  <input
                    type="number"
                    v-model="store.params.bucket5Count"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Full Stay Time Span Start Date:
                  <input
                    type="date"
                    v-model="store.params.fullStayTimeSpanStartDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Full Stay Time Span End Date:
                  <input
                    type="date"
                    v-model="store.params.fullStayTimeSpanEndDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Prevailing Rate:
                  <input
                    type="text"
                    v-model="store.params.prevailingRate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Category:
                  <input
                    type="text"
                    v-model="store.params.rateCategory"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Class:
                  <input
                    type="text"
                    v-model="store.params.rateClass"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Group:
                  <input
                    type="text"
                    v-model="store.params.rateGroup"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Features:
                  <input
                    type="text"
                    v-model="store.params.features"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Reservation Guest ID:
                  <input
                    type="text"
                    v-model="store.params.reservationGuestId"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Reservation Guest ID Type:
                  <input
                    type="text"
                    v-model="store.params.reservationGuestIdType"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Hotel Reservation ID:
                  <input
                    type="text"
                    v-model="store.params.hotelReservationId"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Hotel Reservation ID Type:
                  <input
                    type="text"
                    v-model="store.params.hotelReservationIdType"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Info:
                  <input
                    type="text"
                    v-model="store.params.ratePlanInfo"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Return Only Available Rate Codes:
                  <input
                    type="checkbox"
                    v-model="store.params.returnOnlyAvailableRateCodes"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Res Guarantee Info:
                  <input
                    type="text"
                    v-model="store.params.resGuaranteeInfo"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Room Type Info:
                  <input
                    type="text"
                    v-model="store.params.roomTypeInfo"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Membership ID Number:
                  <input
                    type="text"
                    v-model="store.params.membershipIdNumber"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Smoking Preference:
                  <input
                    type="text"
                    v-model="store.params.smokingPreference"
                    class="grow"
                  />
                </label>
                <button
                  :disabled="!store.token ? true : false"
                  @click="store.getHotelAvailability"
                  class="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded shadow w-fit"
                >
                  Search Hotel Availability
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region getRatePlanDetail -->
              <div
                class="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-3"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Code:
                  <input
                    type="number"
                    v-model="store.params.ratePlanCode"
                    class="grow"
                  />
                </label>
                <button
                  :disabled="!store.token ? true : false"
                  @click="store.getRatePlanDetail"
                  class="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded shadow w-fit"
                >
                  Get Rate Plan Code Details
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region getAvailableGuanranteeCodes  -->
              <div
                class="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-3"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Code:
                  <input
                    type="number"
                    v-model="store.params.ratePlanCode"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Arrival Date:
                  <input
                    type="date"
                    v-model="store.params.arrivalDate"
                    class="grow"
                  />
                </label>
                <button
                  :disabled="!store.token ? true : false"
                  @click="store.getAvailableGuarantee"
                  class="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded shadow w-fit"
                >
                  Get Available Guarantee
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region getPaymentMethods  -->
              <div
                class="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-3"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Include Active Flag:
                  <input
                    type="checkbox"
                    v-model="store.params.includeInactiveFlag"
                    class="grow"
                  />
                </label>
                <button
                  :disabled="!store.token ? true : false"
                  @click="store.getPaymentMethod"
                  class="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded shadow w-fit"
                >
                  Get Payment Methods
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region getPackages  -->
              <div
                class="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-3"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Start Date:
                  <input
                    type="date"
                    v-model="store.params.startDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  End Date:
                  <input
                    type="date"
                    v-model="store.params.endDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Ticket Posting Rhythm:
                  <input
                    type="text"
                    v-model="store.params.ticketPostingRhythm"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Fetch Instructions:
                  <input
                    type="text"
                    v-model="store.params.fetchInstructions"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Sell Separate:
                  <input
                    type="text"
                    v-model="store.params.sellSeparate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Include Group:
                  <input
                    type="text"
                    v-model="store.params.includeGroup"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Description Wild Card:
                  <input
                    type="text"
                    v-model="store.params.descriptionWildCard"
                    class="grow"
                  />
                </label>
                <button
                  :disabled="!store.token ? true : false"
                  @click="store.getPackages"
                  class="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded shadow w-fit"
                >
                  Get Available Packages
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region getGuestProfile -->
              <div
                class="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-3"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Profile Name:
                  <input
                    type="text"
                    v-model="store.params.profileName"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Given Name:
                  <input
                    type="text"
                    v-model="store.params.givenName"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Profile Type:
                  <input
                    type="text"
                    v-model="store.params.profileType"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Summary Info:
                  <input
                    type="checkbox"
                    v-model="store.params.summaryInfo"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Hotel ID:
                  <input type="text" v-model="store.hotelId" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Limit:
                  <input
                    type="number"
                    v-model="store.params.limit"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  City:
                  <input type="text" v-model="store.params.city" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  State:
                  <input
                    type="text"
                    v-model="store.params.state"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Postal Code:
                  <input
                    type="text"
                    v-model="store.params.postalCode"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Communication:
                  <input
                    type="text"
                    v-model="store.params.communication"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Membership:
                  <input
                    type="text"
                    v-model="store.params.membership"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Search Type:
                  <input
                    type="text"
                    v-model="store.params.searchType"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Fetch Instructions:
                  <input
                    type="text"
                    v-model="store.params.fetchInstructions"
                    class="grow"
                  />
                </label>
                <button
                  :disabled="!store.token ? true : false"
                  @click="store.getGuestProfile"
                  class="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded shadow w-fit"
                >
                  Get Guest Profile
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region createReservation -->
              <form
                @submit.prevent="store.createReservationWithExistingGuest"
                class="grid grid-cols-2 items-center gap-4 p-4 bg-white rounded-lg shadow"
              >
                <h3 class="col-span-2 text-xl font-semibold text-black">
                  Form Create Reservation with Existing Guest
                </h3>
                <label class="flex gap-2 items-center input input-bordered">
                  Guest Profile ID:
                  <input
                    required
                    type="text"
                    v-model="store.params.guestProfileId"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Start Date:
                  <input
                    type="date"
                    v-model="store.params.startDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate End Date:
                  <input
                    type="date"
                    v-model="store.params.endDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Room Type Charged:
                  <input
                    type="text"
                    v-model="store.params.roomTypeCharged"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Code:
                  <input
                    type="text"
                    v-model="store.params.ratePlanCode"
                    class="grow"
                    required
                  />
                </label>
                <label class="form-control w-full">
                  <select
                    class="select select-bordered w-full"
                    v-model="store.params.roomType"
                    title="Room Type:"
                    required
                  >
                    <option disabled selected>Room Type:</option>
                    <option value="KS1B">KS1B</option>
                    <option value="KT1B">KT1B</option>
                    <option value="LA1B">LA1B</option>
                    <option value="LB1B">LB1B</option>
                    <option value="MR1B">MR1B</option>
                    <option value="RK1B">RK1B</option>
                    <option value="WA1B">WA1B</option>
                  </select>
                </label>
                <label class="form-control w-full">
                  <select
                    class="select select-bordered w-full"
                    v-model="store.params.guaranteeCode"
                    title="Room Type:"
                    required
                  >
                    <option disabled selected>Guarantee Code:</option>
                    <option value="CC">CC</option>
                    <option value="CHECK IN">CHECK IN</option>
                    <option value="DRQ">DB</option>
                    <option value="DRV">DRV</option>
                    <option value="PM">PM</option>
                  </select>
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Children:
                  <input
                    type="text"
                    v-model="store.params.children"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Adults:
                  <input
                    type="text"
                    v-model="store.params.adults"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Arrival Date:
                  <input
                    type="date"
                    v-model="store.params.arrivalDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Departure Date:
                  <input
                    type="date"
                    v-model="store.params.departureDate"
                    class="grow"
                  />
                </label>
                <button
                  :disabled="!store.token"
                  class="px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded shadow w-fit"
                >
                  Create Reservation
                </button>
                <p
                  class="text-red-500 font-bold text-end col-span-full"
                  v-if="store.isGuestProfileNotFound"
                >
                  *Guest Profile Id Is Not Found
                </p>
                <p
                  v-if="store.errorMessage"
                  class="text-red-500 font-bold text-end col-span-full"
                >
                  {{ store.errorMessage }}
                </p>
                <p
                  v-if="store.reservationId"
                  class="text-green-500 text-xl font-bold text-end col-span-full"
                >
                  Reservation Id: {{ store.reservationId }}
                </p>
              </form>
              <!-- #endregion -->
            </div>
          </div>
        </header>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <img
        v-if="!store.token"
        src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="Leafs"
        class="object-cover w-full h-24"
      />
      <div v-else class="p-3">
        <JsonViewer
          :value="store.token"
          copyable
          expandable
          boxed
          sort
          theme="jv-dark"
        />
      </div>
      <div v-if="store.jsonData && store.token" class="p-3">
        <JsonViewer
          :value="store.jsonData"
          copyable
          expandable
          boxed
          sort
          theme="jv-dark"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
