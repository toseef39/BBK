// FirstOtpVerify.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FirstOtpVerify() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  // Timer countdown
  // useEffect(() => {
  //   if (timer <= 0) return;
  //   const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
  //   return () => clearInterval(interval);
  // }, [timer]);

  // // Autofocus first input
  // useEffect(() => {
  //   inputRefs.current[0]?.focus();
  // }, []);

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // only digits allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Backspace behavior
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP (dummy, no real check)
  // const verifyOTP = () => {
  //   const emptyIndex = otp.findIndex((d) => d === "");
  //   if (emptyIndex !== -1) {
  //     inputRefs.current[emptyIndex]?.focus();
  //     return;
  //   }

  //   // All fields filled → navigate
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     navigate("/namepage"); // navigate without actual verification
  //   }, 800);
  // };

  // Resend OTP
  const resendOTP = () => {
    if (timer > 0) return;
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    setTimer(60);
    alert("OTP resent successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] via-[#2E5BBA] to-[#1E3A8A] text-white px-6 py-12 flex flex-col items-center">

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
      <div className="text-center mb-10">
        <h1 className="text-2xl font-light">OTP Verification</h1>
        <p className="text-sm opacity-80 mt-2">
          We’ve sent a 6-digit verification code to your registered number.
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-between gap-3 mb-10">
        {otp.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            ref={(el) => (inputRefs.current[i] = el)}
            className="w-10 h-12 text-center text-2xl bg-transparent border border-white/40 rounded-xl focus:border-white outline-none"
          />
        ))}
      </div>

      {/* Resend OTP */}
      <div className="text-center mb-10">
        <p className="text-sm opacity-70 mb-2">Didn't receive the code?</p>
        <button
          onClick={resendOTP}
          disabled={timer > 0}
          className={`underline ${timer > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Resend OTP
        </button>
        {timer > 0 && <p className="text-sm mt-2 opacity-80">Available in {timer}s</p>}
      </div>

      {/* Verify Button */}
      <button
        onClick={()=>navigate("/namepage")}
        disabled={loading}
        className="w-full max-w-md bg-white/20 py-3 rounded-full text-lg backdrop-blur-md hover:bg-white/30 transition disabled:opacity-50 flex justify-center items-center"
      >
        {loading && <span className="loader border-t-white border-white/30 mr-2 w-5 h-5 rounded-full animate-spin border-2"></span>}
        {loading ? "Verifying..." : "Verify"}
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate("/namepage")}
        className="mt-6 text-white/90 hover:text-white text-sm"
      >
        ← Back to Login
      </button>
    </div>
  );
}
