import axios from "axios";

// if (!process.env.API_URL) {
//   throw new Error("API_URL is not provided");
// }

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

export default axiosInstance;
