import { create } from "zustand";
import userApi from "../services/userApi";

export const useAuthStore = create((set) => ({
  userInfo: null,
  isCheckingAuth: true,


  login: async (credentials) => {
    try {
      const res = await userApi.signin(credentials);
      const { accessToken } = res.data.content;
      
      // Lưu token vào localStorage
      localStorage.setItem("accessToken", accessToken);

      // Sau khi login thành công, lấy ngay thông tin Profile
      const profileRes = await userApi.getProfile();
      set({ userInfo: profileRes.data.content });

      return profileRes.data.content;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      throw error;
    }
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const res = await userApi.signup(userData);
      return res.data;
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      throw error;
    }
  },

  // Tải lại thông tin người dùng khi F5 lại trang
  getProfile: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      set({ userInfo: null, isCheckingAuth: false });
      return;
    }

    try {
      const res = await userApi.getProfile();
      set({ userInfo: res.data.content, isCheckingAuth: false });
    } catch (error) {
      console.error("Lỗi lấy thông tin cá nhân:", error);
      localStorage.removeItem("accessToken");
      set({ userInfo: null, isCheckingAuth: false });
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ userInfo: null, isCheckingAuth: false });
    window.location.href = "/login";
  },
}));
