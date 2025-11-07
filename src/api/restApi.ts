import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import {
  TOKEN_TYPE,
  getTokenFromCookies,
} from "@/states/user/cookies";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_BASE;

export const restApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

restApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    console.log("status", status);
    switch (status) {
      case 400:
        toast.error("Dữ liệu không hợp lệ.");
        break;
      case 401:
        toast.error("Chưa đăng nhập hoặc phiên đã hết hạn.");
        break;
      case 403:
        toast.error("Bạn không có quyền truy cập.");
        break;
      case 404:
        toast.error("Không tìm thấy nội dung yêu cầu.");
        break;
      case 500:
        toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
        break;
      case 409:
        toast.error(
          "Thao tác không hợp lệ. Dữ liệu đã tồn tại hoặc có xung đột."
        );
        break;
      case 422:
        toast.error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
        break;
      default:
        toast.error("Đã xảy ra lỗi không xác định.");
    }
    return Promise.reject(error);
  }
);

restApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenFromCookies(TOKEN_TYPE.ACCESS_TOKEN);
    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface Pagination {
  page: number;
  size: number;
  total: number;
}
export interface BaseResponse<T = null> {
  code: number;
  message: string;
  data?: T;
  pagination?: Pagination;
  errors?: Record<string, string>;
}
