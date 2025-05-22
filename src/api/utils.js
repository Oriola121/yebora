import axios from "axios";

const SWAGGER_API_URL = process.env.REACT_APP_SWAGGER_API_BASE_URL
  ? `${process.env.REACT_APP_SWAGGER_API_BASE_URL}${process.env.REACT_APP_SWAGGER_API_VERSION}`
  : null;

if (!SWAGGER_API_URL) {
  throw new Error("Swagger API URL is not configured");
}

const getDefaultHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_YEBORA_KEY}`,
});

const apiClient = axios.create({
  baseURL: SWAGGER_API_URL,
  headers: getDefaultHeaders(),
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
