"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GlowBackground2 } from "./GlowBackground2";
import { FetchApi } from "../utils/fetchApi";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
export function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const DynamicSample = dynamic(() => import("./asyncOnePage"), {
  loading: () => "",
  ssr: false,
});

export default function CommonInput(props) {
  // const [error, seterror] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [reqdate, setreqdate] = useState(false);
  const router = useRouter();
  const isLoading = Boolean(props.isLoading);
  const shouldAutoScroll = !props.disableAutoScroll;
  const buttonLabel = isLoading
    ? props?.data?.loadingButton || "Generating report..."
    : props?.data?.button || "Create Your  Free Kundli Now";
  const initialvalue = {
    name: "",
    email: "",
    birth: "",
    day: "",
    month: "",
    year: "",
    min: "",
    hour: "",
    language: props.language ? props.language : "english",
    gender: "male",
    tzone: 5.5,
    lat: "",
    lon: "",
    country: "India",
    contact: "",
  };

  // const [city, setcity] = useState({name:''});
  const [formValues, setFormValues] = useState(initialvalue);
  // const [formErrors, setFormErrors] = useState( initialvalue);
  const [typehead, settypwhead] = useState(false);
  const [mouted, setmouted] = useState(false);
  const handleinput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    setmouted(true);
    if (mouted) {
      const data = localStorage.getItem("user");
      if (data !== null) {
        const parsedData = JSON.parse(data);
        const { nameu, ...rest } = parsedData || {};
        setFormValues((prev) => ({
          ...prev,
          ...rest,
          birth: rest?.birth || rest?.place || prev.birth || "",
          language: props.language ? props.language : prev.language,
        }));
        // setFormErrors({...JSON.parse(data)});
      }
    }
    return () => setmouted(false);
  }, [mouted]);

  // Only clear errors when user successfully submits form
  // setTimeout(function () {
  //   seterror(null);
  //   setFieldErrors({});
  //   setreqdate(false);
  // }, 4000);

  const handleNumber = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: parseInt(value) });
  };

  const submitingform = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    const validationErrors = validate(formValues);
    // setFormErrors(validate(formValues));
    if (
      daysInMonth(formValues.month, formValues.year) < parseInt(formValues.day)
    ) {
      setreqdate(true);
      setFormValues((prev) => ({ ...prev, birth: "" }));
      toast.error("Please enter correct date");
      setFieldErrors({ birth: "*invalid date" });
      // Clear errors after 4 seconds
      setTimeout(() => {
        // seterror(null);
        setFieldErrors({});
        setreqdate(false);
      }, 4000);
    } else if (Object.keys(validationErrors).length !== 0) {
      toast.error("All details must be filled");
      setFieldErrors(validationErrors);
      // Clear errors after 4 seconds
      setTimeout(() => {
        // seterror(null);
        setFieldErrors({});
        setreqdate(false);
      }, 4000);
      // setFormValues(formValues);
    } else if (Object.keys(validationErrors).length === 0 && !reqdate) {
      const { nameu, ...rest } = formValues;
      const sanitizedName = typeof rest.name === "string" ? rest.name : "";
      const payload = {
        ...rest,
        name: sanitizedName,
        contact: "+91" + rest.contact,
      };
      localStorage.setItem("user", JSON.stringify(payload));
      if (shouldAutoScroll && typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      props.passdata && props.passdata(true, payload);
    } else {
      // setFormErrors(validate(formValues));
      toast.error("Please enter correct date");
      setFieldErrors({ birth: "*invalid date" });
      // Clear errors after 4 seconds
      setTimeout(() => {
        // seterror(null);
        setFieldErrors({});
        setreqdate(false);
      }, 4000);
    }
  };

  const validate = (values) => {
    let error = {};
    if (!values.name) {
      error.name = "*required";
    }
    // if (!values.email) {
    //   error.email = "*required";
    // }
    if (!values.contact) {
      error.contact = "*required";
    } else if (!/^[0-9]{10}$/.test(values.contact)) {
      error.contact = "*invalid contact number";
    }
    if (values.hour === "" || isNaN(values.hour) || values.hour === null) {
      error.hour = "*required";
    }
    if (!values.year) {
      error.year = "*required";
    }
    if (!values.month) {
      error.month = "*required";
    }
    if (!values.day) {
      error.day = "*required";
    }
    if (values.min === "" || isNaN(values.min) || values.min === null) {
      error.min = "*required";
    }
    if (values.birth == "") {
      error.birth = "*required";
    }
    return error;
  };

  const handle = async (place) => {
    if (!formValues.day || !formValues.month || !formValues.year) {
      toast.error("Please enter the date before selecting a place");
    }
    settypwhead(true);
    try {
      const timezone = await FetchApi({
        apiName: "timezone_with_dst",
        userData: {
          latitude: parseFloat(place.lat),
          longitude: parseFloat(place.lon),
          date: `${formValues.month}-${formValues.day}-${formValues.year}`,
        },
      });

      setFormValues((prev) => ({
        ...prev,
        place: place.place,
        birth: place.place,
        lat: place.lat,
        lon: place.lon,
        country: place.country,
        tzone: timezone.response.timezone,
      }));
    } catch (error) {
      toast.error("Error fetching timezone. Please try again.");
    } finally {
      settypwhead(false);
    }
  };

  return (
    <div
      className={`flex flex-col w-full  rounded-[10px] relative overflow-hidden animate-border`}
      style={{
        background:
          "linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)",
        backdropFilter: "blur(40px)",
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      <style jsx>{`
        :root {
          --color-white: white;
        }

        input,
        textarea {
          border: 1px solid
            color-mix(in oklab, var(--color-white) 10%, transparent) !important;
          border-color: color-mix(
            in oklab,
            var(--color-white) 10%,
            transparent
          ) !important;
          color: white !important;
        }

        select {
          background-color: color-mix(
            in oklab,
            var(--color-white) 5%,
            transparent
          ) !important;
          color: white !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          -moz-appearance: none !important;
          background-repeat: no-repeat !important;
          background-position: right 10px center !important;
          background-size: 20px !important;
          padding-right: 40px !important;
          border-radius: 8px !important;
          border: 1px solid rgb(110 110 110 / 30%) !important;
        }

        input::placeholder,
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          background: color-mix(
            in oklab,
            var(--color-white) 8%,
            transparent
          ) !important;
          border-color: color-mix(
            in oklab,
            var(--color-white) 15%,
            transparent
          ) !important;
        }

        .input-error {
          border: 1px solid #ef4444 !important;
        }

        option {
          background: white !important;
          color: black !important;
        }
      `}</style>

      {props.text && (
        <>
          <h2
            style={{ lineHeight: 1.3 }}
            className={`text-center ${
              props?.headerBg
                ? props?.headerBg
                : `bg-gradient-to-r from-purple-600  via-rose-500 to-yellow-400`
            } text-white  w-full px-5 md:py-5 py-4 rounded-t-md   md:text-[23px] text-[20px]`}
          >
            {props.text}
          </h2>
        </>
      )}
      <form
        onSubmit={submitingform}
        className={`px-5 relative  p-7 flex md:py-14 md:px-14 flex-col gap-y-6 w-full ${props.padding}`}
      >
        {/* <GlowBackground /> */}

        <GlowBackground2 />
        <div className="flex flex-col gap-3">
          <label className="text-left text-white font-medium">
            {props.data?.name !== undefined
              ? props.data?.name
              : "Enter Your Full Name"}
          </label>
          <div className="flex flex-row items-center gap-5">
            <div className="inputbox2">
              <input
                className={`input ${fieldErrors.name ? " input-error" : ""}`}
                type="text"
                name="name"
                onChange={handleinput}
                value={formValues.name}
                placeholder="Your Name"
                style={{
                  background: "color-mix(in oklab, white 5%, transparent)",
                  border:
                    "1px solid color-mix(in oklab, white 10%, transparent)",
                  color: "white",
                }}
              />
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <select
                name="gender"
                className={`input rounded-md focus:outline-none border${
                  fieldErrors.gender ? " input-error" : ""
                }`}
                onChange={handleinput}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-left text-white font-medium">
            {props.data?.date !== undefined
              ? props.data.date
              : "Select Your Birth Date"}
          </label>
          <div className="grid grid-cols-12 gap-4">
            {/* Day */}
            <div className="col-span-3">
              <select
                className={`input w-full rounded-md focus:outline-none border ${
                  fieldErrors.day ? "input-error" : ""
                }`}
                name="day"
                value={formValues.day}
                onChange={handleNumber}
              >
                <option value="">DD</option>
                {daysInMonthArray.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Month (bigger on contact) */}
            <div className="col-span-5">
              <select
                name="month"
                value={formValues.month}
                className={`input w-full rounded-md focus:outline-none border ${
                  fieldErrors.month ? "input-error" : ""
                }`}
                onChange={handleNumber}
              >
                <option value="">MM</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            {/* Year */}
            <div className=" col-span-4">
              <select
                name="year"
                onChange={handleNumber}
                value={formValues.year}
                className={`input w-full rounded-md focus:outline-none border ${
                  fieldErrors.year ? "input-error" : ""
                }`}
              >
                <option value="">YY</option>
                {yearArray.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="inputbox">
            <select
              name="hour"
              value={formValues.hour}
              className={`input p-3 w-full rounded-md focus:outline-none border${
                fieldErrors.hour ? " input-error" : ""
              }`}
              onChange={handleNumber}
            >
              <option value>Birth Hour</option>
              <option value="0">00 (12 midnight)</option>
              <option value="1">01 (am)</option>
              <option value="2">02 (am)</option>
              <option value="3">03 (am)</option>
              <option value="4">04 (am)</option>
              <option value="5">05 (am)</option>
              <option value="6">06 (am)</option>
              <option value="7">07 (am)</option>
              <option value="8">08 (am)</option>
              <option value="9">09 (am)</option>
              <option value="10">10 (am)</option>
              <option value="11">11 (am)</option>
              <option value="12">12 (noon)</option>
              <option value="13">13 (1 pm)</option>
              <option value="14">14 (2 pm)</option>
              <option value="15">15 (3 pm)</option>
              <option value="16">16 (4 pm)</option>
              <option value="17">17 (5 pm)</option>
              <option value="18">18 (6 pm)</option>
              <option value="19">19 (7 pm)</option>
              <option value="20">20 (8 pm)</option>
              <option value="21">21 (9 pm)</option>
              <option value="22">22 (10 pm)</option>
              <option value="23">23 (11 pm)</option>
            </select>
          </div>
          <div className="inputbox">
            <select
              name="min"
              value={formValues.min}
              className={`input w-full p-3 rounded-md focus:outline-none border${
                fieldErrors.min ? " input-error" : ""
              }`}
              onChange={handleNumber}
            >
              <option value>Birth Minute</option>
              <option value="0">00</option>
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="4">04</option>
              <option value="5">05</option>
              <option value="6">06</option>
              <option value="7">07</option>
              <option value="8">08</option>
              <option value="9">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
              <option value="32">32</option>
              <option value="33">33</option>
              <option value="34">34</option>
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
              <option value="46">46</option>
              <option value="47">47</option>
              <option value="48">48</option>
              <option value="49">49</option>
              <option value="50">50</option>
              <option value="51">51</option>
              <option value="52">52</option>
              <option value="53">53</option>
              <option value="54">54</option>
              <option value="55">55</option>
              <option value="56">56</option>
              <option value="57">57</option>
              <option value="58">58</option>
              <option value="59">59</option>
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-1">
          <label className="text-left text-white font-medium">
            {props.data?.place !== undefined
              ? props.data.place
              : "Select Your Birth Place"}
          </label>
          <DynamicSample
            dark={true}
            defaultPlace={[
              {
                name: formValues?.birth || formValues?.place,
                country: formValues?.country,
              },
            ]}
            passdata={handle}
            clear={reqdate}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-left text-white font-medium">
            Contact Number
          </label>
          <div className="flex gap-2 items-center">
            <span
              className="p-2 rounded-md text-white font-medium"
              style={{
                background: "color-mix(in oklab, white 5%, transparent)",
                border: "1px solid color-mix(in oklab, white 10%, transparent)",
              }}
            >
              +91
            </span>
            <div className="inputbox2">
              <input
                className={`input ${fieldErrors.contact ? " input-error" : ""}`}
                type="tel"
                name="contact"
                maxLength={10}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setFormValues({ ...formValues, contact: val });
                }}
                value={formValues.contact}
                placeholder="Contact Number"
                style={{
                  background: "color-mix(in oklab, white 5%, transparent)",
                  border:
                    "1px solid color-mix(in oklab, white 10%, transparent)",
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-left text-white font-medium">
            {props.data?.email !== undefined
              ? props.data.email
              : "Enter Your Email"}
          </label>
          <div className="inputbox2">
            <input
              className={`input  ${fieldErrors.email ? " input-error" : ""}`}
              type="email"
              name="email"
              onChange={handleinput}
              value={formValues.email}
              placeholder="Your Email"
              style={{
                background: "color-mix(in oklab, white 5%, transparent)",
                border: "1px solid color-mix(in oklab, white 10%, transparent)",
                color: "white",
              }}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className={`${
              props.color ? props.color : "bg-blue-500 hover:bg-blue-600"
            } w-full ${
              isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            } text-[17px] rounded-md px-10 py-3 text-white mt-3 md:float-right font-bold transition-opacity`}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading && (
                <span
                  className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"
                  aria-hidden="true"
                ></span>
              )}
              <span>{buttonLabel}</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

function RadioButton(props) {
  return (
    <div
      className={`relative  ${
        props.cssClass ? props.cssClass : "radio-button3"
      }`}
    >
      <input
        type="radio"
        name={props.name}
        value={props.value}
        defaultChecked={props.check}
      />
      <label
        style={{ background: props.color }}
        className={`border  p-3 capitalize`}
      >
        {props.data}
      </label>
    </div>
  );
}

export const daysInMonthArray = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
  {
    label: "6",
    value: 6,
  },
  {
    label: "7",
    value: 7,
  },
  {
    label: "8",
    value: 8,
  },
  {
    label: "9",
    value: 9,
  },
  {
    label: "10",
    value: 10,
  },
  {
    label: "11",
    value: 11,
  },
  {
    label: "12",
    value: 12,
  },
  {
    label: "13",
    value: 13,
  },
  {
    label: "14",
    value: 14,
  },
  {
    label: "15",
    value: 15,
  },
  {
    label: "16",
    value: 16,
  },
  {
    label: "17",
    value: 17,
  },
  {
    label: "18",
    value: 18,
  },
  {
    label: "19",
    value: 19,
  },
  {
    label: "20",
    value: 20,
  },
  { label: "21", value: 21 },
  {
    label: "22",
    value: 22,
  },
  {
    label: "23",
    value: 23,
  },
  {
    label: "24",
    value: 24,
  },
  {
    label: "25",
    value: 25,
  },
  {
    label: "26",
    value: 26,
  },
  {
    label: "27",
    value: 27,
  },
  {
    label: "28",
    value: 28,
  },
  {
    label: "29",
    value: 29,
  },
  { label: "30", value: 30 },
  {
    label: "31",
    value: 31,
  },
];

export const yearArray = [
  {
    label: "1940",
    value: 1940,
  },
  {
    label: "1941",
    value: 1941,
  },
  {
    label: "1942",
    value: 1942,
  },
  {
    label: "1943",
    value: 1943,
  },
  {
    label: "1944",
    value: 1944,
  },
  {
    label: "1945",
    value: 1945,
  },
  {
    label: "1946",
    value: 1946,
  },
  {
    label: "1947",
    value: 1947,
  },
  {
    label: "1948",
    value: 1948,
  },
  {
    label: "1949",
    value: 1949,
  },
  {
    label: "1950",
    value: 1950,
  },
  {
    label: "1951",
    value: 1951,
  },
  {
    label: "1952",
    value: 1952,
  },
  {
    label: "1953",
    value: 1953,
  },
  {
    label: "1954",
    value: 1954,
  },
  {
    label: "1955",
    value: 1955,
  },
  {
    label: "1956",
    value: 1956,
  },
  {
    label: "1957",
    value: 1957,
  },
  {
    label: "1958",
    value: 1958,
  },
  {
    label: "1959",
    value: 1959,
  },
  {
    label: "1960",
    value: 1960,
  },
  {
    label: "1961",
    value: 1961,
  },
  {
    label: "1962",
    value: 1962,
  },
  {
    label: "1963",
    value: 1963,
  },
  {
    label: "1964",
    value: 1964,
  },
  {
    label: "1965",
    value: 1965,
  },
  {
    label: "1966",
    value: 1966,
  },
  {
    label: "1967",
    value: 1967,
  },
  {
    label: "1968",
    value: 1968,
  },
  {
    label: "1969",
    value: 1969,
  },
  {
    label: "1970",
    value: 1970,
  },
  {
    label: "1971",
    value: 1971,
  },
  {
    label: "1972",
    value: 1972,
  },
  {
    label: "1973",
    value: 1973,
  },
  {
    label: "1974",
    value: 1974,
  },
  {
    label: "1975",
    value: 1975,
  },
  {
    label: "1976",
    value: 1976,
  },
  {
    label: "1977",
    value: 1977,
  },
  {
    label: "1978",
    value: 1978,
  },
  {
    label: "1979",
    value: 1979,
  },
  {
    label: "1980",
    value: 1980,
  },
  {
    label: "1981",
    value: 1981,
  },
  {
    label: "1982",
    value: 1982,
  },
  {
    label: "1983",
    value: 1983,
  },
  {
    label: "1984",
    value: 1984,
  },
  {
    label: "1985",
    value: 1985,
  },
  {
    label: "1986",
    value: 1986,
  },
  {
    label: "1987",
    value: 1987,
  },
  {
    label: "1988",
    value: 1988,
  },
  {
    label: "1989",
    value: 1989,
  },
  {
    label: "1990",
    value: 1990,
  },
  {
    label: "1991",
    value: 1991,
  },
  {
    label: "1992",
    value: 1992,
  },
  {
    label: "1993",
    value: 1993,
  },
  {
    label: "1994",
    value: 1994,
  },
  {
    label: "1995",
    value: 1995,
  },
  {
    label: "1996",
    value: 1996,
  },
  {
    label: "1997",
    value: 1997,
  },
  {
    label: "1998",
    value: 1998,
  },
  {
    label: "1999",
    value: 1999,
  },
  {
    label: "2000",
    value: 2000,
  },
  {
    label: "2001",
    value: 2001,
  },
  {
    label: "2002",
    value: 2002,
  },
  {
    label: "2003",
    value: 2003,
  },
  {
    label: "2004",
    value: 2004,
  },
  {
    label: "2005",
    value: 2005,
  },
  {
    label: "2006",
    value: 2006,
  },
  {
    label: "2007",
    value: 2007,
  },
  {
    label: "2008",
    value: 2008,
  },
  {
    label: "2009",
    value: 2009,
  },
  {
    label: "2010",
    value: 2010,
  },
  {
    label: "2011",
    value: 2011,
  },
  {
    label: "2012",
    value: 2012,
  },
  {
    label: "2013",
    value: 2013,
  },
  {
    label: "2014",
    value: 2014,
  },
  {
    label: "2015",
    value: 2015,
  },
  {
    label: "2016",
    value: 2016,
  },
  {
    label: "2017",
    value: 2017,
  },
  {
    label: "2018",
    value: 2018,
  },
  {
    label: "2019",
    value: 2019,
  },
  {
    label: "2020",
    value: 2020,
  },
  {
    label: "2021",
    value: 2021,
  },
  {
    label: "2022",
    value: 2022,
  },
  {
    label: "2023",
    value: 2023,
  },
  {
    label: "2024",
    value: 2024,
  },
  {
    label: "2025",
    value: 2025,
  },
];

export const monthsArray = [
  {
    label: "January",
    value: 1,
  },
  {
    label: "February",
    value: 2,
  },
  {
    label: "March",
    value: 3,
  },
  {
    label: "April",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "June",
    value: 6,
  },
  {
    label: "July",
    value: 7,
  },
  {
    label: "August",
    value: 8,
  },
  {
    label: "September",
    value: 9,
  },
  {
    label: "October",
    value: 10,
  },
  {
    label: "November",
    value: 11,
  },
  {
    label: "December",
    value: 12,
  },
];
