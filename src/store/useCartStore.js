import { create } from "zustand";
import userApi from "../services/userApi";

const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  // Thêm sản phẩm vào giỏ
  addToCart: (product, quantity = 1) => {
    const currentCart = get().cart;
    const index = currentCart.findIndex((item) => item.id === product.id);

    let updatedCart = [];
    if (index !== -1) {
      updatedCart = [...currentCart];
      updatedCart[index].quantity += quantity;
    } else {
      updatedCart = [...currentCart, { ...product, quantity }];
    }

    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  // Tăng/Giảm số lượng trực tiếp trong giỏ
  changeQuantity: (productId, delta) => {
    const updatedCart = get()
      .cart.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  // Xóa sản phẩm khỏi giỏ
  removeFromCart: (productId) => {
    const updatedCart = get().cart.filter((item) => item.id !== productId);
    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  // Xóa sạch giỏ hàng
  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("cart");
  },

  // Đặt hàng
  submitOrder: async (userEmail) => {
    try {
      const orderData = {
        orderDetail: get().cart.map((item) => ({
          productId: item.id.toString(),
          quantity: item.quantity,
        })),
        email: userEmail,
      };

      const res = await userApi.order(orderData);
      get().clearCart();
      return res.data;
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      throw error;
    }
  },
}));

export default useCartStore;