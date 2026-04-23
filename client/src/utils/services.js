// api.js
import axios from "axios";

// 🔥 Base URL
export const BaseUrl = "https://chat-app-b7dy.onrender.com/api";

// 🔥 Create axios instance
const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // for httpOnly cookies (if backend sets them)
});


// 🔐 Request Interceptor (attach JWT from localStorage)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// 🔐 Response Interceptor (handle token expiry)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // prevent infinite retry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 🔁 call refresh API
        const res = await axios.get(
          `${BaseUrl}/auth/refresh-token`
        );

        const newToken = res.data.token;

        // 🔥 store new token
        localStorage.setItem("token", newToken);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Session expired. Logging out...");

        // ❌ clear token
        localStorage.removeItem("token");

        // redirect user
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


// ✅ POST
export const PostRequest = async (url, body) => {
  console.log("POST:", url);

  try {
    const res = await api.post(url, body);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};


// ✅ GET
export const getRequest = async (url) => {
  console.log("GET:", url);

  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};


// ✅ PUT
export const putRequest = async (url, body) => {
  console.log("PUT:", url);

  try {
    const res = await api.put(url, body);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};


// ✅ DELETE
export const deleteRequest = async (url) => {
  console.log("DELETE:", url);

  try {
    const res = await api.delete(url);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};


// 🔥 Centralized Error Handler
const handleError = (error) => {
  return {
    error: true,
    message:
      error.response?.data?.message ||
      error.message ||
      "Something went wrong",
    status: error.response?.status,
  };
};

export default api;