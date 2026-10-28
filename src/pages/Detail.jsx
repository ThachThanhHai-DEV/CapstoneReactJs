import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userApi from "../services/userApi"; 
import useCartStore from "../store/useCartStore";
import productApi from "../services/productApi"; 

export default function Detail() {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const addToCart = useCartStore((state) => state.addToCart);

    // Gọi API lấy chi tiết sản phẩm theo ID khi param `id` thay đổi
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                // Gọi API getProductById
                const res = await productApi.getProductById(id);
                const data = res.data.content;
                setProductDetail(data);

             
                if (data?.size && data.size.length > 0) {
                    setSelectedSize(data.size[0]);
                }
                setQuantity(1); // Reset số lượng về 1
            } catch (error) {
                console.error("Lỗi lấy chi tiết sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductDetail();
            // Tự động cuộn lên đầu trang khi đổi sản phẩm
            window.scrollTo(0, 0);
        }
    }, [id]);

    // Tăng / giảm số lượng mua
    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    // Thêm vào giỏ hàng
    const handleAddToCart = () => {
        if (!productDetail) return;
        addToCart(productDetail, quantity);
    };

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-500 font-medium">
                Đang tải chi tiết sản phẩm...
            </div>
        );
    }

    if (!productDetail) {
        return (
            <div className="text-center py-20 text-red-500 font-medium">
                Không tìm thấy sản phẩm!
            </div>
        );
    }

    return (
        <div className="w-full bg-white pb-16">
            {/* 1. PRODUCT DETAIL SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Khối Ảnh Sản Phẩm bên trái */}
                    <div className="bg-[#f8f8f8] p-8 rounded-lg flex justify-center items-center h-[380px]">
                        <img
                            src={productDetail.image}
                            alt={productDetail.name}
                            className="max-h-80 object-contain drop-shadow-md hover:scale-105 transition-transform"
                        />
                    </div>

                    {/* Khối Thông Tin Sản Phẩm bên phải */}
                    <div className="space-y-5">
                        <h1 className="text-3xl font-semibold text-gray-800">
                            {productDetail.name}
                        </h1>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            {productDetail.description}
                        </p>

                        {/* Available Size */}
                        <div>
                            <h3 className="text-[#10b981] font-semibold text-base mb-2">
                                Available size
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {productDetail.size?.map((sizeItem) => (
                                    <button
                                        key={sizeItem}
                                        onClick={() => setSelectedSize(sizeItem)}
                                        className={`w-10 h-10 font-medium text-sm rounded transition-colors ${
                                            selectedSize === sizeItem
                                                ? "bg-black text-white"
                                                : "bg-[#cccccc] text-gray-800 hover:bg-gray-400"
                                        }`}
                                    >
                                        {sizeItem}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Giá Tiền */}
                        <div className="text-2xl font-bold text-[#ef4444]">
                            {productDetail.price}$
                        </div>

                        {/* Tăng / Giảm Số Lượng */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleIncrease}
                                className="w-9 h-9 bg-[#60a5fa] hover:bg-blue-500 text-white font-bold text-lg rounded flex items-center justify-center transition-colors"
                            >
                                +
                            </button>
                            <span className="text-lg font-semibold w-8 text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={handleDecrease}
                                className="w-9 h-9 bg-[#60a5fa] hover:bg-blue-500 text-white font-bold text-lg rounded flex items-center justify-center transition-colors"
                            >
                                -
                            </button>
                        </div>

                        {/* Nút Add to cart */}
                        <button
                            onClick={handleAddToCart}
                            className="bg-[#a855f7] hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded shadow transition-colors"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. RELATED PRODUCT SECTION */}
            <section className="max-w-7xl mx-auto px-6 mt-10">
                <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">
                    - Realate Product -
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productDetail.relatedProducts?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#f8f8f8] border border-gray-100 rounded shadow-sm overflow-hidden flex flex-col justify-between"
                        >
                            <div className="p-6 relative flex flex-col items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-44 object-contain mb-4"
                                />
                                <div className="w-full text-left">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                                        {item.shortDescription || "short descript ..."}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-stretch h-12 border-t border-gray-200">
                                <Link
                                    to={`/detail/${item.id}`}
                                    className="flex-1 bg-[#e1a038] hover:bg-[#c78b2d] text-gray-900 font-semibold text-center flex items-center justify-center transition-colors"
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
            </section>
        </div>
    );
}