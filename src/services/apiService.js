import axios from "axios";
import { ENV_VARS } from "@/config/constants";

export const getHeaders = (token) => ({
  "Accept-Language": "*",
  "Content-Type": "application/json",
  "x-app-key": ENV_VARS.VITE_APP_KEY,
  "Access-Control-Allow-Origin": "*",
  "cache-control": "no-cache",
  "x-hotelid": ENV_VARS.HOTEL_ID,
  Authorization: `Bearer ${token}`,
});

export const makeAxiosRequest = async (config) => {
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

export const extractProfileIds = (profileData) => {
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

export const generateAccessToken = async () => {
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
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const fetchData = async (
//   responseVarName,
//   endpoint,
//   additionalParams = {}
// ) => {
//   let responseVar;
//   if (responseVarName === "jsonData") {
//     responseVar = jsonData;
//   } else if (responseVarName === "listOfValuesData") {
//     responseVar = listOfValuesData;
//   } else {
//     responseVar = guestReservationData;
//   }

//   responseVar.value = await makeAxiosRequest(
//     getRequestConfig(endpoint, additionalParams)
//   );
// };

// export const postReservation = async (reservationData) => {
//   return axios({
//     url: `http://localhost:5173/api${API_ENDPOINTS.value.postReservation}`,
//     method: "POST",
//     data: reservationData,
//     headers: getHeaders(token.value.access_token),
//   });
// };

// export const postCancelReservation = async (reservationId) => {
//   try {
//     const response = await axios({
//       url: `http://localhost:5173/api/rsv/v1/hotels/${hotelId.value}/reservations/${reservationId.value}/cancellations`,
//       method: "POST",
//       headers: getHeaders(token.value.access_token),
//       data: {
//         reason: {
//           code: "DUP",
//           description: "Trip Cancelled",
//         },
//         reservations: {
//           reservationIdList: {
//             id: reservationId.value,
//             type: "Reservation",
//           },
//           hotelId: hotelId.value,
//         },
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error cancelling reservation:", error);
//     throw error;
//   }
// };
