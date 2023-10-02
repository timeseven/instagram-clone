import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPwd from "./pages/auth/ForgotPwd";
import EmailSent from "./pages/auth/EmailSent";
import ResetPwd from "./pages/auth/ResetPwd";
import RegisterFacebook from "./pages/auth/RegisterFacebook";
import Home from "./pages/main/Home";
import Profile from "./pages/main/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpwd" element={<ForgotPwd />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/resetpwd" element={<ResetPwd />} />
            <Route path="/signup/:facebookid" element={<RegisterFacebook />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/:username" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
