import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore.js"; // Kiểm tra lại path store của bạn

export default function Carts() {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, submitOrder } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ type: "", message: "" });

    // Tính tổng tiền toàn bộ giỏ hàng
    const grandTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Xử lý gửi đơn hàng (Submit Order)
    const handleSubmitOrder = async () => {
        if (cart.length === 0) {
            setNotification({
                type: "error",
                message: "Giỏ hàng của bạn đang trống!",
            });
            return;
        }

        try {
            setLoading(true);
            const res = await submitOrder();
            setNotification({
                type: "success",
                message: res?.message || "Đặt hàng thành công!",
            });
        } catch (error) {
            setNotification({
                type: "error",
                message: error?.response?.data?.message || "Đặt hàng thất bại. Vui lòng đăng nhập hoặc thử lại!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-white pb-16">
            <div className="max-w-7xl mx-auto px-6 pt-8">
                {/* 1. HEADER TITLE GRADIENT */}
                <div className="bg-gradient-to-r from-purple-800 to-pink-600 text-white font-semibold text-3xl px-6 py-3 w-fit mb-8 min-w-[200px]">
                    Carts
                </div>

                {/* THÔNG BÁO */}
                {notification.message && (
                    <div
                        className={`p-4 mb-6 text-sm rounded-lg ${
                            notification.type === "error"
                                ? "bg-red-50 text-red-800 border border-red-300"
                                : "bg-green-50 text-green-800 border border-green-300"
                        }`}
                    >
                        {notification.message}
                    </div>
                )}

                {/* 2. CART TABLE & SUBMIT SECTION */}
                {cart.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                        <p className="text-gray-500 text-lg font-medium">Giỏ hàng của bạn đang trống.</p>
                        <Link
                            to="/"
                            className="inline-block bg-black text-white px-6 py-2.5 rounded hover:bg-gray-800 transition-colors"
                        >
                            Quay lại mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* BẢNG GIỎ HÀNG */}
                        <div className="overflow-x-auto shadow-sm border border-gray-100 rounded-lg">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#dcdcdc] text-gray-800 font-bold text-sm uppercase">
                                        <th className="p-4 border-b border-gray-300">
                                            <input type="checkbox" className="w-4 h-4 accent-purple-600" />
                                        </th>
                                        <th className="p-4 border-b border-gray-300">id</th>
                                        <th className="p-4 border-b border-gray-300">img</th>
                                        <th className="p-4 border-b border-gray-300">name</th>
                                        <th className="p-4 border-b border-gray-300">price</th>
                                        <th className="p-4 border-b border-gray-300">quantity</th>
                                        <th className="p-4 border-b border-gray-300">total</th>
                                        <th className="p-4 border-b border-gray-300 text-center">action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-sm">
                                    {cart.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="w-4 h-4 accent-purple-600" />
                                            </td>
                                            <td className="p-4 font-semibold text-gray-700">{item.id || index + 1}</td>
                                            <td className="p-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-contain bg-gray-50 rounded p-1"
                                                />
                                            </td>
                                            <td className="p-4 font-bold text-gray-800">{item.name}</td>
                                            <td className="p-4 font-semibold text-gray-700">{item.price}$</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="w-8 h-8 bg-[#60a5fa] hover:bg-blue-500 text-white font-bold rounded flex items-center justify-center transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                    <span className="bg-[#ededed] px-3 py-1 rounded font-semibold min-w-[32px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="w-8 h-8 bg-[#60a5fa] hover:bg-blue-500 text-white font-bold rounded flex items-center justify-center transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4 font-bold text-red-500">
                                                {item.price * item.quantity}$
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="bg-[#ef4444] hover:bg-red-600 text-white font-semibold text-xs px-3 py-1.5 rounded transition-colors uppercase"
                                                    >
                                                        DELETE
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* NÚT SUBMIT ORDER VÀ TỔNG TIỀN BÊN PHẢI */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <div className="text-xl font-bold text-gray-800">
                                Total Payment: <span className="text-red-500 text-2xl ml-2">{grandTotal}$</span>
                            </div>

                            <button
                                onClick={handleSubmitOrder}
                                disabled={loading}
                                className="bg-[#f8b653] hover:bg-[#e09e3e] text-black font-bold text-sm px-10 py-3 rounded uppercase tracking-wider shadow transition-colors disabled:opacity-50"
                            >
                                {loading ? "PROCESSING..." : "SUBMIT ORDER"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}