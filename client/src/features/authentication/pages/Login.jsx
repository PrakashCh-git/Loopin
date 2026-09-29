import React from "react";
import { Star } from "lucide-react";

import { assets } from "../../../assets/assets";
import Logo from "../../../assets/LoopinLogo.png";

const Login = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      
      {/* Background */}
      <img
        src={assets.bgImage}
        alt=""
        className="fixed inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Main Container */}
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 py-6 md:px-10 md:py-8 lg:px-12 xl:px-16 md:flex-row md:items-start md:gap-10 lg:gap-16">

        {/* ================= LEFT SIDE ================= */}
        <section className="flex min-h-[550px] flex-1 flex-col">

          {/* Logo */}
          <img
            src={Logo}
            alt="Loopin"
            className="h-12 w-auto object-contain self-start md:h-14"
          />

          {/* Branding Content */}
          <div className="flex flex-1 items-center py-12 md:py-0">
            <div className="w-full max-w-3xl">

              {/* Users + Rating */}
              <div className="mb-5 flex items-center gap-3">

                <img
                  src={assets.group_users}
                  alt=""
                  className="h-8 md:h-10"
                />

                <div>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="size-4 text-transparent fill-amber-500 md:size-5"
                        />
                      ))}
                  </div>

                  <p className="text-sm text-gray-700">
                    Used by 12k+ users
                  </p>
                </div>

              </div>

              {/* Main Heading */}
              <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-orange-800 via-purple-800 to-blue-900 bg-clip-text text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                Connect. Share. Belong. Keep Loopin.
              </h1>

              {/* Subtitle */}
              <h2 className="mt-3 max-w-2xl text-xl font-medium leading-snug text-purple-950 sm:text-2xl md:text-3xl lg:text-4xl">
                Connect with global community in Loopin
              </h2>

            </div>
          </div>
        </section>


        {/* ================= RIGHT SIDE ================= */}
        <section className="flex w-full justify-center md:w-[420px] md:shrink-0 md:self-center">

          <div className="w-full max-w-[420px]">

            {/* Login Card */}
            <div className="rounded-t-2xl bg-white p-7 shadow-xl sm:p-8 md:p-10">

              {/* Heading */}
              <div className="mb-8 text-center">

                <h1 className="text-2xl font-bold sm:text-3xl">
                  Sign in to
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Welcome back! Please sign in to continue
                </p>

              </div>


              {/* Form */}
              <form className="space-y-5">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                </div>


                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                </div>


                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-medium text-purple-700 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>


                {/* Continue */}
                <button
                  type="submit"
                  className="w-full rounded-md bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
                >
                  Continue
                </button>

              </form>

            </div>


            {/* Signup */}
            <div className="rounded-b-2xl bg-gray-100 px-5 py-4 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-black hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Login;