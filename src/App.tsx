import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MainLayout from './components/layout/MainLayout';
import Home from './components/home/Home';



import React from 'react';




import VerifyOrder from './components/order/VerifyOrder';
import Order from './components/order/Order';
import ProtectedRoute from './components/layout/ProtectedRoute';



import CustomerManagementPage from './components/dashboard/admin/customerManagement/CustomerManagementPage';
// import UpdateProdact from './components/dashboard/admin/productManagemant/UpdateProduct';
// import ProductDetailPage from './components/products/ProductDetailPage';

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

import AdminBikes from './components/dashboard/admin/BikesManagement';

import AdminGear from './components/dashboard/admin/GearManagement';
import AllBikesPage from './components/pages/AllBikesPage';
import ProductDetailsPage from './components/pages/ProductDetailsPage';
import GearDetailsPage from './components/pages/GearDetailsPage';
import AllGearPage from './components/pages/AllGearPage';

import CartPage from './components/pages/CartPage';


import AddBikeForm from './components/form/AddBikeForm';
import BikesManagement from './components/dashboard/admin/BikesManagement';
import GearManagement from './components/dashboard/admin/GearManagement';
import UpdateBikeForm from './components/form/UpdateBikeForm';
import AddGearsForm from './components/form/AddGearsForm';
import UpdateGearForm from './components/form/UpdateGearForm';
import CheckOut from './components/pages/CheckOut';
import PaymentSuccess from './components/pages/PaymentSuccess';
import OrdersManagement from './components/dashboard/admin/OrdersManagement';
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
                  <CheckOut/>
                </ProtectRoute>
              } />
              <Route path="/payment" element={
                <ProtectRoute>
                  <PaymentSuccess/>
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
                  <OrdersManagement />
                </ProtectRoute>
              } />
              <Route path="/admin/bikes-management" element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <BikesManagement />
                 
                </ProtectRoute>
              } />
              <Route path="/admin/add-bike" element={
                <ProtectRoute allowedRoles={["admin"]}>
    
                  <AddBikeForm/>
                </ProtectRoute>
              } />
              <Route path="/admin/update-bike/:bikeId" element={
                <ProtectRoute allowedRoles={["admin"]}>
    
                  <UpdateBikeForm/>
                </ProtectRoute>
              } />
              <Route path="/admin/gears-management" element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <GearManagement />
                </ProtectRoute>
              } />
              <Route path="/admin/add-gears" element={
                <ProtectRoute allowedRoles={["admin"]}>
               
                  <AddGearsForm/>
                </ProtectRoute>
              } />
              <Route path="/admin/update-gear/:gearId" element={
                <ProtectRoute allowedRoles={["admin"]}>
               
                  <UpdateGearForm/>
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
