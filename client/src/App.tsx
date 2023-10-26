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
import PrivateRouter from "./PrivateRoute";
import Comments from "./pages/main/Comments";
import Post from "./pages/main/Post";
import MessagesDirect from "./pages/main/MessagesDirect";
import Messages from "./pages/main/Messages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPwd />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/reset-password/:token" element={<ResetPwd />} />
            <Route path="/register/:facebookid" element={<RegisterFacebook />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <PrivateRouter>
                  <Home />
                </PrivateRouter>
              }
            />
            <Route path="/:username" element={<Profile />} />
            <Route path="/:id/comments" element={<Comments />} />
            <Route path="/:username/:id" element={<Post />} />
            <Route path="/direct/inbox" element={<MessagesDirect />} />
            <Route path="/direct/:id" element={<Messages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
