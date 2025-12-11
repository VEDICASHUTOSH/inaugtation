"use client";
import CommonInput from "@/components/CommonInput";
import PortalLayout from "@/components/PortalLayout";
import { useState } from "react";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const handlePassData = async (isSuccess, payload) => {
    console.log("payload", payload);
    setLoader(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoader(false);
  };

  return (
    <>
      <style jsx>{`
        :root {
          --color-primary: #f97316;
          --color-secondary: #06b6d4;
        }

        .hero_bg {
          z-index: 1;
          background-size: 100% 100%;
          width: 100%;
          position: relative;
          background-position: 50% center;
          border-radius: 0.5rem;
        }

        /* iPhone Liquid Glass Zodiac Bar - Full Width */
        .zodiac-glass-bar {
          position: relative;
          width: 100%;
          overflow: hidden;
          backdrop-filter: blur(40px);
          background: linear-gradient(
            135deg,
            rgba(249, 115, 22, 0.08) 0%,
            rgba(6, 182, 212, 0.08) 100%
          );
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 4px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .moving-border-top {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(249, 115, 22, 0.8),
            rgba(6, 182, 212, 0.8),
            transparent
          );
          animation: slideLight 3s linear infinite;
          z-index: 2;
        }

        .moving-border-bottom {
          position: absolute;
          bottom: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(6, 182, 212, 0.8),
            rgba(249, 115, 22, 0.8),
            transparent
          );
          animation: slideLight 3s linear infinite 1.5s;
          z-index: 2;
        }

        @keyframes slideLight {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        /* Zodiac button - simple transparent */
        .zodiac-btn-glass {
          position: relative;
          background: transparent;
          border: none;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .zodiac-btn-glass:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          backdrop-filter: blur(10px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .zodiac-btn-glass:hover img {
          filter: brightness(1.2) contrast(1.1);
        }

        /* Card with similar glass effect to zodiac buttons */
        .zodiac-card-glass {
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .zodiac-card-glass:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 100%
          ) !important;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Mobile dropdown iPhone liquid glass effect */
        .zodiac-dropdown-glass {
          background: linear-gradient(
            135deg,
            rgba(6, 182, 212, 0.05) 0%,
            rgba(249, 115, 22, 0.04) 100%
          ) !important;
          backdrop-filter: blur(35px);
          border: 1px solid rgba(249, 115, 22, 0.15);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .zodiac-dropdown-btn-glass {
          background: transparent;
          border: none;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .zodiac-dropdown-btn-glass:hover {
          opacity: 0.95;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.08) 100%
          );
          backdrop-filter: blur(8px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25),
            0 3px 10px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .zodiac-dropdown-btn-glass:hover img {
          filter: brightness(1.15) contrast(1.05);
        }

        /* Mobile glass container */
        .mobile-glass-container {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(6, 182, 212, 0.08) 0%,
            rgba(249, 115, 22, 0.08) 100%
          ) !important;
          backdrop-filter: blur(40px);
          border: none;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        /* Mobile moving gradient borders */
        .mobile-glass-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(249, 115, 22, 0.8),
            rgba(6, 182, 212, 0.8),
            transparent
          );
          animation: slideLight 3s linear infinite;
          z-index: 1;
          pointer-events: none;
        }

        .mobile-glass-container::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(6, 182, 212, 0.8),
            rgba(249, 115, 22, 0.8),
            transparent
          );
          animation: slideLight 3s linear infinite;
          z-index: 1;
          pointer-events: none;
        }

        .mobile-glass-container p {
          color: white;
        }

        .mobile-glass-select-btn {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          color: white !important;
        }

        .mobile-glass-select-btn:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.08) 100%
          );
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25),
            0 3px 10px rgba(0, 0, 0, 0.12);
        }

        .book-float {
          animation: float 3s ease-in-out infinite;
        }

        // @keyframes float {
        //   0%, 100% {
        //     transform: translateY(0px) rotate(0deg);
        //   }
        //   50% {
        //     transform: translateY(-20px) rotate(2deg);
        //   }
        // }
      `}</style>
      <div className="flex min-h-screen items-center justify-center  font-sans">
        <main className=" flex min-h-screen w-full flex-col items-center justify-between px-4 gap-4">
          <header className="flex flex-col items-center gap-2">
            <div className="text-4xl sm:text-5xl md:text-5xl font-ptsans-black  text-white text-center">
              Welcome To Vedic Rishi Inaugration
            </div>
            <div className="text-zinc-300 text-center">
              Please fill this form to get goodies
            </div>
          </header>
          <div className="w-full max-w-3xl">
            <CommonInput
              text="Enter your birth details"
              passdata={handlePassData}
              isLoading={loader}
              disableAutoScroll
              data={{
                name: "Enter Your Full Name", // label override (optional)
                date: "Select Your Birth Date", // label override (optional)
                place: "Select Your Birth Place", // label override (optional)
                button: "Click", // button text override (optional)
                loadingButton: "Generating...", // loading text
              }}
              // headerBg='bg-gradient-to-r from-orange-400 to-pink-400'
              headerBg="bg-gradient-to-r from-[#9b7bdb] to-[#120c3f]"
              color="bg-gradient-to-r from-orange-400 to-pink-400"
            />
          </div>
        </main>
      </div>
    </>
  );
}
Home.getLayout = function getLayout(page) {
  return <PortalLayout>{page}</PortalLayout>;
};
