import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";

const {
  VITE_BASE_URL,
  VITE_APP_KEY,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_USERNAME,
  VITE_PASSWORD,
} = import.meta.env;

export const useApisStore = defineStore("apis", () => {
  const token = ref("");
  const isLoading = ref(true);
  const jsonData = ref(null);
  const hotelId = ref("SUMBA");

  const params = reactive({
    roomStayStartDate: new Date().toISOString().split("T")[0],
    roomStayEndDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    roomStayQuantity: null,
    childAge: null,
    ratePlanCode: null,
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
    children: 0,
    arrivalDate: new Date().toISOString().split("T")[0],
    includeInactiveFlag: false,
    ticketPostingRhythm: null,
    fetchInstructions: null,
    sellSeparate: null,
    includeGroup: null,
    descriptionWildCard: null,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    profileName: null,
    givenName: null,
    profileType: null,
    summaryInfo: null,
    limit: null,
    city: null,
    state: null,
    postalCode: null,
    communication: null,
    membership: null,
    searchType: null,
    fetchInstructionsGuest: null,
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
        url: `http://localhost:5173/api/par/v1/hotels/${hotelId.value}/availability`,
        method: "GET",
        params: {
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
          limit: 5,
        },
        headers: {
          "Accept-Language": "*",
          "Content-Type": "application/json",
          "x-app-key": VITE_APP_KEY,
          "Access-Control-Allow-Origin": "*",
          "cache-control": "no-cache",
          "x-hotelid": hotelId.value,
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
        url: `http://localhost:5173/api/par/v1/hotels/${hotelId.value}/rates/${ratePlanCode.value}`,
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
          ratePlanCode: params.ratePlanCode,
          arrivalDate: params.arrivalDate,
          hotelId: hotelId.value,
        },
        headers: {
          "Accept-Language": "*",
          "Content-Type": "application/json",
          "x-app-key": VITE_APP_KEY,
          "Access-Control-Allow-Origin": "*",
          "cache-control": "no-cache",
          "x-hotelid": hotelId.value,
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
        url: `http://localhost:5173/api/lov/v1/listOfValues/hotels/${hotelId.value}/paymentMethods`,
        method: "GET",
        params: {
          includeInactiveFlag: params.includeInactiveFlag,
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

  const getGuestProfile = async () => {
    try {
      const response = await axios({
        url: "http://localhost:5173/api/crm/v1/profiles",
        method: "GET",
        params: {
          profileName: profileName.value,
          givenName: givenName.value,
          profileType: profileType.value,
          summaryInfo: summaryInfo.value,
          hotelId: "SUMBA",
          limit: limit.value,
          city: city.value,
          state: state.value,
          postalCode: postalCode.value,
          communication: communication.value,
          membership: membership.value,
          searchType: searchType.value,
          fetchInstructions: fetchInstructionsGuest.value,
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
    }
  };
});
