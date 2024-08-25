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

export const paymentMethods = [
  {
    name: "American Express",
    description: "It's the faster, safer way to send and receive money.",
    value: "AX",
    icon: "/icon/american-express.png",
  },
  {
    name: "Bank Transfer",
    description: "It's the faster, safer way to send and receive money.",
    value: "BT",
    icon: "/icon/bank-transfer.png",
  },
  {
    name: "Cash",
    description: "It's the faster, safer way to send and receive money.",
    value: "CA",
    icon: "/icon/dollar.png",
  },
  {
    name: "City Ledger",
    description: "It's the faster, safer way to send and receive money.",
    value: "CL",
    icon: "/icon/cityscape.png",
  },
  {
    name: "Master Card",
    description: " payment-processing corporation worldwide.",
    value: "MC",
    icon: "/icon/mc.png",
  },
  {
    name: "Visa",
    description: " Trusted world leader in digital payment technology",
    value: "VA",
    icon: "/icon/visa.png",
  },
];

export const nationalities = [
  { value: "AU", text: "Australia" },
  { value: "GB", text: "United Kingdom" },
  { value: "IT", text: "Italy" },
  { value: "JP", text: "Japan" },
  { value: "RU", text: "Russia" },
  { value: "SE", text: "Sweden" },
  { value: "SG", text: "Singapore" },
];

export const languages = [
  { value: "AR", text: "Arabic" },
  { value: "E", text: "English" },
  { value: "FA", text: "Persian" },
  { value: "ZH-T", text: "Chinese Traditional" },
];

export const getApiEndpoints = () => {
  const store = useApisStore();
  const ratePlanCode = store.params?.ratePlanCode || "*";
  const reservationId = store.reservationId?.value;

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
