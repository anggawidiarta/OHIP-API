<!-- eslint-disable -->
<script setup>
import { ref } from "vue";
import { JsonViewer } from "vue3-json-viewer";
import axios from "axios";

const token = ref("");
const isLoading = ref(true);
const jsonData = ref({});
const hotelId = ref("SUMBA");

const {
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_USERNAME,
  VITE_PASSWORD,
  VITE_BASE_URL,
  VITE_APP_KEY,
} = import.meta.env;

// #region params
const roomStayStartDate = ref(new Date().toISOString().split("T")[0]);
const roomStayEndDate = ref(
  new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0]
);
const roomStayQuantity = ref();
const childAge = ref();
const ratePlanCode = ref();
const roomTypeCode = ref();
const includeClosedRates = ref();
const includeDefaultRatePlanSet = ref();
const ratePlanSet = ref();
const pagePointerKey = ref();
const bucket1Count = ref();
const bucket2Count = ref();
const bucket3Count = ref();
const bucket4Count = ref();
const bucket5Count = ref();
const fullStayTimeSpanStartDate = ref();
const fullStayTimeSpanEndDate = ref();
const prevailingRate = ref();
const rateCategory = ref();
const rateClass = ref();
const rateGroup = ref();
const features = ref();
const reservationGuestId = ref();
const reservationGuestIdType = ref();
const hotelReservationId = ref();
const hotelReservationIdType = ref();
const ratePlanInfo = ref();
const returnOnlyAvailableRateCodes = ref();
const resGuaranteeInfo = ref();
const roomTypeInfo = ref();
const membershipIdNumber = ref();
const smokingPreference = ref();
const adults = ref();
const children = ref(0);
const arrivalDate = ref(new Date().toISOString().split("T")[0]);
const includeInactiveFlag = ref(false);
const ticketPostingRhythm = ref();
const fetchInstructions = ref();
const sellSeparate = ref();
const includeGroup = ref();
const descriptionWildCard = ref();
const startDate = ref(new Date().toISOString().split("T")[0]);
const endDate = ref(
  new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0]
);
// #endregion

//  url: `https://cors-anywhere.herokuapp.com/${VITE_BASE_URL}/oauth/v1/tokens`

const generateAccessToken = async () => {
  try {
    const response = await axios({
      url: `http://localhost:5173/api/oauth/v1/tokens`,
      method: "POST",
      data: {
        username: VITE_USERNAME,
        password: VITE_PASSWORD,
        grant_type: "password",
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        "x-app-key": VITE_APP_KEY,
        Authorization:
          "Basic " + btoa(VITE_CLIENT_ID + ":" + VITE_CLIENT_SECRET),
      },
    });
    token.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    // console.log(VITE_CLIENT_ID);
  }
};

const getHotelAvailability = async () => {
  try {
    const response = await axios({
      url: `http://localhost:5173/api/par/v1/hotels/SUMBA/availability`,
      method: "GET",
      params: {
        roomStayStartDate: roomStayStartDate.value,
        roomStayEndDate: roomStayEndDate.value,
        roomStayQuantity: roomStayQuantity.value,
        adults: adults.value,
        children: children.value,
        childAge: childAge.value,
        ratePlanCode: ratePlanCode.value,
        roomTypeCode: roomTypeCode.value,
        includeClosedRates: includeClosedRates.value,
        includeDefaultRatePlanSet: includeDefaultRatePlanSet.value,
        ratePlanSet: ratePlanSet.value,
        pagePointerKey: pagePointerKey.value,
        bucket1Count: bucket1Count.value,
        bucket2Count: bucket2Count.value,
        bucket3Count: bucket3Count.value,
        bucket4Count: bucket4Count.value,
        bucket5Count: bucket5Count.value,
        fullStayTimeSpanStartDate: fullStayTimeSpanStartDate.value,
        fullStayTimeSpanEndDate: fullStayTimeSpanEndDate.value,
        prevailingRate: prevailingRate.value,
        rateCategory: rateCategory.value,
        rateClass: rateClass.value,
        rateGroup: rateGroup.value,
        features: features.value,
        reservationGuestId: reservationGuestId.value,
        reservationGuestIdType: reservationGuestIdType.value,
        hotelReservationId: hotelReservationId.value,
        hotelReservationIdType: hotelReservationIdType.value,
        ratePlanInfo: ratePlanInfo.value,
        returnOnlyAvailableRateCodes: returnOnlyAvailableRateCodes.value,
        resGuaranteeInfo: resGuaranteeInfo.value,
        roomTypeInfo: roomTypeInfo.value,
        membershipIdNumber: membershipIdNumber.value,
        smokingPreference: smokingPreference.value,
        limit: 5,
      },
      headers: {
        "Accept-Language": "*",
        "Content-Type": "application/json",
        "x-app-key": VITE_APP_KEY,
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        "x-hotelid": "SUMBA",
        Authorization: "Bearer " + token.value.access_token,
      },
    });
    jsonData.value = response.data;
  } catch (error) {
    console.error(
      "Error fetching hotel availability:",
      error.response ? error.response.data : error.message
    );
  } finally {
    console.log(VITE_CLIENT_ID);
  }
};

const getRatePlanDetail = async () => {
  try {
    const response = await axios({
      url: `http://localhost:5173/api/par/v1/hotels/SUMBA/rates/${ratePlanCode.value}`,
      method: "GET",
      params: {},
      headers: {
        "Accept-Language": "*",
        "Content-Type": "application/json",
        "x-app-key": VITE_APP_KEY,
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        "x-hotelid": "SUMBA",
        Authorization: "Bearer " + token.value.access_token,
      },
    });
    jsonData.value = response.data;
    console.log(jsonData);
    console.log(adults);
  } catch (error) {
    console.error(
      "Error fetching hotel availability:",
      error.response ? error.response.data : error.message
    );
  } finally {
    console.log(VITE_CLIENT_ID);
  }
};

const getAvailableGuarantee = async () => {
  try {
    const response = await axios({
      url: `http://localhost:5173/api/par/v1/hotels/SUMBA/guarantees`,
      method: "GET",
      params: {
        ratePlanCode: ratePlanCode.value,
        arrivalDate: arrivalDate.value,
        hotelId: "SUMBA",
      },
      headers: {
        "Accept-Language": "*",
        "Content-Type": "application/json",
        "x-app-key": VITE_APP_KEY,
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        "x-hotelid": "SUMBA",
        Authorization: "Bearer " + token.value.access_token,
      },
    });
    jsonData.value = response.data;
  } catch (error) {
    console.error(
      "Error fetching hotel availability:",
      error.response ? error.response.data : error.message
    );
  } finally {
    // console.log(VITE_CLIENT_ID);
  }
};

const getPaymentMethod = async () => {
  try {
    const response = await axios({
      url: `http://localhost:5173/api/lov/v1/listOfValues/hotels/SUMBA/paymentMethods`,
      method: "GET",
      params: {
        includeInactiveFlag: includeInactiveFlag.value,
      },
      headers: {
        "Accept-Language": "*",
        "Content-Type": "application/json",
        "x-app-key": VITE_APP_KEY,
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        "x-hotelid": "SUMBA",
        Authorization: "Bearer " + token.value.access_token,
      },
    });
    jsonData.value = response.data;
  } catch (error) {
    console.error(
      "Error fetching hotel availability:",
      error.response ? error.response.data : error.message
    );
  } finally {
    // console.log(VITE_CLIENT_ID);
  }
};

const getPackages = async () => {
  try {
    const response = await axios({
      url: `http://localhost:5173/api/rtp/v1/packages`,
      method: "GET",
      params: {
        adults: adults.value,
        children: children.value,
        hotelId: "SUMBA",
        startDate: startDate.value,
        endDate: endDate.value,
        ticketPostingRhythm: ticketPostingRhythm.value,
        fetchInstructions: fetchInstructions.value,
        sellSeparate: sellSeparate.value,
        includeGroup: includeGroup.value,
        descriptionWildCard: descriptionWildCard.value,
      },
      headers: {
        "Accept-Language": "*",
        "Content-Type": "application/json",
        "x-app-key": VITE_APP_KEY,
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        "x-hotelid": "SUMBA",
        Authorization: "Bearer " + token.value.access_token,
      },
    });
    jsonData.value = response.data;
  } catch (error) {
    console.error(
      "Error fetching hotel availability:",
      error.response ? error.response.data : error.message
    );
  } finally {
    // console.log(VITE_CLIENT_ID);
  }
};
</script>

<template>
  <div class="flex flex-wrap">
    <div class="mb-10 w-full md:w-8/12">
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
              @click="generateAccessToken"
              class="px-4 py-2 my-4 text-2xl font-medium text-white bg-yellow-700 rounded shadow transition-all duration-150 hover:bg-yellow-300"
            >
              Generate Access Token
            </button>
            <p class="mb-2 text-red-500" v-if="!token">
              *You Need To Generate Access Token First To Use These Functions
            </p>
            <p class="mb-2 text-green-500" v-else-if="token">
              " Token Has Been Generated Successfully
            </p>
            <div class="flex flex-col gap-6 w-full">
              <!-- #region getHotelAvailability -->
              <div
                class="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3 rounded-xl border-2 border-green-500"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Start Date:
                  <input type="date" v-model="roomStayStartDate" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  End Date:
                  <input type="date" v-model="roomStayEndDate" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Room Quantity:
                  <input
                    type="number"
                    v-model="roomStayQuantity"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Adults:
                  <input type="number" v-model="adults" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Children:
                  <input type="number" v-model="children" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Child Age:
                  <input type="number" v-model="childAge" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Code:
                  <input type="text" v-model="ratePlanCode" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Room Type Code:
                  <input type="text" v-model="roomTypeCode" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Include Closed Rates:
                  <input type="checkbox" v-model="includeClosedRates" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Include Default Rate Plan Set:
                  <input type="checkbox" v-model="includeDefaultRatePlanSet" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Set:
                  <input type="text" v-model="ratePlanSet" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Page Pointer Key:
                  <input type="text" v-model="pagePointerKey" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 1 Count:
                  <input type="number" v-model="bucket1Count" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 2 Count:
                  <input type="number" v-model="bucket2Count" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 3 Count:
                  <input type="number" v-model="bucket3Count" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 4 Count:
                  <input type="number" v-model="bucket4Count" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Bucket 5 Count:
                  <input type="number" v-model="bucket5Count" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Full Stay Time Span Start Date:
                  <input
                    type="date"
                    v-model="fullStayTimeSpanStartDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Full Stay Time Span End Date:
                  <input
                    type="date"
                    v-model="fullStayTimeSpanEndDate"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Prevailing Rate:
                  <input type="text" v-model="prevailingRate" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Category:
                  <input type="text" v-model="rateCategory" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Class:
                  <input type="text" v-model="rateClass" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Group:
                  <input type="text" v-model="rateGroup" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Features:
                  <input type="text" v-model="features" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Reservation Guest ID:
                  <input
                    type="text"
                    v-model="reservationGuestId"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Reservation Guest ID Type:
                  <input
                    type="text"
                    v-model="reservationGuestIdType"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Hotel Reservation ID:
                  <input
                    type="text"
                    v-model="hotelReservationId"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Hotel Reservation ID Type:
                  <input
                    type="text"
                    v-model="hotelReservationIdType"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Info:
                  <input type="text" v-model="ratePlanInfo" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Return Only Available Rate Codes:
                  <input
                    type="checkbox"
                    v-model="returnOnlyAvailableRateCodes"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Res Guarantee Info:
                  <input type="text" v-model="resGuaranteeInfo" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Room Type Info:
                  <input type="text" v-model="roomTypeInfo" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Membership ID Number:
                  <input
                    type="text"
                    v-model="membershipIdNumber"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Smoking Preference:
                  <input type="text" v-model="smokingPreference" class="grow" />
                </label>
                <button
                  :disabled="!token ? true : false"
                  @click="getHotelAvailability"
                  class="px-4 py-2 text-lg font-medium text-white bg-green-500 rounded shadow w-fit"
                >
                  Search Hotel Availability
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region getRatePlanDetail -->
              <div
                class="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3 rounded-xl border-2 border-green-500"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Code:
                  <input type="number" v-model="ratePlanCode" class="grow" />
                </label>
                <button
                  :disabled="!token ? true : false"
                  @click="getRatePlanDetail"
                  class="px-4 py-2 text-lg w-fit font-medium text-white bg-green-500 rounded shadow"
                >
                  Get Rate Plan Code Details
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region getAvailableGuanranteeCodes  -->
              <div
                class="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3 rounded-xl border-2 border-green-500"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Rate Plan Code:
                  <input type="number" v-model="ratePlanCode" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Arrival Date:
                  <input type="date" v-model="arrivalDate" class="grow" />
                </label>
                <button
                  :disabled="!token ? true : false"
                  @click="getAvailableGuarantee"
                  class="px-4 py-2 text-lg w-fit font-medium text-white bg-green-500 rounded shadow"
                >
                  Get Available Guarantee
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region getPaymentMethods  -->
              <div
                class="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3 rounded-xl border-2 border-green-500"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Include Active Flag:
                  <input
                    type="checkbox"
                    v-model="includeInactiveFlag"
                    class="grow"
                  />
                </label>
                <button
                  :disabled="!token ? true : false"
                  @click="getPaymentMethod"
                  class="px-4 py-2 text-lg w-fit font-medium text-white bg-green-500 rounded shadow"
                >
                  Get Payment Methods
                </button>
              </div>
              <!-- #endregion -->

              <!-- #region getPackages  -->
              <div
                class="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3 rounded-xl border-2 border-green-500"
              >
                <label class="flex gap-2 items-center input input-bordered">
                  Start Date:
                  <input type="date" v-model="startDate" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  End Date:
                  <input type="date" v-model="endDate" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Ticket Posting Rhythm:
                  <input
                    type="text"
                    v-model="ticketPostingRhythm"
                    class="grow"
                  />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Fetch Instructions:
                  <input type="text" v-model="fetchInstructions" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Sell Separate:
                  <input type="text" v-model="sellSeparate" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Include Group:
                  <input type="text" v-model="includeGroup" class="grow" />
                </label>
                <label class="flex gap-2 items-center input input-bordered">
                  Description Wild Card:
                  <input
                    type="text"
                    v-model="descriptionWildCard"
                    class="grow"
                  />
                </label>
                <button
                  :disabled="!token ? true : false"
                  @click="getPackages"
                  class="px-4 py-2 text-lg w-fit font-medium text-white bg-green-500 rounded shadow"
                >
                  Get Available Packages
                </button>
              </div>
              <!-- #endregion -->
            </div>
          </div>
        </header>
      </div>
    </div>
    <div class="flex flex-col w-full md:w-4/12">
      <img
        v-if="!token"
        src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="Leafs"
        class="object-cover w-full h-full"
      />
      <div v-else class="p-3">
        <JsonViewer
          :value="token"
          copyable
          expandable
          boxed
          sort
          theme="jv-dark"
        />
      </div>
      <div v-if="jsonData && token" class="p-3">
        <JsonViewer
          :value="jsonData"
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
