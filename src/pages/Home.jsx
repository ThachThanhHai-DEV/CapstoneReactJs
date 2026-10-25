import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../store/useProductStore"; // Đã dùng default import
import useCartStore from "../store/useCartStore";

export default function Home() {
  const { products, loading, getAllProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  // State quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Giới hạn 6 sản phẩm mỗi trang

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Lấy sản phẩm đầu tiên hiển thị Carousel Banner
  const featuredProduct = products[0];

  // Tính toán phân trang
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full bg-white">
      {/* 1. CAROUSEL BANNER SECTION */}
      {featuredProduct && (
        <section className="relative bg-gray-50 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <button className="hidden md:block text-gray-300 hover:text-black text-4xl font-light px-4">
              &#10094;
            </button>

            <div className="flex-1 flex justify-center">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="max-h-80 object-contain drop-shadow-md"
              />
            </div>

            <div className="flex-1 space-y-4">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
                {featuredProduct.name}
              </h1>
              <p className="text-gray-500 text-sm line-clamp-2">
                {featuredProduct.description || "Product description ..."}
              </p>
              <Link
                to={`/detail/${featuredProduct.id}`}
                className="inline-block bg-[#f8b653] hover:bg-[#e09e3e] text-white font-medium px-8 py-2.5 rounded shadow-sm transition-colors"
              >
                Buy now
              </Link>
            </div>

            <button className="hidden md:block text-gray-300 hover:text-black text-4xl font-light px-4">
              &#10095;
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            <span className="w-3 h-3 rounded-full bg-gray-300 inline-block cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-gray-300 inline-block cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-gray-300 inline-block cursor-pointer"></span>
          </div>
        </section>
      )}

      {/* 2. PRODUCT FEATURE HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-8 mb-6">
        <div className="bg-gradient-to-r from-purple-800 to-pink-600 text-white font-semibold text-2xl px-6 py-3 w-full md:w-auto md:inline-block">
          Product Feature
        </div>
      </section>

      {/* 3. PRODUCT GRID SECTION (6 SẢN PHẨM) */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">
            Đang tải danh sách sản phẩm...
          </div>
        ) : (
          <>
            {/* Hiển thị tối đa 6 sản phẩm của trang hiện tại */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f8f8f8] border border-gray-100 rounded shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 relative flex flex-col items-center">
                    <button className="absolute top-4 right-4 text-red-500 hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>

                    <Link to={`/detail/${item.id}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
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
                    <button
                      onClick={() => addToCart(item, 1)}
                      className="flex-1 bg-[#e1a038] hover:bg-[#c78b2d] text-gray-900 font-semibold text-center flex items-center justify-center transition-colors"
                    >
                      <Link
                        to={`/detail/${item.id}`}
                        className="bg-[#e1a038] text-gray-900 font-semibold px-4 py-2 rounded"
                      >
                        Buy now
                      </Link>
                    </button>
                    <div className="w-1/3 bg-[#dcdcdc] text-gray-900 font-bold flex items-center justify-center">
                      {item.price}$
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. PAGING CONTROL (THANH PHÂN TRANG) */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                {/* Nút Previous */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &laquo;
                </button>

                {/* Các số trang */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3.5 py-1.5 rounded text-sm font-semibold transition-colors ${currentPage === page
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Nút Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &raquo;
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}