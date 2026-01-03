import React from "react";
import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import HomeLogin from "./pages/HomeLogin/HomeLogin";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import MainPage from "./pages/MainPage/MainPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import RecoverAccount from "./pages/RecoverAccount/RecoverAccount";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLogin />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/recoverAccount" element={<RecoverAccount />} />
    </Routes>
  );
}

// MainPage

// UserProfile
