import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "https://launch.meme/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);
