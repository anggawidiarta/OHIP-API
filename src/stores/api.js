import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import axios from "axios";
import {
  getHeaders,
  makeAxiosRequest,
  extractProfileIds,
} from "@/services/apiService";
import { ENV_VARS } from "@/config/constants";

const hotelId = ref("SUMBA");

export const useApisStore = defineStore("apis", () => {
  const reservationId = ref();
  const cancelSuccessMessage = ref("");
  const cancelErrorMessage = ref("");
  const reservationResponseData = ref();
  const guestReservationData = ref();
  const token = ref("");
  const jsonData = ref(null);
  const listOfValuesData = ref(null);
  const isGuestProfileNotFound = ref(false);
  const errorMessage = ref("");
  const errorAvailableGuaranteeMessage = ref("");
  const errorHotelAvailabilityMessage = ref("");
  const errorMarketCodeMessage = ref("");
  const errorRatePlanCodeMessage = ref("");
  const errorPaymentMethodMessage = ref("");
  const errorAvailablePackageMessage = ref("");
  const updateReservationError = ref("");
  const updateReservationSuccess = ref("");
  const valueName = ref("");
  const errorSourceCodeMessage = ref("");
  const errorGetReservationMessage = ref("");
  const errorGuestProfilesMessage = ref("");

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
    commentTitle: "Reservation General Notes",
    commentText: "Adding a reservation note here",
  });

  const API_ENDPOINTS = computed(() => {
    const ratePlanCode = params.ratePlanCode || "*";
    const reservationIdValue = reservationId.value;

    return {
      hotelAvailability: `/par/v1/hotels/${ENV_VARS.HOTEL_ID}/availability`,
      ratePlanDetail: `/par/v1/hotels/${ENV_VARS.HOTEL_ID}/rates/${ratePlanCode}`,
      availableGuarantee: `/par/v1/hotels/${ENV_VARS.HOTEL_ID}/guarantees`,
      paymentMethod: `/lov/v1/listOfValues/hotels/${ENV_VARS.HOTEL_ID}/paymentMethods`,
      propertyCode: `/lov/v1/listOfValues/${valueName.value}`,
      listOfValues: `/lov/v1/listOfValues`,
      packages: `/rtp/v1/packages`,
      guestProfile: `/crm/v1/profiles`,
      getReservation: `/rsv/v1/hotels/${ENV_VARS.HOTEL_ID}/reservations/${reservationIdValue}`,
      putReservation: `/rsv/v1/hotels/${ENV_VARS.HOTEL_ID}/reservations/${reservationIdValue}`,
      postReservation: `/rsv/v1/hotels/${ENV_VARS.HOTEL_ID}/reservations`,
      postCancelReservation: `/rsv/v1/hotels/${ENV_VARS.HOTEL_ID}/reservations/${reservationIdValue}/cancellations`,
    };
  });

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

  const fetchData = async (
    responseVarName,
    endpoint,
    additionalParams = {}
  ) => {
    let responseVar;
    if (responseVarName === "jsonData") {
      responseVar = jsonData;
    } else if (responseVarName === "listOfValuesData") {
      responseVar = listOfValuesData;
    } else {
      responseVar = guestReservationData;
    }

    responseVar.value = await makeAxiosRequest(
      getRequestConfig(endpoint, additionalParams)
    );
  };

  const getHotelAvailability = () => {
    try {
      fetchData("jsonData", API_ENDPOINTS.value.hotelAvailability, {
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
    } catch (error) {
      errorHotelAvailabilityMessage.value = error.response.data.title;
      console.log(error);
    }
  };

  const getRatePlanDetail = async () => {
    errorRatePlanCodeMessage.value = "";
    try {
      await fetchData("jsonData", API_ENDPOINTS.value.ratePlanDetail);
    } catch (error) {
      errorRatePlanCodeMessage.value =
        "The Value For Rate Plan Code Is Invalid";
    }
  };

  const getAvailableGuarantee = async () => {
    try {
      await fetchData("jsonData", API_ENDPOINTS.value.availableGuarantee, {
        ratePlanCode: params.ratePlanCode,
        arrivalDate: params.arrivalDate,
        hotelId: hotelId.value,
      });
    } catch (error) {
      errorAvailableGuaranteeMessage.value = error.response.data.title;
    }
  };

  // fungsi untuk mengambil list of value dari API
  const getLovNames = () =>
    fetchData("listOfValuesData", API_ENDPOINTS.value.listOfValues, {
      hotelId: hotelId.value,
    });

  // fungsi untuk melakukan validasi dari salah satu nilai list of value yang diambil
  const getListOfValues = () => {
    fetchData("jsonData", API_ENDPOINTS.value.propertyCode);
  };

  const getSourceCodes = async () => {
    errorSourceCodeMessage.value = "";
    try {
      fetchData("jsonData", API_ENDPOINTS.value.propertyCode, {
        parameterValue: hotelId.value,
        parameterName: "HotelCode",
        includeInactiveFlag: false,
      });
    } catch (error) {
      errorSourceCodeMessage.value = error.response.data.title;
      console.log(error);
    }
  };

  const getMarketCodes = async () => {
    errorMarketCodeMessage.value = "";
    try {
      await fetchData("jsonData", API_ENDPOINTS.value.propertyCode, {
        hotelId: hotelId.value,
      });
    } catch (error) {
      errorMarketCodeMessage.value = error.response.data.title;
      console.log(error);
    }
  };

  const getPaymentMethod = async () => {
    errorAvailableGuaranteeMessage.value = "";
    try {
      await fetchData("jsonData", API_ENDPOINTS.value.paymentMethod, {
        includeInactiveFlag: params.includeInactiveFlag,
      });
    } catch (error) {
      errorPaymentMethodMessage.value = error.response.data.title;
    }
  };

  const getPackages = async () => {
    errorAvailablePackageMessage.value = "";
    try {
      await fetchData("jsonData", API_ENDPOINTS.value.packages, {
        adults: params.adults,
        children: params.children,
        hotelId: hotelId.value,
        startDate: params.startDate,
        endDate: params.endDate,
        fetchInstructions: "Header",
        // eslint-disable-next-line no-dupe-keys
        fetchInstructions: "Items",
        packageCode: "CHAMP",
      });
    } catch (error) {
      errorAvailablePackageMessage.value = error.response.data.title;
    }
  };

  const postGuestProfile = async () => {
    try {
      const guestProfileData = {
        guestDetails: {
          customer: {
            personName: [
              {
                givenName: "Ben",
                middleName: "A",
                surname: "Smith",
                nameSuffix: "",
                nameTitle: "Mr",
                envelopeGreeting: "",
                salutation: "",
                nameType: "PRIMARY",
                language: "E",
              },
            ],
            language: "E",
            nationality: "US",
          },
          profileType: "GUEST",
          statusCode: "ACTIVE",
          registeredProperty: hotelId.value,
          markForHistory: false,
        },
      };

      const response = await axios({
        url: `http://localhost:5173/api${API_ENDPOINTS.value.guestProfile}`,
        method: "POST",
        data: guestProfileData,
        headers: getHeaders(token.value.access_token),
      });

      console.log("Guest profile created successfully:", response.data);
    } catch (error) {
      console.error("Error creating guest profile:", error);
    }
  };

  const getGuestProfile = async () => {
    try {
      fetchData("jsonData", API_ENDPOINTS.value.guestProfile, {
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
    } catch (error) {
      errorGuestProfilesMessage.value = error.response.data.title;
    }
  };

  const createReservationWithExistingGuest = async () => {
    try {
      isGuestProfileNotFound.value = false;
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

      isGuestProfileNotFound.value = false;
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
      url: `http://localhost:5173/api${API_ENDPOINTS.value.postReservation}`,
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

  const getReservation = async () => {
    errorGetReservationMessage.value = "";
    try {
      await fetchData(
        "guestReservationData",
        API_ENDPOINTS.value.getReservation
      );
    } catch (error) {
      errorGetReservationMessage.value = error.response.data.title;
    }
  };

  const putReservation = async () => {
    try {
      updateReservationError.value = "";
      updateReservationSuccess.value = "";
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
                    commentTitle: params.commentTitle,
                    notificationLocation: "GEN",
                    type: "RESERVATION",
                    internal: true,
                    text: {
                      value: params.commentText,
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
      updateReservationSuccess.value = "Reservation updated successfully!";
      return response.data;
    } catch (error) {
      console.error("Error updating reservation:", error);
      updateReservationError.value =
        "Error updating reservation: " + error.message;
      throw error;
    }
  };

  const postCancelReservation = async (reservationId) => {
    try {
      const response = await axios({
        url: `http://localhost:5173/api/rsv/v1/hotels/${hotelId.value}/reservations/${reservationId.value}/cancellations`,
        method: "POST",
        headers: getHeaders(token.value.access_token),
        data: {
          reason: {
            code: "DUP",
            description: "Trip Cancelled",
          },
          reservations: {
            reservationIdList: {
              id: reservationId.value,

              type: "Reservation",
            },
            hotelId: hotelId.value,
          },
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      throw error;
    }
  };

  const cancelReservation = async () => {
    try {
      const response = await postCancelReservation(reservationId);
      cancelSuccessMessage.value = "Reservation cancelled successfully!";
      cancelErrorMessage.value = "";
      console.log(response);
    } catch (error) {
      cancelSuccessMessage.value = "";
      cancelErrorMessage.value =
        "Error cancelling reservation: " + error.message;
    }
  };

  return {
    isGuestProfileNotFound,
    token,
    reservationId,
    guestReservationData,
    jsonData,
    listOfValuesData,
    hotelId,
    params,
    valueName,
    errorMarketCodeMessage,
    errorSourceCodeMessage,
    cancelErrorMessage,
    errorRatePlanCodeMessage,
    errorAvailableGuaranteeMessage,
    cancelSuccessMessage,
    updateReservationError,
    updateReservationSuccess,
    errorMessage,
    errorPaymentMethodMessage,
    errorHotelAvailabilityMessage,
    errorGetReservationMessage,
    errorAvailablePackageMessage,
    errorGuestProfilesMessage,
    generateAccessToken,
    getHotelAvailability,
    getMarketCodes,
    getSourceCodes,
    getRatePlanDetail,
    getAvailableGuarantee,
    getPaymentMethod,
    getPackages,
    getGuestProfile,
    createReservationWithExistingGuest,
    getReservation,
    putReservation,
    postCancelReservation,
    cancelReservation,
    getLovNames,
    postGuestProfile,
  };
});
