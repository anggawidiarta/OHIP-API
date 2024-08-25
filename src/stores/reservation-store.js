import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";

import { ENV_VARS } from "@/config/constants";

import { useTokenStore } from "./token-store";

const tokenStore = useTokenStore();

export const useReservationStore = defineStore("reservation", () => {
  const reservationId = ref();
  const profileId = ref();

  const reservationStep = ref(1);
  const reservationData = ref({});
  const ratePlanDetailData = ref({});
  const hotelAvailabilityData = ref({});
  const cancelReservationData = ref({});

  const isBookNowPressed = ref(false);
  const isShowRoomList = ref(false);

  const params = reactive({
    roomStayStartDate: new Date().toISOString().split("T")[0],
    roomStayEndDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    roomStayQuantity: 2,
    limit: 50,
    adults: 2,
    paymentMethod: "",
    children: 1,
    ratePlanCode: "",
    roomType: "",
    rateStartDate: new Date().toISOString().split("T")[0],
    rateEndDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
  });

  const getHotelAvailability = async () => {
    try {
      const response = await axios({
        url: `http://localhost:5173/api/par/v1/hotels/${ENV_VARS.HOTEL_ID}/availability`,
        method: "GET",
        params: {
          roomStayStartDate: params.roomStayStartDate,
          roomStayEndDate: params.roomStayEndDate,
          roomStayQuantity: params.roomStayQuantity,
          limit: params.limit,
          adults: params.adults,
          children: params.children,
        },
        headers: {
          "Accept-Language": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-hotelid": ENV_VARS.HOTEL_ID,
          "x-app-key": ENV_VARS.VITE_APP_KEY,
          Authorization: `Bearer ${tokenStore.token.access_token}`,
        },
      });
      hotelAvailabilityData.value = await response.data.hotelAvailability;
    } catch (error) {
      console.error(error);
    }
  };

  const getRatePlanDetail = async () => {
    try {
      const response = await axios({
        url: `http://localhost:5173/api/par/v1/hotels/${ENV_VARS.HOTEL_ID}/rateplans`,
        method: "GET",
        params: {
          ratePlanCode: params.ratePlanCode,
        },
        headers: {
          "Accept-Language": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-hotelid": ENV_VARS.HOTEL_ID,
          "x-app-key": ENV_VARS.VITE_APP_KEY,
          Authorization: `Bearer ${tokenStore.token.access_token}`,
        },
      });
      ratePlanDetailData.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const postReservationWithExistingProfile = async () => {
    try {
      reservationId.value = null;
      const response = await axios({
        url: `http://localhost:5173/api/rsv/v1/hotels/${ENV_VARS.HOTEL_ID}/reservations`,
        method: "POST",
        headers: {
          "Accept-Language": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-hotelid": ENV_VARS.HOTEL_ID,
          "x-app-key": ENV_VARS.VITE_APP_KEY,
          Authorization: `Bearer ${tokenStore.token.access_token}`,
        },
        data: {
          reservations: {
            reservation: {
              reservationGuests: {
                profileInfo: {
                  profileIdList: {
                    id: profileId.value,
                    type: "Profile",
                  },
                },
              },
              reservationPaymentMethods: {
                paymentMethod: params.paymentMethod,
              },
              markAsRecentlyAccessed: true,
              hotelId: ENV_VARS.HOTEL_ID,
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
                      start: params.rateStartDate,
                      end: params.rateEndDate,
                      base: {
                        amountBeforeTax: 50,
                        currencyCode: "USD",
                      },
                    },
                  },
                  start: params.rateStartDate,
                  marketCode: "LEISURE",
                  end: params.rateEndDate,
                  roomTypeCharged: params.roomType,
                  ratePlanCode: params.ratePlanCode,
                  roomType: params.roomType,
                  pseudoRoom: false,
                },
                guestCounts: {
                  children: params.children,
                  adults: params.adults,
                },
                departureDate: params.roomStayEndDate,
                arrivalDate: params.roomStayStartDate,
              },
            },
          },
          fetchInstructions: "Reservation",
        },
      });
      reservationData.value = await response.data;
      const reservationLink = await reservationData.value.links.find((link) =>
        link.href.includes("/reservations/")
      );
      reservationId.value = reservationLink
        ? reservationLink.href.match(/(\d+)/)[1]
        : null;
    } catch (error) {
      console.error(error);
    }
  };

  const postCancelReservation = async (reservationId) => {
    try {
      const response = await axios({
        url: `http://localhost:5173/api/rsv/v1/hotels/${ENV_VARS.HOTEL_ID}/reservations/${reservationId}/cancellations`,
        method: "POST",
        headers: {
          "Accept-Language": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-hotelid": ENV_VARS.HOTEL_ID,
          "x-app-key": ENV_VARS.VITE_APP_KEY,
          Authorization: `Bearer ${tokenStore.token.access_token}`,
        },
        data: {
          reason: {
            code: "DUP",
            description: "Trip Cancelled",
          },
          reservations: {
            reservationIdList: {
              id: reservationId,

              type: "Reservation",
            },
            hotelId: ENV_VARS.HOTEL_ID,
          },
        },
      });
      cancelReservationData.value = await response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const setReservationStep = (step) => {
    reservationStep.value = step;
  };

  return {
    params,
    reservationId,
    reservationStep,
    reservationData,
    hotelAvailabilityData,
    isBookNowPressed,
    isShowRoomList,
    getHotelAvailability,
    getRatePlanDetail,
    postReservationWithExistingProfile,
    postCancelReservation,
    setReservationStep,
  };
});
