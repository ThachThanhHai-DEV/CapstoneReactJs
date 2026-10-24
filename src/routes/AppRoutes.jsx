import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

// Các trang (Pages)
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import AuthLayout from "../layouts/AuthLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="search" element={<Search />} />
          {/* <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> */}

          {/* Protected Routes (Bắt buộc đăng nhập mới vào được) */}
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

          <Route element={<AuthLayout />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;