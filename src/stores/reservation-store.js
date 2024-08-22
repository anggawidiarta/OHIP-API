import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";

import { ENV_VARS } from "@/config/constants";

import { useTokenStore } from "./token-store";

const tokenStore = useTokenStore();

export const useReservationStore = defineStore("reservation", () => {
  const reservationId = ref();
  const reservationStep = ref(0);
  const reservationData = ref({});
  const hotelAvailabilityData = ref({});

  const isBookNowPressed = ref(false);

  const params = reactive({
    roomStayStartDate: new Date().toISOString().split("T")[0],
    roomStayEndDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    roomStayQuantity: 2,
    limit: 50,
    adults: 2,
    children: 1,
    ratePlanCode: "",
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
      reservationData.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    params,
    reservationId,
    reservationStep,
    reservationData,
    hotelAvailabilityData,
    isBookNowPressed,
    getHotelAvailability,
    getRatePlanDetail,
  };
});
