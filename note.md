Các thư mục chính: 
###    1> services : axios # Nơi chứa axios instance & interceptors
###    2> pages: chứa các trang trong web 
        -Home
        -Register
        -Login
        -Profile
        -Cart
        -Search
        -Detail
###    3> Component: 
        -Header
        -Footer
        -ProductCard
###    4> store : # Nơi chứa Zustand stores (useAuthStore, useCartStore, useProductStore)

###    5> routes : # Nhiệm vụ các file trong thư mục `routes/`
        1. `AppRoutes.jsx` (Quản lý bản đồ điều hướng toàn ứng dụng)
            - **Nhiệm vụ:** Định nghĩa danh sách toàn bộ tuyến đường (routes) của ứng dụng như `/`, `/detail/:id`, `/search`, `/cart`, `/profile`, `/login`, `/register`.
            - **Tác dụng:**
                - Tách rời logic cấu hình điều hướng ra khỏi `App.jsx` giúp mã nguồn gọn gàng, dễ bảo trì.
                - Lồng các trang vào `MainLayout` để dùng chung Header và Footer.
                - Áp dụng `ProtectedRoute` bảo vệ các trang yêu cầu đăng nhập.

        2. `ProtectedRoute.jsx` (Lớp bảo vệ / Phân quyền truy cập)
            - **Nhiệm vụ:** Kiểm tra trạng thái đăng nhập của người dùng (kiểm tra Token hoặc `userInfo` trong Zustand/localStorage) trước khi cho phép truy cập vào các trang riêng tư (như `/profile`, `/cart`).
            - **Tác dụng:**
                - **Nếu đã đăng nhập:** Cho phép truy cập bình thường và hiển thị nội dung trang (thông qua `<Outlet />` hoặc `children`).
                - **Nếu chưa đăng nhập:** Tự động điều hướng (redirect) người dùng về trang `/login` bằng `<Navigate to="/login" replace />`.

###    6> layouts : Chứa các layout như Regis, login, admin, main 