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
