import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Destinations from "../pages/Destinations";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/destinations" element={<Destinations />} />
      {/* Backwards-compatible: old /countries route now redirects */}
      <Route path="/countries" element={<Navigate to="/destinations" replace />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
