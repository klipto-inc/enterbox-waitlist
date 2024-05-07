"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/resources/images/enterbox-logo.svg";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";
import { useTheme } from "next-themes";
import axios from "axios";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMode = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const [email, setEmail] = useState<string>();

  const isProduction = process.env.NODE_ENV === "production";

  const url = isProduction
    ? process.env.NEXT_PUBLIC_PROD_SERVER // Production server URL
    : process.env.NEXT_PUBLIC_LOCAL_SERVER // Local server URL

  const handleEmailSubscriber = async (e: any) => {
    e.preventDefault();
    console.log(email, url);

    setLoading(true);
    try {
      if (!email) {
        setLoading(false);
        return;
      }

      // const response = await axios.post(
      //   `http://localhost:8000/api/v1/waitlist/email`,
      //   { email }
      // );
      const response = await axios.post(`${url}waitlist/email`, { email });
      console.log(response);
      if (response.status === 201) {
        e.target.reset();
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },

          action: (key) => (
            <button onClick={() => closeSnackbar(key)}>
              {" "}
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className=""
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ),
        });
      }
    } catch (error: any) {
      enqueueSnackbar(`${error?.response.data.message}`, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },

        action: (key) => (
          <button onClick={() => closeSnackbar(key)}>
            {" "}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className=""
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-black">
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <>
        {/* Hero */}
        <div className="relative h-screen overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')]">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
            {/* Announcement Banner */}
            <Link
              className="flex items-center gap-2 justify-center mb-8"
              href="/dashboard"
              aria-label="Brand"
            >
              <Image
                src={Logo}
                className="h-12 w-12 lg:h-16 lg:w-16"
                alt="enterbox logo"
                height={200}
                width={200}
              />

              <span className="flex-none text-xl lg:text-4xl font-semibold text-black dark:text-white">
                Enterbox
              </span>
            </Link>

            <div className="flex justify-center">
              <a
                className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200"
                href="#"
              >
                amazing features - awaits you
                <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </a>
            </div>
            {/* End Announcement Banner */}
            {/* Title */}
            <div className="mt-5 max-w-2xl text-center mx-auto">
              <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
                Launching
                <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent ml-2">
                  Soon
                </span>
              </h1>
            </div>
            {/* End Title */}
            <div className="mt-5 max-w-3xl text-center mx-auto">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                We offer everything you need to create a stunning website,
                execute effective email marketing campaigns, and unlock a suite
                of other amazing features.
              </p>
            </div>
            {/* Buttons */}
            <form onSubmit={handleEmailSubscriber}>
              <div className="mt-8 gap-3 flex flex-col sm:flex-row justify-center">
                <div className="flex items-center gap-x-3 rounded-lg  py-3 px-4 border-gray-300 border">
                  <div className="inset-y-0 start-0 flex items-center pointer-events-none  ps-4">
                    <svg
                      className="flex-shrink-0 size-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width={20} height={16} x={2} y={4} rx={2} />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name=""
                    id=""
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                    className=" bg-transparent border-transparent focus-none outline-none text-gray-800 dark:text-gray-100  sm:w-[40vw] md:w-[30vw] lg:w-[20vw]"
                    placeholder="Enter your email here"
                  />
                </div>

                <button
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-red-600 to-violet-600 hover:from-black-600 hover:to-red-[#C12727] border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800 border-none"
                  type="submit"
                  aria-label="Join waitlist"
                >
                  {loading === false ? (
                    <div className="flex items-center gap-x-3">
                      Join waitlist
                      <svg
                        className="flex-shrink-0 animate-pulse"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2 mx-8">
                      <svg
                        width={20}
                        height={20}
                        fill="currentColor"
                        className="mr-2 animate-spin "
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                      </svg>
                      {/* loading */}
                    </div>
                  )}
                </button>
              </div>{" "}
            </form>
          </div>
        </div>
        {/* End Hero */}
      </>

      <footer className="absolute bottom-0 inset-x-0 text-center py-5 bg-gray-100 dark:bg-[#0F0F0F]">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-800 dark:text-gray-100">
            © 2024 Enterbox. A product of{" "}
            <a
              className="text-gray-800 dark:text-white font-medium hover:text-blue/80 font-semibold"
              href="../index.html"
            >
              Klipto Inc.
            </a>
          </p>
        </div>
      </footer>
      {/* ========== END FOOTER ========== */}

      <div className="absolute top-6 right-6 flex items-center gap-2">
        {resolvedTheme === "dark" ? (
          <div className=" rounded-full bg-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer text-yellow-500 m-1"
              onClick={handleMode}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </div>
        ) : (
          <div className=" rounded-full bg-gray-800 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer m-1"
              onClick={handleMode}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
