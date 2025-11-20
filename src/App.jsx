import React from "react";
import { Routes, Route } from "react-router-dom";
import Firstone from "./pages/Firstone";
import CPRVerification from "./pages/CPRVerification";
import Personalinfo from "./pages/Personalinfo";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Firstone />} />
      <Route path="/cpr" element={<CPRVerification />} />
      <Route path="/personalinfo" element={<Personalinfo />} />
      {/* Add other routes here */}
    </Routes>
  );
};
