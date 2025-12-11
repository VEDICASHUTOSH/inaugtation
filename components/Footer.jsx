"use client";
import Link from "next/link";

export const font = {
  hindi: "laila",
};

export default function Footer() {
  return (
    <div
      style={{
        background: "rgb(2,10,34)",
      }}
      className="border-t border-[rgb(22,47,98)] py-8 md:py-12 mt-14 flex flex-col gap-5"
      id="footer"
    >
      {/* <Section
        setGrid={true}
        makeGrid="grid grid-cols-2 lg:grid-cols-4 gap-4"
        containerExtraClass="lg:max-w-6xl md:max-w-4xl text-sm">
        <LinkTag title="MENU" link={linkobject.menu} />
        <LinkTag title="LINKS" link={linkobject.linkss} />
        <LinkTag title="FEATURES" link={linkobject.fetures} />
        <AboutVedicRishi
          title="ABOUT VEDIC RISHI"
          text=" Vedic Rishi is an Astro-Tech company which aims to reorient the way
        people perceive and understand Vedic Astrology."
        />
      </Section> */}
      <div className="flex gap-5 text-sm text-zinc-400 justify-center px-5 flex-wrap">
        <span>@2025 Vedic Rishi</span>
        <Link href="https://vedicrishi.in/" legacyBehavior>
          <a className="hover:text-white duration-100 ease-in">Home</a>
        </Link>
        <Link href="https://vedicrishi.in/privacy-policy" legacyBehavior>
          <a className="hover:text-white duration-100 ease-in">
            Privacy Policy
          </a>
        </Link>
        <Link href="https://vedicrishi.in/terms-of-use" legacyBehavior>
          <a className="hover:text-white duration-100 ease-in">
            Terms of Service
          </a>
        </Link>
        <Link
          href="https://vedicrishi.in/refund-and-cancellation-policy"
          legacyBehavior
        >
          <a className="hover:text-white duration-100 ease-in">
            Refund and Cancellation
          </a>
        </Link>
        <Link href="https://vedicrishi.in/terms-of-use" legacyBehavior>
          <a className="hover:text-white duration-100 ease-in">Disclaimer</a>
        </Link>
        <Link href="https://vedicrishi.in/support" legacyBehavior>
          <a className="hover:text-white duration-100 ease-in">Contact Us</a>
        </Link>
      </div>
      <div className="flex gap-4 px-5 mx-auto justify-between max-w-max w-full ">
        <a
          className="opacity-70 hover:opacity-100 ease-in duration-100"
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/channel/UCAbOQqZ4P-cVjqLmdFx-LVQ"
        >
          <img
            loading="lazy"
            src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/icons/youtube.svg"
            width={25}
            height={25}
            alt="youtube"
          />
        </a>
        <a
          className="opacity-70 hover:opacity-100 ease-in duration-100"
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/VedicRishiAstro"
        >
          <img
            loading="lazy"
            src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/icons/twitter.svg"
            width={25}
            height={25}
            alt="twitter"
          />
        </a>
        <a
          className="opacity-70 hover:opacity-100 ease-in duration-100"
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/VedicRishiAstro/"
        >
          <img
            loading="lazy"
            src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/icons/facebook.svg"
            width={25}
            height={25}
            alt="facebook"
          />
        </a>
        <a
          className="opacity-70 hover:opacity-100 ease-in duration-100"
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/vedicrishiastro/"
        >
          <img
            loading="lazy"
            src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/icons/instagram.png"
            width={25}
            height={25}
            alt="insta"
          />
        </a>
      </div>
    </div>
  );
}

const linkobject = {
  menu: [
    { name: "Kundli", link: "/kundli" },
    { name: "Kundli in Hindi (कुंडली)", link: "/hindi/kundli" },
    { name: "Kundli Matching", link: "/kundli-matching" },
    { name: "Vedic Store", link: "/shop" },
    { name: "Horoscope", link: "/horoscope" },
    { name: "Panchang", link: "/panchang" },
    { name: "Hora Muhurta", link: "/panchang/hora-panchang" },
    { name: "Chaughadiya Muhurta", link: "/panchang/chaughadiya" },
    { name: "Premium Kundli PDF", link: "/personalised-kundli-pdf" },
    { name: "What is Astrology", link: "/astrology" },
    { name: "Remedial Astrology", link: "/remedial-astrology" },
    {
      name: "Download Varshphal PDF",
      link: "/premium-services/personalised-varshaphal-pdf",
    },
    { name: "Natal Chart", link: "https://upastrology.com", target: "blank" },
    {
      name: "Navgrahas",
      link: "/the-nine-planets-in-astrology-shaping-your-life",
    },
  ],
  linkss: [
    { name: "Blog in hindi (ब्लॉग)", link: "/hindi/blog" },
    { name: "Go to Blog", link: "/blog" },
    { name: "Contact Us", link: "/support" },
    { name: "Vedic Mantra", link: "/mantra" },
    { name: "वैदिक मंत्र (Mantra In Hindi)", link: "/hindi/mantra" },
    { name: "Lal-Kitab", link: "/lal-kitab" },
    { name: "Vastu Shastra", link: "/vastu" },
    { name: "Navagraha", link: "/navagraha" },
    {
      name: "Free Lalkitab Horoscope",
      link: "/free-horoscope/act/free-lalkitab-horoscope",
    },
    { name: "Free Horoscope", link: "/free-horoscope" },
    { name: "Free Horoscope Matching", link: "/horoscope-matching" },
    {
      name: "Ask Our Astrologer",
      link: "/premium-services/ask-vedic-astrologer",
    },
    {
      name: "UpAstrology App",
      target: "blank",
      link: "https://play.google.com/store/apps/details?id=com.vedicrishiastro.upastrology&hl=en",
    },
    { name: "Lal Kitab Calculator", link: "/your-free-lal-kitab-kundli" },
    {
      name: "Detailed Numerology Calculator",
      link: "/your-free-numerology-report",
    },
  ],
  fetures: [
    {
      name: "Ascendant Calculator",
      link: "/kundli/ascendant-report",
    },
    { name: "Gemstone Suggestion", link: "/kundli/gemstone-suggestion" },
    { name: "Rudraksha Suggestion", link: "/kundli/rudraksha-suggestion" },
    { name: "Numerology For You", link: "/kundli/numerology-prediction" },
    { name: "Kaalsarpa Dosha", link: "/kundli/kalsarpa-dosha-effect-remedies" },
    {
      name: "Sadhesati Calculator",
      link: "/kundli/sadhesati-cycle-effect-remedies",
    },
    {
      name: "Pitra Dosha Calculator",
      link: "/kundli/pitra-dosha-effect-remedies",
    },
    {
      name: "Mangalik Calculator",
      link: "/kundli/manglik-dosha-effect-remedies",
    },
    { name: "Nakshatra Finder", link: "/kundli/nakshatra-finder" },
    { name: "Astrology API for Web", link: "/web-astro-api/" },
    {
      name: "Matching Report PDF",
      link: "/premium-services/personalised-matching-pdf",
    },
  ],
};

export function Section(props) {
  const width = props.width || "w-full";
  const sectionBg = props.sectionBg || "bg-transparent";
  const sectionTBPadding = props.sectionTBPadding || "py-12";
  const sectionLRPadding = props.sectionLRPadding || "";
  const sectionExtraClass = props.sectionExtraClass || "";
  const containerWidth = props.containerWidth || "mx-auto px-4";
  const containerBg = props.containerBg || "bg-transparent";
  const setGrid = !!props.setGrid;
  const makeGrid = props.makeGrid || "grid md:grid-cols-12 gap-4";
  const setFlex = !!props.setFlex;
  const makeFlex = props.makeFlex || "";
  const containerExtraClass = props.containerExtraClass || "";

  const sectionClass = `${width} ${sectionBg} ${sectionTBPadding} ${sectionLRPadding} ${sectionExtraClass}`;
  const containerClass = `${containerWidth} ${containerBg} ${
    setGrid ? makeGrid : ""
  } ${setFlex ? makeFlex : ""} ${containerExtraClass}`;

  return (
    <section className={sectionClass}>
      <div className={containerClass}>{props.children}</div>
    </section>
  );
}

export function LinkTag(props) {
  return (
    <div className="text-white">
      <h4 className={`font-${font[props.lang]}_medium`}>{props.title}</h4>
      <div className="flex flex-col gap-3 mt-8">
        {props.link.map((data, i) => (
          <div key={i}>
            {data.target ? (
              <a
                href={`http://vedicrishi.in${data.link}`}
                rel="noreferrer"
                target="_blank"
                className={`font-${
                  font[props.lang]
                } text-gray-300 hover:text-white duration-100 ease-in hover:font-bold`}
              >
                {data.name}
              </a>
            ) : (
              <Link href={`https://vedicrishi.in${data.link}`} legacyBehavior>
                <a
                  className={`font-${
                    font[props.lang]
                  } text-gray-300 hover:text-white duration-100 ease-in hover:font-bold`}
                >
                  {data.name}
                </a>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutVedicRishi(props) {
  return (
    <div className="flex flex-col gap-7">
      <h4 className={`text-white font-${font[props.lang]}_medium`}>
        {props.title}
      </h4>
      <p className="text-gray-200 leading-7 ">{props.text}</p>
      <div className="flex gap-3">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fplugins%2Ferror%2Fconfirm%2Flike%3Fiframe_referer%3Dhttps%253A%252F%252Fvedicrishi.in%252F%26kid_directed_site%3Dfalse%26secure%3Dtrue%26plugin%3Dlike%26return_params%3D%257B%2522action%2522%253A%2522like%2522%252C%2522app_id%2522%253A%2522%2522%252C%2522channel%2522%253A%2522https%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df36deece56f2c4%2526domain%253Dvedicrishi.in%2526is_canvas%253Dfalse%2526origin%253Dhttps%25253A%25252F%25252Fvedicrishi.in%25252Ff35edb60c56e2a4%2526relation%253Dparent.parent%2522%252C%2522container_width%2522%253A%2522263%2522%252C%2522href%2522%253A%2522https%253A%252F%252Fwww.facebook.com%252FVedicRishiAstro%252F%2522%252C%2522layout%2522%253A%2522button_count%2522%252C%2522locale%2522%253A%2522en_US%2522%252C%2522sdk%2522%253A%2522joey%2522%252C%2522share%2522%253A%2522true%2522%252C%2522show_faces%2522%253A%2522true%2522%252C%2522size%2522%253A%2522large%2522%252C%2522ret%2522%253A%2522sentry%2522%252C%2522act%2522%253A%2522like%2522%257Ds"
          className="bg-purple-600 py-1 px-3 text-white rounded"
        >
          <div className="flex gap-x-1 items-center text-xs">
            <img
              loading="lazy"
              src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/icons/like.png"
              width={15}
              height={15}
              alt="like"
            />{" "}
            Like
          </div>
        </a>

        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%253A%252F%252Fwww.facebook.com%252FVedicRishiAstro%252F%26display%3Dpopup%26ref%3Dplugin%26src%3Dlike%26kid_directed_site%3D0&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=mr_IN&kid_directed_site=0"
          className="bg-purple-600 py-1 px-3 text-white rounded text-xs"
        >
          Share
        </a>
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://play.google.com/store/apps/details?id=com.vedicrishiastro.kundli"
      >
        <img
          loading="lazy"
          src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/imgs/play-store.png"
          width="150px"
          height="150px"
          alt="play-store"
        />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://apps.apple.com/in/app/vedicrishi-kundli/id1460129882#?platform=iphone"
      >
        <img
          loading="lazy"
          src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/imgs/app-store.png"
          width="150px"
          height="150px"
          alt="app-store"
        />
      </a>
      <div className="flex gap-4  justify-between max-w-max w-full ">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/channel/UCAbOQqZ4P-cVjqLmdFx-LVQ"
        >
          <img
            loading="lazy"
            src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/icons/youtube.svg"
            width={25}
            height={25}
            alt="youtube"
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/VedicRishiAstro"
        >
          <img
            loading="lazy"
            src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/icons/twitter.svg"
            width={25}
            height={25}
            alt="twitter"
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/VedicRishiAstro/"
        >
          <img
            loading="lazy"
            src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/icons/facebook.svg"
            width={25}
            height={25}
            alt="facebook"
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/vedicrishiastro/"
        >
          <img
            loading="lazy"
            src="https://astro-vedicrishi-in.b-cdn.net/web-vedicrishi/images/icons/instagram.png"
            width={25}
            height={25}
            alt="insta"
          />
        </a>
      </div>
    </div>
  );
}
