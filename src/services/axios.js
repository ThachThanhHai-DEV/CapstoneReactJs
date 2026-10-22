import axios from "axios";

const api = axios.create({
  baseURL: "https://apistore.cybersoft.edu.vn/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Tự động đính kèm Token khi gửi request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Xử lý tập trung các lỗi 401/403 (Hết hạn phiên đăng nhập)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;