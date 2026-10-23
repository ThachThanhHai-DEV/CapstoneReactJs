import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore.js"; // Nhập cart store của bạn
import { useAuthStore } from "../store/useAuthStore.js";

export default function Header() {
    const { userInfo, logout } = useAuthStore();
    const cart = useCartStore((state) => state.cart);
    const navigate = useNavigate();

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="w-full">
            {/* 1. TOP BAR (Nền đen) */}
            <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
                {/* Logo bên trái */}
                <Link to="/" className="flex items-center gap-2">
                    <img 
                        src="../public/image.png" 
                        alt="CyberSoft Logo" 
                        className="h-8 object-contain"
                    />
                </Link>

                {/* Các thao tác bên phải */}
                <div className="flex items-center gap-6 text-sm">
                    {/* Nút Search */}
                    <Link to="/search" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-base font-medium">Search</span>
                    </Link>

                    {/* Giỏ hàng */}
                    <Link to="/cart" className="flex items-center gap-1 hover:text-gray-300 transition-colors">
                        <span className="text-xl">🛒</span>
                        <span className="font-semibold">({totalQuantity})</span>
                    </Link>

                    {/* Kiểm tra trạng thái Đăng nhập / Đăng xuất */}
                    {userInfo ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="hover:text-gray-300 transition-colors font-medium">
                                Hi, {userInfo.name || "User"}
                            </Link>
                            <button 
                                onClick={logout} 
                                className="text-red-400 hover:text-red-300 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="hover:text-gray-300 transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-gray-300 transition-colors">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* 2. NAVIGATION BAR (Nền trắng/xám nhẹ bên dưới) */}
            <nav className="bg-white border-b border-gray-200 px-6 py-3">
                <ul className="flex items-center gap-8 text-base font-normal text-gray-700">
                    <li>
                        <Link 
                            to="/" 
                            className="pb-3 border-b-2 border-black font-semibold text-black hover:text-black transition-colors"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?category=MEN" className="hover:text-black transition-colors">
                            Men
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?category=WOMEN" className="hover:text-black transition-colors">
                            Woman
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?category=KID" className="hover:text-black transition-colors">
                            Kid
                        </Link>
                    </li>
                    <li>
                        <Link to="/search?category=SPORT" className="hover:text-black transition-colors">
                            Sport
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}