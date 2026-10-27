import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/axios.js"; // File axios instance của bạn
import useCartStore from "../store/useCartStore.js";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryKeyword = searchParams.get("keyword") || "";

    const [keyword, setKeyword] = useState(queryKeyword);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("decrease"); // "decrease" hoặc "ascending"
    const [loading, setLoading] = useState(false);

    const addToCart = useCartStore((state) => state.addToCart);

    // 1. Gọi API lấy danh sách sản phẩm khi keyword trên URL thay đổi
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                let url = "/Product";
                if (queryKeyword) {
                    url = `/Product?keyword=${encodeURIComponent(queryKeyword)}`;
                }
                const res = await api.get(url);
                const data = res.data.content || [];
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi tìm kiếm sản phẩm:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [queryKeyword]);

    // 2. Tự động sắp xếp sản phẩm khi danh sách sản phẩm hoặc sortOrder thay đổi
    useEffect(() => {
        let sorted = [...products];
        if (sortOrder === "decrease") {
            sorted.sort((a, b) => b.price - a.price); // Giảm dần
        } else if (sortOrder === "ascending") {
            sorted.sort((a, b) => a.price - b.price); // Tăng dần
        }
        setFilteredProducts(sorted);
    }, [products, sortOrder]);

    // Xử lý khi nhấn nút SEARCH
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setSearchParams({ keyword: keyword.trim() });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div className="w-full bg-white pb-16">
            <div className="max-w-7xl mx-auto px-6 pt-8">
                {/* 1. SEARCH INPUT SECTION */}
                <form onSubmit={handleSearchSubmit} className="mb-8">
                    <label className="block text-gray-700 font-medium mb-2">Search</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="product name ...."
                            className="w-full sm:w-96 bg-[#ededed] text-gray-800 px-4 py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="submit"
                            className="bg-[#6300f7] hover:bg-purple-700 text-white font-semibold text-sm px-8 py-2.5 rounded-full shadow transition-colors uppercase tracking-wider"
                        >
                            SEARCH
                        </button>
                    </div>
                </form>

                {/* 2. SEARCH RESULT HEADER */}
                <div className="bg-gradient-to-r from-purple-800 to-pink-600 text-white font-semibold text-3xl px-6 py-3 w-full mb-8">
                    Search result
                </div>

                {/* 3. PRICE SORT FILTER */}
                <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-2">Price</label>
                    <div className="w-64">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full bg-[#ededed] text-gray-800 px-4 py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                        >
                            <option value="decrease">decrease (Giảm dần)</option>
                            <option value="ascending">ascending (Tăng dần)</option>
                        </select>
                    </div>
                </div>

                {/* 4. PRODUCT GRID */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500 font-medium">
                        Đang tìm kiếm sản phẩm...
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 font-medium">
                        Không tìm thấy sản phẩm nào phù hợp.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((item) => (
                            <div
                                key={item.id}
                                className="bg-[#f8f8f8] border border-gray-100 rounded shadow-sm overflow-hidden flex flex-col justify-between"
                            >
                                <div className="p-6 relative flex flex-col items-center">
                                    {/* Icon Trái Tim Yêu Thích */}
                                    <button className="absolute top-4 right-4 text-red-500 hover:scale-110 transition-transform">
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>

                                    {/* Ảnh sản phẩm */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-44 object-contain mb-4"
                                    />

                                    {/* Tên & Mô tả ngắn */}
                                    <div className="w-full text-left">
                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                                            {item.shortDescription || "short descript ..."}
                                        </p>
                                    </div>
                                </div>

                                {/* Chân Card: Nút Buy now & Giá tiền */}
                                <div className="flex items-stretch h-12 border-t border-gray-200">
                                    <Link
                                        to={`/detail/${item.id}`}
                                        className="flex-1 bg-[#9be871] hover:bg-[#86d45e] text-gray-900 font-semibold text-center flex items-center justify-center transition-colors"
                                    >
                                        Buy now
                                    </Link>
                                    <div className="w-1/3 bg-[#dcdcdc] text-gray-900 font-bold flex items-center justify-center">
                                        {item.price}$
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}