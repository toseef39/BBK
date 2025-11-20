import React from "react";
import { Routes, Route } from "react-router-dom";
import Firstone from "./pages/Firstone";
import CPRVerification from "./pages/CPRVerification";
import Personalinfo from "./pages/Personalinfo";
import BBKLogin from "./pages/BBKlogin";
import FirstOtpVerify from "./pages/FirstOtpVerify";
import Name from "./pages/Name";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Firstone />} />
      <Route path="/cpr" element={<CPRVerification />} />
      <Route path="/personalinfo" element={<Personalinfo />} />
      <Route path="/bbklogin" element={<BBKLogin/>} />
      <Route path="/firstotp" element={<FirstOtpVerify/>} />
      <Route path="/name" element={<Name/>} />
      {/* Add other routes here */}
    </Routes>
  );
};
