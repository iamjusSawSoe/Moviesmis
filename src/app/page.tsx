'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const {isDarkMode} = useSelector((state: RootState) => state.theme);
  const [searchValue, setSearchValue] = useState("");
  
  return <main className='dark:bg-primary bg-[#f5f5f5]  w-full overflow-hidden flex flex-col min-h-[100dvh]'>
    <Navbar setSearchValue={(val) => setSearchValue(val)} />
    <section className='flex-1'></section>
    <Footer />
  </main>;
}
