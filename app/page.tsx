"use client";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 ">
      <div className="flex h-20 shrink-0 items-end rounded-lg  p-4 md:h-52 "></div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div />
        <div className="flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} antialiased text-xl text-gray-100 md:text-3xl md:leading-normal`}
          >
            <strong>
              Welcome to the one and only Fish Perameter Tracker,{" "}
            </strong>
            brought to you by Cameron Safai.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base "
          >
            <span>Log in</span>
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"></div>
      </div>
    </main>
  );
}
