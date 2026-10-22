import api from "./axios";

const productApi = {
  // Lấy toàn bộ sản phẩm (Dùng cho Home, Search)
  getAllProducts: () => {
    return api.get("/Product");
  },

  // Lấy sản phẩm phân trang
  getPaging: (pageIndex = 1, pageSize = 10, keywords = "") => {
    return api.get(
      `/Product/getpaging?pageIndex=${pageIndex}&pageSize=${pageSize}&keywords=${keywords}`
    );
  },

  // Lấy chi tiết 1 sản phẩm theo ID
  getProductById: (id) => {
    return api.get(`/Product/getbyid?id=${id}`);
  },

  // Lấy danh sách danh mục (Category)
  getCategoryApi: () => {
    return api.get("/Product/getAllCategory");
  },

  // Lấy sản phẩm theo danh mục
  getProductByCategory: (categoryId) => {
    return api.get(`/Product/getProductByCategory?categoryId=${categoryId}`);
  },

  // Thêm, Sửa, Xóa sản phẩm
  addProductApi: (obj) => api.post("/Product", obj),
  updateProductApi: (obj) => api.put("/Product", obj),
  deleteProductByIdApi: (id) => api.delete(`/Product/${id}`),
};

export default productApi;