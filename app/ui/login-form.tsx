"use client";

import { lusitana } from "@/app/ui/fonts";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import { useState } from "react";
import { login } from "@/app/login/actions";

export default function LoginForm() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    console.log(result);
    if (result) {
      setError("Invalid credentials.");
    }
  }
  return (
    <form action={handleSubmit} className="space-y-3 ">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8  ">
        <h1 className={`${lusitana.className} mb-3 text-2xl `}>
          Please log in to continue.
        </h1>
        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
        <div className="w-full  ">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium  "
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 "
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 "
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" />
        <div className="flex flex-col items-center ">
          <Button className="mt-4 w-full">
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <Button
            className="mt-4 w-1/2 bg-green-500 hover:bg-green-600"
            type="button" // Add this to prevent form submission
            onClick={() => {
              // Add your create account logic here
              window.location.href = "/login/signup"; // or your signup route
            }}
          >
            Create Account{" "}
            <ArrowRightIcon className="ml-2 h-4 w-4 text-gray-50" />
          </Button>
        </div>
      </div>
    </form>
  );
}
