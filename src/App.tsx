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
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="products" element={<ProductsPage />} />
          
          <Route path="about" element={<About />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="cart" element={<Cart />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/order/verify" element={<VerifyOrder />} />
            <Route path="/order" element={<Order />} />
          </Route>
        </Route>

        {/* Authenticated Routes with DashboardLayout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="my-orders" element={<MyOrder />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="customers" element={<CustomerManagementPage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="products/create" element={<AddProdact />} />
            <Route
              path="products/update/:productId"
              element={<UpdateProdact />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
