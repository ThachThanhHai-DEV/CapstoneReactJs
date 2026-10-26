import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import api from "../services/axios.js";
import useCartStore from "../store/useCartStore.js";

export default function Profile() {
    const { userInfo, getInfo } = useAuthStore();
    const addToCart = useCartStore((state) => state.addToCart);

    const [activeTab, setActiveTab] = useState("history"); // "history" hoặc "favourite"
    const [notification, setNotification] = useState({ type: "", message: "" });
    const [favouriteList, setFavouriteList] = useState([]);

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
        gender: true,
    });

    // Đồng bộ thông tin user vào form khi load trang
    useEffect(() => {
        if (userInfo) {
            setFormData({
                email: userInfo.email || "",
                name: userInfo.name || "",
                phone: userInfo.phone || "",
                password: "",
                gender: userInfo.gender ?? true,
            });
            
            // Lấy danh sách sản phẩm yêu thích nếu có trong thông tin user/orders
            if (userInfo.productsFavorite) {
                setFavouriteList(userInfo.productsFavorite);
            }
        } else {
            getInfo();
        }
    }, [userInfo, getInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý Cập nhật Profile
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/Users/updateProfile", formData);
            setNotification({
                type: "success",
                message: res.data.message || "Cập nhật thông tin thành công!",
            });
            await getInfo(); // Tải lại thông tin mới
        } catch (error) {
            setNotification({
                type: "error",
                message: error?.response?.data?.message || "Cập nhật thất bại!",
            });
        }
    };

    return (
        <div className="w-full bg-white pb-16">
            <div className="max-w-7xl mx-auto px-6 pt-8">
                {/* 1. HEADER TITLE GRADIENT */}
                <div className="bg-gradient-to-r from-purple-800 to-pink-600 text-white font-semibold text-3xl px-6 py-3 w-fit mb-8 min-w-[200px]">
                    Profile
                </div>

                {/* 2. PROFILE FORM SECTION */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                    {/* Avatar */}
                    <div className="flex flex-col items-center justify-center w-full md:w-1/4">
                        <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                            <img
                                src={userInfo?.avatar || "https://i.pravatar.cc/300"}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Form thông tin cá nhân */}
                    <form onSubmit={handleUpdate} className="w-full md:w-3/4 space-y-6">
                        {notification.message && (
                            <div
                                className={`p-4 text-sm rounded-lg ${
                                    notification.type === "error"
                                        ? "bg-red-50 text-red-800 border border-red-300"
                                        : "bg-green-50 text-green-800 border border-green-300"
                                }`}
                            >
                                {notification.message}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                    className="w-full bg-[#ededed] text-gray-500 px-4 py-2.5 rounded cursor-not-allowed focus:outline-none"
                                />
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#ededed] text-gray-800 px-4 py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-[#ededed] text-gray-800 px-4 py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-[#ededed] text-gray-800 px-4 py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        {/* Gender & Button Update */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                            <div className="flex items-center gap-6">
                                <span className="text-sm font-medium text-gray-600">Gender</span>
                                <label className="flex items-center gap-2 cursor-pointer text-sm">
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={formData.gender === true}
                                        onChange={() => setFormData((prev) => ({ ...prev, gender: true }))}
                                        className="accent-purple-600"
                                    />
                                    Male
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm">
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={formData.gender === false}
                                        onChange={() => setFormData((prev) => ({ ...prev, gender: false }))}
                                        className="accent-purple-600"
                                    />
                                    Female
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="bg-[#6300f7] hover:bg-purple-700 text-white font-semibold px-8 py-2.5 rounded-full shadow transition-colors uppercase text-sm tracking-wider"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>

                {/* 3. TAB NAVIGATION (Order history / Favourite) */}
                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`text-xl font-semibold px-6 py-3 transition-colors ${
                            activeTab === "history"
                                ? "text-purple-600 border-b-2 border-purple-600"
                                : "text-gray-800 hover:text-purple-500"
                        }`}
                    >
                        Order history
                    </button>
                    <button
                        onClick={() => setActiveTab("favourite")}
                        className={`text-xl font-semibold px-6 py-3 transition-colors ${
                            activeTab === "favourite"
                                ? "text-purple-600 border-b-2 border-purple-600"
                                : "text-gray-800 hover:text-purple-500"
                        }`}
                    >
                        Favourite
                    </button>
                </div>

                {/* 4. TAB CONTENT */}
                {activeTab === "history" ? (
                    /* TAB ORDER HISTORY */
                    <div className="space-y-8">
                        {userInfo?.ordersHistory && userInfo.ordersHistory.length > 0 ? (
                            userInfo.ordersHistory.map((order) => (
                                <div key={order.id} className="space-y-3">
                                    <p className="text-purple-600 font-medium text-sm">
                                        + Orders have been placed on {order.date || "09 - 19 - 2020"}
                                    </p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-[#dcdcdc] text-gray-700 font-semibold text-sm">
                                                    <th className="p-3">id</th>
                                                    <th className="p-3">img</th>
                                                    <th className="p-3">name</th>
                                                    <th className="p-3">price</th>
                                                    <th className="p-3">quantity</th>
                                                    <th className="p-3">total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 text-sm">
                                                {order.orderDetail?.map((item, idx) => (
                                                    <tr key={idx} className="hover:bg-gray-50">
                                                        <td className="p-3 font-medium">{item.id || idx + 1}</td>
                                                        <td className="p-3">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-12 h-12 object-contain"
                                                            />
                                                        </td>
                                                        <td className="p-3 font-semibold text-gray-800">{item.name}</td>
                                                        <td className="p-3">{item.price}$</td>
                                                        <td className="p-3">
                                                            <span className="bg-[#ededed] px-3 py-1 rounded">
                                                                {item.quantity}
                                                            </span>
                                                        </td>
                                                        <td className="p-3 font-bold">{item.price * item.quantity}$</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 py-8 text-center">Chưa có lịch sử đơn hàng nào.</div>
                        )}
                    </div>
                ) : (
                    /* TAB FAVOURITE (CARD SẢN PHẨM YÊU THÍCH) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favouriteList.length > 0 ? (
                            favouriteList.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#f8f8f8] border border-gray-100 rounded shadow-sm overflow-hidden flex flex-col justify-between"
                                >
                                    <div className="p-6 relative flex flex-col items-center">
                                        <button className="absolute top-4 right-4 text-red-500">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                        </button>
                                        <img src={item.image} alt={item.name} className="h-44 object-contain mb-4" />
                                        <div className="w-full text-left">
                                            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                                            <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                                                {item.shortDescription || "short descript ..."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-stretch h-12 border-t border-gray-200">
                                        <button
                                            onClick={() => addToCart(item, 1)}
                                            className="flex-1 bg-[#e1a038] hover:bg-[#c78b2d] text-gray-900 font-semibold text-center flex items-center justify-center transition-colors"
                                        >
                                            Buy now
                                        </button>
                                        <div className="w-1/3 bg-[#dcdcdc] text-gray-900 font-bold flex items-center justify-center">
                                            {item.price}$
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 py-8 text-center col-span-3">
                                Chưa có sản phẩm yêu thích nào.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}