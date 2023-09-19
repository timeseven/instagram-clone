import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPwd from "./pages/auth/ForgotPwd";
import SendEmail from "./pages/auth/SendEmail";
import ResetPwd from "./pages/auth/ResetPwd";
import RegisterFacebook from "./pages/auth/RegisterFacebook";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpwd" element={<ForgotPwd />} />
            <Route path="/send-email" element={<SendEmail />} />
            <Route path="/resetpwd" element={<ResetPwd />} />
            <Route path="/signup/:facebookid" element={<RegisterFacebook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
