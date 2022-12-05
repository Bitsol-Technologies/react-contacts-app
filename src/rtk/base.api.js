import axios from "axios";
import { BASE_URL } from "../config/app.config";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "cache-control": "no-cache",
    },
});

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url = "", method, data, params }, { signal }) => {
        try {
            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data,
                params,
                signal,
            });
            return { data: result.data };
        } catch (axiosError) {
            let err = axiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };
