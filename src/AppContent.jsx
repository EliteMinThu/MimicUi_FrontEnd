import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import CvFormPage from "./pages/CvFormPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InterviewMainPage from "./pages/InterviewMainPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgetPasswordPage from "./pages/ForgetPasswordPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import Verified from "./pages/Verified.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import FeedBackpage from "./pages/FeedBackpage.jsx";

const AppContent = ({ user, isVerified }) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!user ? <Navigate to="/login" /> : <Navigate to="/cvform" />}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        {/* Logout Route */}
          <Route path="/logout" element={<LogoutPage />} />

          {/*feedBack page */}
          <Route path="/feedback" element={<FeedBackpage />} />

        <Route path="/email-verify" element={<EmailVerificationPage />} />
          <Route path="/verify/:token" element={<Verified />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          {/*cvForm*/}
        <Route
          path="/cvform"
          element={
            <ProtectedRoute>
              <CvFormPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewMainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
export default AppContent;
