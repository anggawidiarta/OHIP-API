import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";

const {
  VITE_APP_KEY,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_USERNAME,
  VITE_PASSWORD,
} = import.meta.env;

const hotelId = ref("SUMBA");

const getHeaders = (token) => ({
  "Accept-Language": "*",
  "Content-Type": "application/json",
  "x-app-key": VITE_APP_KEY,
  "Access-Control-Allow-Origin": "*",
  "cache-control": "no-cache",
  "x-hotelid": hotelId.value,
  Authorization: `Bearer ${token}`,
});

const makeAxiosRequest = async (config) => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(
      `Error in Axios request:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const extractProfileIds = (profileData) => {
  const extractedProfileIds = [];

  if (profileData && Array.isArray(profileData.profileSummaries.profileInfo)) {
    profileData.profileSummaries.profileInfo.forEach((profile) => {
      profile.profileIdList.forEach((profileIdObj) => {
        if (profileIdObj.type === "Profile" && profileIdObj.id) {
          extractedProfileIds.push(profileIdObj.id);
        }
      });
    });
  }
  return extractedProfileIds;
};

export const useApisStore = defineStore("apis", () => {
  let profileIds = [];

  const reservationId = ref();
  const reservationResponseData = ref();

  const token = ref("");
  const jsonData = ref(null);
  const isGuestProfileNotFound = ref(false);

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
    profileName: "*",
    // Additional parameters
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
          Authorization: `Basic ${btoa(
            `${VITE_CLIENT_ID}:${VITE_CLIENT_SECRET}`
          )}`,
        },
      });
      token.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const apiEndpoints = {
    hotelAvailability: `/par/v1/hotels/${hotelId.value}/availability`,
    ratePlanDetail: `/par/v1/hotels/${hotelId.value}/rates/${params.ratePlanCode}`,
    availableGuarantee: `/par/v1/hotels/${hotelId.value}/guarantees`,
    paymentMethod: `/lov/v1/listOfValues/hotels/${hotelId.value}/paymentMethods`,
    packages: `/rtp/v1/packages`,
    guestProfile: `/crm/v1/profiles`,
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
    fetchData(apiEndpoints.hotelAvailability, {
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

  const getRatePlanDetail = () => fetchData(apiEndpoints.ratePlanDetail);

  const getAvailableGuarantee = () =>
    fetchData(apiEndpoints.availableGuarantee, {
      ratePlanCode: params.ratePlanCode,
      arrivalDate: params.arrivalDate,
      hotelId: hotelId.value,
    });

  const getPaymentMethod = () =>
    fetchData(apiEndpoints.paymentMethod, {
      includeInactiveFlag: params.includeInactiveFlag,
    });

  const getPackages = () =>
    fetchData(apiEndpoints.packages, {
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
    fetchData(apiEndpoints.guestProfile, {
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
      await getGuestProfile();
      if (
        jsonData.value &&
        Array.isArray(jsonData.value.profileSummaries.profileInfo)
      ) {
        console.log("Data Received From GetGuestProfile");
        profileIds = extractProfileIds(jsonData.value);
        console.log(profileIds);
        if (profileIds.includes(params.guestProfileId)) {
          console.log("Profile Id Exists");
          // TODO: Implement the POST request for creating the reservation
          const reservationData = {
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
          };

          const response = await axios({
            url: `http://localhost:5173/api/rsv/v1/hotels/${hotelId.value}/reservations`,
            method: "POST",
            data: reservationData,
            headers: getHeaders(token.value.access_token),
          });

          console.log(response.data);
        } else {
          isGuestProfileNotFound.value = true;
          console.log("Profile Id Does Not Exist");
        }
      } else {
        console.log("No Profile Data Received From GetGuestProfile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isGuestProfileNotFound,
    token,
    jsonData,
    hotelId,
    params,
    generateAccessToken,
    getHotelAvailability,
    getRatePlanDetail,
    getAvailableGuarantee,
    getPaymentMethod,
    getPackages,
    getGuestProfile,
    createReservationWithExistingGuest,
  };
});
