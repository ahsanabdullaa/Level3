import React, { useState, useEffect } from "react";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import HomePage from "../pages/HomePage/HomePage";
import CustomOrderPage from "../pages/CustomOrderPage/CustomOrderPage";
import ForgetPass from "../pages/ForgetPass/ForgetPass";
import ResetPass from "../pages/ResetPass/ResetPass";
import NotFound from "../pages/NotFound";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Order from "../pages/Order/OrderPage";
import Admin from "../pages/Admin/Admin";
import TrackOrder from "../pages/TrackOrder/TrackOrder";
import SuccessPage from "../pages/SuccessPage";
import UnsuccessfulPage from "../pages/UnsuccessfulPage";

function Auth(props) {
  const isAdmin = props.isAdmin;
  const isLoggedIn = props.isLoggedIn;

  if (isAdmin === null || isLoggedIn === null) {
    // Still waiting for the async operations to complete
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isAdmin && isLoggedIn ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Navigate to="/admin" />} />
          </>
        ) : (
          <>
            <Route path="*" element={<NotFound />} />
          </>
        )}
        {!isAdmin && isLoggedIn ? (
          <>
            {/* <Route path="/trackOrder" element={<TrackOrder />} /> */}
            <Route path="/customOrder" element={<CustomOrderPage />} />
            <Route path="/order" element={<Order />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/unsuccessful" element={<UnsuccessfulPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/resetPass/:token" element={<ResetPass />} />
            <Route path="/forgetPassword" element={<ForgetPass />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Auth;
