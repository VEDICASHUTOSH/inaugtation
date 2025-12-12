import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Inaugration Leads",
  description: "Vedic Rishi Inaugration Leads Form",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <div
          style={{
            background: "rgb(2,10,34)",
            // overflow: "hidden",
          }}
          className="relative z-[1] pt-14 md:pt-14 h-full min-h-screen pb-0"
        >
          {/* <GlowBackground /> */}
          <div
            style={{
              background:
                "url('https://upastrology-com.b-cdn.net/web/images/analyser/general-offer/astro-pattern.png')",
            }}
            className="z-[-1] bg-contain opacity-5 absolute bg-repeat  w-full"
          ></div>
          <div
            style={{
              background:
                "radial-gradient(50% 50%at 50% 50%,rgb(19,36,78) 0%,rgba(0,72,255,0) 100%)",
              borderRadius: "100%",
              filter: "blur(0px)",
              flex: "0 0 auto",
              height: "1355px",
              mixBlendMode: "screen",
              overflow: "hidden",
              pointerEvents: "none",
              position: "absolute",
              right: "0px",
              top: "-650px",
              width: "97%",
              willChange: "transform",
              zIndex: 9,
            }}
          ></div>
          <div
            className={`cursor-pointer -mt-2 mx-auto mb-10 w-[140px] md:w-[160px]`}
          >
            <img
              src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/imgs/new_vedic_logo.svg"
              alt=""
            />
          </div>

          <div className="w-full h-full">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
