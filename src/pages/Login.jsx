import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

export default function Login() {
    const login = useAuthStore((state) => state.login);
    const [notification, setNotification] = useState({ type: "", message: "" });
    const navigate = useNavigate();

    const formLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Email không được bỏ trống")
                .email("Email không hợp lệ"),
            password: Yup.string()
                .required("Password không được bỏ trống")
                .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
                .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
                .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
                .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số")
                .matches(/[^A-Za-z0-9]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
        }),
        onSubmit: async (values) => {
            try {
                // Gọi action login từ Zustand store
                // Hàm login ở store đã tự lưu Token vào localStorage và gọi API getProfile
                const res = await login(values);

                setNotification({
                    type: "success",
                    message: res?.message || "Đăng nhập thành công!",
                });

                // Chuyển về trang chủ sau khi hoàn tất
                navigate("/");
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.message || "Email hoặc mật khẩu không chính xác!";
                setNotification({
                    type: "error",
                    message: errorMessage,
                });
            }
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Đăng nhập vào tài khoản
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Chưa có tài khoản?{" "}
                        <Link
                            to={"/register"}
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>

                {notification.message && (
                    <div
                        className={`p-4 mb-4 text-sm rounded-lg ${
                            notification.type === "error"
                                ? "bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400 border border-red-300"
                                : "bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400 border border-green-300"
                        }`}
                    >
                        {notification.message}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={formLogin.handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <input
                                {...formLogin.getFieldProps("email")}
                                name="email"
                                type="email"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="name@company.com"
                            />
                            {formLogin.touched.email && formLogin.errors.email && (
                                <p className="mt-1 text-sm text-red-500">{formLogin.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Mật khẩu
                            </label>
                            <input
                                {...formLogin.getFieldProps("password")}
                                name="password"
                                type="password"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="••••••••"
                            />
                            {formLogin.touched.password && formLogin.errors.password && (
                                <p className="mt-1 text-sm text-red-500">{formLogin.errors.password}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={formLogin.isSubmitting}
                        className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                    >
                        {formLogin.isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
}