import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";
import {
  getHeaders,
  makeAxiosRequest,
  extractProfileIds,
} from "@/services/apiService";
import { getApiEndpoints, ENV_VARS } from "@/config/constants";

const hotelId = ref("SUMBA");

export const useApisStore = defineStore("apis", () => {
  const reservationId = ref();
  const reservationResponseData = ref();
  const token = ref("");
  const jsonData = ref(null);
  const isGuestProfileNotFound = ref(false);
  const errorMessage = ref(""); // Added this line

  const params = reactive({
    roomStayStartDate: new Date().toISOString().split("T")[0],
    roomStayEndDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    limit: 5,
    children: 0,
    arrivalDate: new Date().toISOString().split("T")[0],
    includeInactiveFlag: false,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    roomStayQuantity: null,
    childAge: null,
    ratePlanCode: "FITRACK",
    roomTypeCode: null,
    includeClosedRates: null,
    includeDefaultRatePlanSet: null,
    ratePlanSet: null,
    pagePointerKey: null,
    bucket1Count: null,
    bucket2Count: null,
    bucket3Count: null,
    bucket4Count: null,
    bucket5Count: null,
    fullStayTimeSpanStartDate: null,
    fullStayTimeSpanEndDate: null,
    prevailingRate: null,
    rateCategory: null,
    rateClass: null,
    rateGroup: null,
    features: null,
    reservationGuestId: null,
    reservationGuestIdType: null,
    hotelReservationId: null,
    hotelReservationIdType: null,
    ratePlanInfo: null,
    returnOnlyAvailableRateCodes: null,
    resGuaranteeInfo: null,
    roomTypeInfo: null,
    membershipIdNumber: null,
    smokingPreference: null,
    adults: null,
    ticketPostingRhythm: null,
    fetchInstructions: "Comment",
    sellSeparate: null,
    includeGroup: null,
    descriptionWildCard: null,
    givenName: null,
    profileName: "*",
    profileType: "Guest",
    summaryInfo: true,
    city: null,
    state: null,
    postalCode: null,
    communication: null,
    membership: null,
    searchType: "Any",
    fetchInstructionsGuest: null,
    guestProfileId: null,
    departureDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    roomType: null,
    roomTypeCharged: null,
    guaranteeCode: null,
  });

  const API_ENDPOINTS = getApiEndpoints();

  const generateAccessToken = async () => {
    try {
      const response = await axios({
        url: `http://localhost:5173/api/oauth/v1/tokens`,
        method: "POST",
        data: {
          username: ENV_VARS.VITE_USERNAME,
          password: ENV_VARS.VITE_PASSWORD,
          grant_type: "password",
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "cache-control": "no-cache",
          "x-app-key": ENV_VARS.VITE_APP_KEY,
          Authorization: `Basic ${btoa(
            `${ENV_VARS.VITE_CLIENT_ID}:${ENV_VARS.VITE_CLIENT_SECRET}`
          )}`,
        },
      });
      token.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestConfig = (url, additionalParams = {}) => ({
    url: `http://localhost:5173/api${url}`,
    method: "GET",
    params: { ...additionalParams },
    headers: getHeaders(token.value.access_token),
  });

  const fetchData = async (endpoint, additionalParams = {}) => {
    jsonData.value = await makeAxiosRequest(
      getRequestConfig(endpoint, additionalParams)
    );
  };

  const getHotelAvailability = () =>
    fetchData(API_ENDPOINTS.hotelAvailability, {
      roomStayStartDate: params.roomStayStartDate,
      roomStayEndDate: params.roomStayEndDate,
      roomStayQuantity: params.roomStayQuantity,
      adults: params.adults,
      children: params.children,
      childAge: params.childAge,
      ratePlanCode: params.ratePlanCode,
      roomTypeCode: params.roomTypeCode,
      includeClosedRates: params.includeClosedRates,
      includeDefaultRatePlanSet: params.includeDefaultRatePlanSet,
      ratePlanSet: params.ratePlanSet,
      pagePointerKey: params.pagePointerKey,
      bucket1Count: params.bucket1Count,
      bucket2Count: params.bucket2Count,
      bucket3Count: params.bucket3Count,
      bucket4Count: params.bucket4Count,
      bucket5Count: params.bucket5Count,
      fullStayTimeSpanStartDate: params.fullStayTimeSpanStartDate,
      fullStayTimeSpanEndDate: params.fullStayTimeSpanEndDate,
      prevailingRate: params.prevailingRate,
      rateCategory: params.rateCategory,
      rateClass: params.rateClass,
      rateGroup: params.rateGroup,
      features: params.features,
      reservationGuestId: params.reservationGuestId,
      reservationGuestIdType: params.reservationGuestIdType,
      hotelReservationId: params.hotelReservationId,
      hotelReservationIdType: params.hotelReservationIdType,
      ratePlanInfo: params.ratePlanInfo,
      returnOnlyAvailableRateCodes: params.returnOnlyAvailableRateCodes,
      resGuaranteeInfo: params.resGuaranteeInfo,
      roomTypeInfo: params.roomTypeInfo,
      membershipIdNumber: params.membershipIdNumber,
      smokingPreference: params.smokingPreference,
      limit: params.limit,
    });

  const getRatePlanDetail = () => fetchData(API_ENDPOINTS.ratePlanDetail);

  const getAvailableGuarantee = () =>
    fetchData(API_ENDPOINTS.availableGuarantee, {
      ratePlanCode: params.ratePlanCode,
      arrivalDate: params.arrivalDate,
      hotelId: hotelId.value,
    });

  const getPaymentMethod = () =>
    fetchData(API_ENDPOINTS.paymentMethod, {
      includeInactiveFlag: params.includeInactiveFlag,
    });

  const getPackages = () =>
    fetchData(API_ENDPOINTS.packages, {
      adults: params.adults,
      children: params.children,
      hotelId: hotelId.value,
      startDate: params.startDate,
      endDate: params.endDate,
      ticketPostingRhythm: params.ticketPostingRhythm,
      fetchInstructions: params.fetchInstructions,
      sellSeparate: params.sellSeparate,
      includeGroup: params.includeGroup,
      descriptionWildCard: params.descriptionWildCard,
    });

  const getGuestProfile = () =>
    fetchData(API_ENDPOINTS.guestProfile, {
      profileName: params.profileName,
      givenName: params.givenName,
      profileType: params.profileType,
      summaryInfo: params.summaryInfo,
      hotelId: hotelId.value,
      limit: params.limit,
      city: params.city,
      state: params.state,
      postalCode: params.postalCode,
      communication: params.communication,
      membership: params.membership,
      searchType: params.searchType,
      fetchInstructions: params.fetchInstructionsGuest,
    });

  const createReservationWithExistingGuest = async () => {
    try {
      reservationId.value = null;
      await getGuestProfile();
      if (!jsonData.value?.profileSummaries?.profileInfo) {
        console.log("No Profile Data Received From GetGuestProfile");
        return;
      }

      const profileIds = extractProfileIds(jsonData.value);
      console.log("Profile IDs:", profileIds);

      if (!profileIds.includes(params.guestProfileId)) {
        isGuestProfileNotFound.value = true;
        console.log("Profile Id Does Not Exist");
        return;
      }

      console.log("Profile Id Exists");
      const reservationData = createReservationData();
      const response = await postReservation(reservationData);
      handleReservationResponse(response);
    } catch (error) {
      console.error("Error creating reservation:", error);
      errorMessage.value = "Error Profile ID Does Not Exist";
    }
  };

  const createReservationData = () => ({
    reservations: {
      reservation: {
        reservationGuests: {
          profileInfo: {
            profileIdList: {
              id: params.guestProfileId,
              type: "Profile",
            },
          },
        },
        reservationPaymentMethods: {
          paymentMethod: "CA",
        },
        markAsRecentlyAccessed: true,
        hotelId: hotelId.value,
        reservationStatus: "Reserved",
        roomStay: {
          guarantee: {
            onHold: false,
            guaranteeCode: params.guaranteeCode,
          },
          roomRates: {
            sourceCode: "WEB",
            numberOfUnits: 1,
            rates: {
              rate: {
                start: params.startDate,
                end: params.endDate,
                base: {
                  amountBeforeTax: 50,
                  currencyCode: "USD",
                },
              },
            },
            start: params.startDate,
            marketCode: "LEISURE",
            end: params.endDate,
            roomTypeCharged: params.roomTypeCharged,
            ratePlanCode: params.ratePlanCode,
            roomType: params.roomType,
            pseudoRoom: false,
          },
          guestCounts: {
            children: params.children,
            adults: params.adults,
          },
          departureDate: params.departureDate,
          arrivalDate: params.arrivalDate,
        },
      },
    },
    fetchInstructions: "Reservation",
  });

  const postReservation = async (reservationData) => {
    return axios({
      url: `http://localhost:5173/api/rsv/v1/hotels/${hotelId.value}/reservations`,
      method: "POST",
      data: reservationData,
      headers: getHeaders(token.value.access_token),
    });
  };

  const handleReservationResponse = (response) => {
    reservationResponseData.value = response.data;
    const reservationLink = reservationResponseData.value.links.find((link) =>
      link.href.includes("/reservations/")
    );
    reservationId.value = reservationLink
      ? reservationLink.href.match(/reservations\/(\d+)/)[1]
      : null;
  };

  const getReservation = () => fetchData(API_ENDPOINTS.getResevartion);

  const putReservation = async (reservationId) => {
    try {
      const response = await axios({
        url: `http://localhost:5173/api/rsv/v1/hotels/${hotelId.value}/reservations/${reservationId.value}`,
        method: "PUT",
        data: {
          reservations: [
            {
              reservationIdList: [
                {
                  type: "Reservation",
                  id: reservationId.value,
                },
              ],
              comments: [
                {
                  comment: {
                    commentTitle: "Reservation General Notes",
                    notificationLocation: "GEN",
                    type: "RESERVATION",
                    internal: true,
                    text: {
                      value: "Adding a reservation note here",
                    },
                  },
                },
              ],
              hotelId: hotelId.value,
              customReference: "",
              preRegistered: false,
              allowMobileCheckout: false,
            },
          ],
        },
        headers: getHeaders(token.value.access_token),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating reservation:", error);
      throw error;
    }
  };

  return {
    isGuestProfileNotFound,
    token,
    reservationId,
    jsonData,
    hotelId,
    params,
    errorMessage, // Added this line
    generateAccessToken,
    getHotelAvailability,
    getRatePlanDetail,
    getAvailableGuarantee,
    getPaymentMethod,
    getPackages,
    getGuestProfile,
    createReservationWithExistingGuest,
    getReservation,
    putReservation,
  };
});
