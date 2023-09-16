import axios, { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import type { AxiosError, AxiosResponse } from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:5001/api/",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const responseBody = (response: AxiosResponse) => response.data;

class HttpClient {
  async get<T>(
    endpoint: string,
    query?: Record<string, string | number>
  ): Promise<T> {
    const response = await Axios.get(endpoint, { params: query });
    return responseBody(response);
  }
  async post<T>(endpoint: string, body: any): Promise<T> {
    const response = await Axios.post(endpoint, body);
    return responseBody(response);
  }
  async put<T>(endpoint: string, body: any): Promise<T> {
    const response = await Axios.put(endpoint, body);
    return responseBody(response);
  }
  async delete<T>(endpoint: string): Promise<T> {
    const response = await Axios.delete(endpoint);
    return responseBody(response);
  }
  async getWithToken<T>(
    endpoint: string,
    token: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    const response = await Axios.get(endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseBody(response);
  }
  async postWithToken<T>(
    endpoint: string,
    body: any,
    token: string
  ): Promise<T> {
    const response = await Axios.post(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseBody(response);
  }
  async putWithToken<T>(
    endpoint: string,
    body: any,
    token: string
  ): Promise<T> {
    const response = await Axios.put(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseBody(response);
  }
  async patchWithToken<T>(
    endpoint: string,
    body: any,
    token: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    const response = await Axios.patch(endpoint, body, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseBody(response);
  }
  async deleteWithToken<T>(endpoint: string, token: string): Promise<T> {
    const response = await Axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseBody(response);
  }
}

export const successMessage = (message?: string) => {
  toast.success(message || "Success");
};

export const errorMessage = (message?: string) => {
  toast.error(message || "Something went wrong");
};

export const handleAuthError = (error: AxiosError) => {
  if (error?.response?.status === 401) {
    return window.location.replace("/login");
  }
};

export const handleError = (error: unknown) => {
  let errorMsg: string = "";

  if (isAxiosError(error)) {
    if (error?.response?.status === 401) {
      return window.location.replace("/login");
    } else {
      errorMsg = error?.response?.data?.message;
    }
  }

  return errorMessage(errorMsg || "Something went wrong");
};

export default new HttpClient();
