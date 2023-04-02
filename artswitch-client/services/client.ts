import axios from "axios";
import { toast } from "react-hot-toast";
import type { AxiosResponse } from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:5001/api/",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const responseBody = (response: AxiosResponse) => response.data;

class HttpClient {
  get<T>(
    endpoint: string,
    query?: Record<string, string | number>
  ): Promise<T> {
    return Axios.get(endpoint, { params: query }).then(responseBody);
  }
  post<T>(endpoint: string, body: any): Promise<T> {
    return Axios.post(endpoint, body).then(responseBody);
  }
  put<T>(endpoint: string, body: any): Promise<T> {
    return Axios.put(endpoint, body).then(responseBody);
  }
  delete<T>(endpoint: string): Promise<T> {
    return Axios.delete(endpoint).then(responseBody);
  }
  getWithToken(
    endpoint: string,
    token: string,
    params?: Record<string, string | number>
  ) {
    return Axios.get(endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(responseBody);
  }
  postWithToken<T>(endpoint: string, body: any, token: string): Promise<T> {
    return Axios.post(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(responseBody);
  }
  putWithToken<T>(endpoint: string, body: any, token: string): Promise<T> {
    return Axios.put(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(responseBody);
  }
  deleteWithToken<T>(endpoint: string, token: string): Promise<T> {
    return Axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(responseBody);
  }
}

export const successMessage = (message?: string) => {
  toast.success(message || "Success");
};

export const errorMessage = (message?: string) => {
  toast.error(message || "Something went wrong");
};

export const handleError = (error: any) => {
  if (error?.response?.status === 401) {
    return (window.location.href = "/login");
  }

  const errMessage = error?.response?.data?.message;
  return errorMessage(errMessage || "Something went wrong");
};

export default new HttpClient();
