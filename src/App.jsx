import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/about" element={<Footer />} />
    </Routes>
  );
}
