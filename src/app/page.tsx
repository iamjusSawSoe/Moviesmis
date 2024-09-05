"use client";
import Footer from "@/components/Footer";
import HomeSegment from "@/components/HomeSegment";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <main className="dark:bg-primary bg-[#f5f5f5]  w-full overflow-hidden flex flex-col min-h-[100dvh]">
      <Navbar setSearchValue={(val) => setSearchValue(val)} />
      <section className="flex-1">
        <HomeSegment />
      </section>
      <Footer />
    </main>
  );
}
