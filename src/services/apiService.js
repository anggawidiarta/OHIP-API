import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://ca03-mtca1ua-oc.hospitality-api.ap-sydney-1.ocs.oc-test.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getAccessToken(credentials) {
    const data = {
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      username: credentials.username,
      password: credentials.password,
      grant_type: "password", // Adjust according to your API requirements
    };

    const authHeader =
      "Basic " + btoa(credentials.clientId + ":" + credentials.clientSecret);

    return apiClient.post("/oauth/v1/tokens", data, {
      headers: {
        Authorization: authHeader,
      },
    });
  },
};
