"use client";
import Footer from "@/components/Footer";
import HomeSegment from "@/components/HomeSegment";
import SpinningLoading from "@/components/loading/SpinningLoading";
import Navbar from "@/components/Navbar";
import { RootState } from "@/store/store";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const { isSpinningLoading } = useSelector(
    (state: RootState) => state.spinningLoader
  );

  useEffect(() => {
    if (isSpinningLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSpinningLoading]);

  return (
    <main className="dark:bg-primary bg-[#f5f5f5]  w-full overflow-hidden flex flex-col min-h-[100dvh]">
      <Navbar setSearchValue={(val) => setSearchValue(val)} />
      <Suspense fallback={<SpinningLoading />}>
        <section className="flex-1">
          <HomeSegment />
        </section>
      </Suspense>
      <Footer />
      {isSpinningLoading && (
        <section className="w-full min-h-[100dvh] dark:bg-primary bg-[#f5f5f5] z-50">
          <SpinningLoading />
        </section>
      )}
    </main>
  );
}
