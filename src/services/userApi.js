import api from "./axios";

const userApi = {
  // Đăng ký tài khoản
  signup: (userData) => {
    return api.post("/Users/signup", userData);
  },

  // Đăng nhập
  signin: (credentials) => {
    return api.post("/Users/signin", credentials);
  },

  // Lấy thông tin Profile (Yêu cầu gửi kèm Token)
  getProfile: () => {
    return api.post("/Users/getProfile");
  },

  // Cập nhật Profile
  updateProfile: (profileData) => {
    return api.post("/Users/updateProfile", profileData);
  },

  // Đặt hàng (Order)
  order: (orderData) => {
    return api.post("/Users/order", orderData);
  },
};

export default userApi;