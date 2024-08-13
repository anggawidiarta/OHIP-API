<!-- eslint-disable -->
<script setup>
import { ref, watch } from "vue";
import { JsonViewer } from "vue3-json-viewer";
import JsonViewerComponent from "@/components/JsonViewerComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FormComponent from "@/components/FormComponent.vue";

import { useApisStore } from "@/stores/api";
import { RouterLink } from "vue-router";

const store = useApisStore();
</script>

<template>
  <div class="flex flex-wrap">
    <div class="mb-10 w-full">
      <div class="container mx-auto h-full sm:p-10">
        <HeaderComponent />
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
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Search Hotel Availability"
                :errorMessage="store.errorHotelAvailabilityMessage"
                @submit="store.getHotelAvailability"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Start Date:
                  <input
                    type="date"
                    v-model="store.params.startDate"
                    class="grow"
                    required
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  End Date:
                  <input
                    type="date"
                    v-model="store.params.endDate"
                    class="grow"
                    required
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Room Quantity:
                  <input
                    type="number"
                    v-model="store.params.roomStayQuantity"
                    class="grow"
                    required
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Adults:
                  <input
                    type="number"
                    v-model="store.params.adults"
                    class="grow"
                    required
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Children:
                  <input
                    type="number"
                    v-model="store.params.children"
                    class="grow"
                    required
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
              </FormComponent>
              <!-- #endregion -->

              <!-- #region getRatePlanDetail -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Get Rate Plan Detail"
                @submit="store.getRatePlanDetail"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Code:
                  <input
                    type="text"
                    v-model="store.params.ratePlanCode"
                    class="grow"
                    required
                  />
                </label>
              </FormComponent>
              <!-- #endregion -->

              <!-- #region getMarketCodeForProperty -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Get Market Code"
                :errorMessage="store.errorMarketCodeMessage"
                @submit="store.getMarketCodes"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Value Name:
                  <input
                    type="text"
                    v-model="store.valueName"
                    class="grow"
                    required
                  />
                </label>
              </FormComponent>
              <!-- #endregion -->

              <!-- #region getSourceCodeForProperty -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Get Source Code"
                :errorMessage="store.errorSourceCodeMessage"
                @submit="store.getSourceCodes"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Value Name:
                  <input
                    type="text"
                    v-model="store.valueName"
                    class="grow"
                    required
                  />
                </label>
              </FormComponent>

              <!-- #region getAvailableGuanranteeCodes  -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Get Guarantee Code"
                @submit="store.getAvailableGuarantee"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Code:
                  <input
                    type="text"
                    v-model="store.params.ratePlanCode"
                    class="grow"
                    required
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Arrival Date:
                  <input
                    type="date"
                    v-model="store.params.arrivalDate"
                    class="grow"
                    required
                  />
                </label>
              </FormComponent>
              <!-- #endregion -->

              <!-- #region getPaymentMethods  -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Get Payment Methods"
                @submit="store.getPaymentMethod"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Include Active Flag:
                  <input
                    type="checkbox"
                    v-model="store.params.includeInactiveFlag"
                    class="grow"
                  />
                </label>
              </FormComponent>
              <!-- #endregion -->

              <!-- #region getPackages  -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Get Available Packages"
                @submit="store.getPackages"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Start Date:
                  <input
                    type="date"
                    v-model="store.params.startDate"
                    class="grow"
                    required
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  End Date:
                  <input
                    type="date"
                    v-model="store.params.endDate"
                    class="grow"
                    required
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
              </FormComponent>
              <!-- #endregion -->

              <!-- #region getGuestProfile -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Get Guest Profile"
                @submit="store.getGuestProfile"
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
              </FormComponent>
              <!-- #endregion -->

              <!-- #region createReservation -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-blue-500 rounded shadow w-fit"
                buttonText="Create Reservation"
                :errorMessage="store.errorMessage"
                @submit="store.createReservationWithExistingGuest"
              >
                <h3 class="col-span-full text-xl font-semibold">
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
                <label class="w-full form-control">
                  <select
                    class="w-full select select-bordered"
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
                <label class="w-full form-control">
                  <select
                    class="w-full select select-bordered"
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
                <p
                  class="col-span-full font-bold text-red-500 text-end"
                  v-if="store.isGuestProfileNotFound"
                >
                  *Guest Profile Id Is Not Found
                </p>

                <p
                  v-if="store.reservationId"
                  class="col-span-full text-xl font-bold text-green-500 text-end"
                >
                  Reservation Id: {{ store.reservationId }}
                </p>
              </FormComponent>
              <!-- #endregion -->

              <!-- #region getReservation -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Get Reservation By Id"
                :errorMessage="store.errorGetReservationMessage"
                @submit="store.getReservation"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Reservation ID:
                  <input
                    type="text"
                    v-model="store.reservationId"
                    class="grow"
                    required
                  />
                </label>
                <div class="col-span-full" v-if="store.guestReservationData">
                  <p class="font-semibold text-green-500">
                    Guest Data by Reservation Id : {{ store.reservationId }}
                  </p>
                  <JsonViewer
                    :value="store.guestReservationData"
                    copyable
                    expandable
                    boxed
                    theme="jv-dark"
                  />
                </div>
              </FormComponent>
              <!-- #endregion -->

              <!-- #region guestCancelReservation -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-red-500 rounded shadow w-fit"
                buttonText="Cancel Reservation"
                :successMessage="store.cancelSuccessMessage"
                :errorMessage="store.cancelErrorMessage"
                @submit="store.cancelReservation"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Reservation ID:
                  <input
                    type="text"
                    v-model="store.reservationId"
                    class="grow"
                    required
                  />
                </label>
              </FormComponent>
              <!-- #endregion -->

              <!-- #region updateReservation -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-yellow-500 rounded shadow w-fit"
                buttonText="Update Reservation"
                :successMessage="store.updateReservationSuccess"
                :errorMessage="store.updateReservationError"
                @submit="store.putReservation"
              >
                <h3 class="col-span-full text-xl font-semibold">
                  Update Reservation
                </h3>
                <label class="flex gap-2 items-center input input-bordered">
                  Reservation ID:
                  <input
                    required
                    type="text"
                    v-model="store.reservationId"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Comment Title:
                  <input
                    required
                    type="text"
                    v-model="store.params.commentTitle"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Comment Text:
                  <input
                    required
                    type="text"
                    v-model="store.params.commentText"
                    class="grow"
                  />
                </label>
              </FormComponent>
              <!-- #endregion -->

              <!-- #region getLovNames -->
              <FormComponent
                formClass="grid grid-cols-1 gap-3 p-3 rounded-xl border-2 border-green-500 lg:grid-cols-2 xl:grid-cols-3"
                buttonClass="p-3 text-lg font-medium text-white col-span-full !w-full sm:!w-[225px] bg-green-500 rounded shadow w-fit"
                buttonText="Get List Of Values Name"
                @submit="store.getLovNames"
              >
              </FormComponent>
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
      <JsonViewerComponent v-if="store.token" :data="store.token" />
      <JsonViewerComponent
        v-if="store.jsonData && store.token"
        :data="store.jsonData"
      />
      <JsonViewerComponent
        v-if="store.listOfValuesData && store.token"
        :data="store.listOfValuesData"
      />
    </div>
  </div>
</template>
