import { create } from "zustand";
import productApi from "../services/productApi";

const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  selectedCategory: "",
  loading: false,

  // Lấy toàn bộ danh sách sản phẩm
  getAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await productApi.getAllProducts();
      set({ products: res.data.content, loading: false });
    } catch (error) {
      console.error("Lỗi tải danh sách sản phẩm:", error);
      set({ loading: false });
    }
  },

  // Lấy danh sách danh mục
  getCategories: async () => {
    try {
      const res = await productApi.getCategoryApi();
      set({ categories: res.data.content });
    } catch (error) {
      console.error("Lỗi tải danh mục:", error);
    }
  },

  // Lọc sản phẩm theo danh mục
  getProductsByCategory: async (categoryId) => {
    set({ loading: true, selectedCategory: categoryId });
    try {
      if (!categoryId) {
        await get().getAllProducts();
      } else {
        const res = await productApi.getProductByCategory(categoryId);
        set({ products: res.data.content, loading: false });
      }
    } catch (error) {
      console.error("Lỗi lọc sản phẩm:", error);
      set({ loading: false });
    }
  },

  // Lấy chi tiết sản phẩm theo ID
  getProductById: async (id) => {
    try {
      const res = await productApi.getProductById(id);
      return res.data.content;
    } catch (error) {
      console.error("Lỗi lấy chi tiết sản phẩm:", error);
      return null;
    }
  },
}));

export default useProductStore;
