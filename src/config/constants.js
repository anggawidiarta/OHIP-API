import { useApisStore } from "@/stores/api";

export const ENV_VARS = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  VITE_APP_KEY: import.meta.env.VITE_APP_KEY,
  VITE_CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  VITE_CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,
  VITE_USERNAME: import.meta.env.VITE_USERNAME,
  VITE_PASSWORD: import.meta.env.VITE_PASSWORD,
  HOTEL_ID: "SUMBA",
};

export const getApiEndpoints = () => {
  const store = useApisStore();
  const ratePlanCode = store.params?.ratePlanCode || "*";
  const reservationId = store.reservationId?.value || null;

  return {
    hotelAvailability: `/par/v1/hotels/${ENV_VARS.HOTEL_ID}/availability`,
    ratePlanDetail: `/par/v1/hotels/${ENV_VARS.HOTEL_ID}/rates/${ratePlanCode}`,
    availableGuarantee: `/par/v1/hotels/${ENV_VARS.HOTEL_ID}/guarantees`,
    paymentMethod: `/lov/v1/listOfValues/hotels/${ENV_VARS.HOTEL_ID}/paymentMethods`,
    packages: `/rtp/v1/packages`,
    guestProfile: `/crm/v1/profiles`,
    getReservation: `/rsv/v1/hotels/${ENV_VARS.HOTEL_ID}/reservations/${reservationId}`,
    putReservation: `/rsv/v1/hotels/${ENV_VARS.HOTEL_ID}/reservations/${reservationId}`,
    postCancelReservation: `/rsv/v1/hotels/${ENV_VARS.HOTEL_ID}/reservations/${reservationId}/cancellations`,
  };
};