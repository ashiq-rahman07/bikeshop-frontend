import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AOS from "aos";
import "aos/dist/aos.css";
import MainLayout from "./components/layout/MainLayout"
import Home from "./components/home/Home"
import ProductsPage from "./components/products/ProductsPage"
import About from "./components/about/About"
import DashboardLayout from "./components/layout/DashboardLayout"
import Dashboard from "./components/dashboard/Dashboard"
import React from "react";
// import React, { useEffect, useState } from "react"


function App() {
   // dark mode start
  //  const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  // );
  // const element = document.documentElement;

  // useEffect(() => {
  //   if (theme === "dark") {
  //     element.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     element.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [theme]);
  // // dark mode end

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
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
        <Route path="products" element={<ProductsPage />} />
        <Route path="about" element={<About/>} />
        {/* <Route path="signin" element={<SignIn />} /> */}
        {/* <Route path="signup" element={<SignUp />} /> */}
        {/* <Route path="cart" element={<Cart />} /> */}
      </Route>

      {/* Authenticated Routes with DashboardLayout */}
      <Route path="/dashboard" element={<DashboardLayout/>}>
        <Route index element={<Dashboard />} />
        {/* <Route path="orders" element={<Orders />} /> */}
        {/* <Route path="settings" element={<Settings />} /> */}
      </Route>
    </Routes>
  </Router>
  )
}

export default App
