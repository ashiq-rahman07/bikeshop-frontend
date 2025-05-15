import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MainLayout from './components/layout/MainLayout';
import Home from './components/home/Home';
import ProductsPage from './components/products/ProductsPage';
import About from './components/about/About';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import React from 'react';
import Cart from './components/cartpage/Cart';

import SignUp from './components/register/SignUp';
import SignIn from './components/register/SignIn';
import OrderManagement from './components/dashboard/admin/orderManagement/OrderManagement';

import UserProfile from './components/dashboard/user profile/UserProfile';
import VerifyOrder from './components/order/VerifyOrder';
import Order from './components/order/Order';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ProductDetails from './components/products/ProductDetails';
import MyOrder from './components/dashboard/customer/MyOrder';
import ProductManagement from './components/dashboard/admin/productManagemant/ProductManagement';
import AddProdact from './components/dashboard/admin/productManagemant/AddProdact';

import CustomerManagementPage from './components/dashboard/admin/customerManagement/CustomerManagementPage';
import UpdateProdact from './components/dashboard/admin/productManagemant/UpdateProduct';
import ProductDetailPage from './components/products/ProductDetailPage';
import Register from './components/register/Register';
import DemoRegister from './components/register/DemoRegister';
import DemoLogin from './components/register/DemoLogin';
import AboutPage from './components/about/AboutPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminOrders from './components/Admin/AdminOrders';
import CustomerProfile from './components/customer/CustomerProfile';
import FinancingPage from './components/pages/FinancingPage';
import ProtectRoute from './components/route/ProtectRoute';
import CustomerDashboard from './components/customer/CustomerDashboard';
import CustomerOrders from './components/dashboard/customer/CustomerOrders';
import Checkout from './components/pages/CheckOutPage';
import AdminBikes from './components/dashboard/admin/AdminBikes';
import AddBike from './components/dashboard/admin/AddBike';
import AddGear from './components/dashboard/admin/AddGear';
import AdminGear from './components/dashboard/admin/AdminGear';
import AllBikesPage from './components/pages/AllBikesPage';
import ProductDetailsPage from './components/pages/ProductDetailsPage';
import GearDetailsPage from './components/pages/GearDetailsPage';
import AllGearPage from './components/pages/AllGearPage';
import DemoGearPage from './components/pages/DemoGearpage';
import CartPage from './components/pages/CartPage';
// import React, { useEffect, useState } from "react"

function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          
          <Route path="bikes" element={<AllBikesPage />} />
          <Route path="bikes/:bikeId" element={<ProductDetailsPage />} />
          <Route path="financing" element={<FinancingPage />} />
          {/* <Route path="gears" element={<AllGearPage/>} /> */}
          <Route path="gears" element={<AllGearPage/>} />
          <Route path="gears/:gearId" element={<GearDetailsPage />} />
          
          
          <Route path="about" element={<AboutPage />} />
       
          {/* <Route path="cart" element={<Cart />} /> */}
          <Route path="cart" element={<CartPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/order/verify" element={<VerifyOrder />} />
            <Route path="/order" element={<Order />} />
          </Route>
        </Route>
           <Route path="login" element={<DemoLogin />} />
          <Route path="register" element={<DemoRegister/>} />

              <Route path="/checkout" element={
                <ProtectRoute>
                  <Checkout />
                </ProtectRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectRoute>
                  <CustomerDashboard />
                </ProtectRoute>
              } />
              <Route path="/dashboard/orders" element={
                <ProtectRoute>
                  <CustomerOrders />
                </ProtectRoute>
              } />
              <Route path="/dashboard/profile" element={
                <ProtectRoute>
                  <CustomerProfile />
                </ProtectRoute>
              } />

              {/* Protected Routes - Admin Only */}
              <Route path="/admin/dashboard" element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectRoute>
              } />
              <Route path="/admin/orders-management" element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <AdminOrders />
                </ProtectRoute>
              } />
              <Route path="/admin/bikes-management" element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <AdminBikes />
                 
                </ProtectRoute>
              } />
              <Route path="/admin/add-bike" element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <AddBike />
                </ProtectRoute>
              } />
              <Route path="/admin/gears-management" element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <AdminGear />
                </ProtectRoute>
              } />
              <Route path="/admin/add-gears" element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <AddGear />
                </ProtectRoute>
              } />
              <Route path="/admin/customers-management" element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <CustomerManagementPage />
                </ProtectRoute>
              } />

      </Routes>
    </Router>
  );
}

export default App;
