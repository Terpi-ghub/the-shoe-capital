"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderSearch from "@/components/HeaderSearch";
export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <>
      {isHome && (
        <div className="relative w-full h-[50vh] md:h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-[#800000] group">
          <img src="/your-cover-image.gif" alt="Home Cover" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="absolute inset-0 bg-black/20 z-10"></div>
        </div>
      )}
      <header className="sticky top-0 bg-[#800000] text-white py-5 px-8 shadow-2xl border-b-4 border-[#FFD700] z-[90]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 text-2xl md:text-3xl font-bold tracking-tight text-white mb-0 hover:text-[#FFD700] transition relative z-50">
            <img src="/logo.png" alt="TSC Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
            The Shoe Capital
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white hover:text-[#FFD700] transition focus:outline-none relative z-50">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          )}
          <div className={`fixed top-0 right-0 h-full w-72 bg-[#800000] border-l border-[#FFD700]/30 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:static md:w-auto md:h-auto md:bg-transparent md:border-none md:shadow-none md:translate-x-0 md:flex flex-col md:flex-row items-center gap-8 pt-24 md:pt-0 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-8 text-white hover:text-[#FFD700] transition font-bold text-2xl md:hidden">✕</button>
            <nav className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 text-sm font-bold uppercase tracking-widest text-white items-center w-full md:w-auto px-8 md:px-0">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD700] transition">Home</Link>
              <div className="relative group w-full md:w-auto text-center">
                <span className="hover:text-[#FFD700] transition flex items-center justify-center gap-1 uppercase cursor-pointer py-2 md:py-4 md:-my-4">
                  Categories ▾
                </span>
                <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-full md:pt-4 w-full md:w-56 hidden group-hover:block transition-all z-50">
                  <div className="bg-white border-t-4 border-[#800000] rounded-b-md shadow-2xl text-left overflow-hidden mt-2 md:mt-0">
                    <Link href="/category/news" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-[#800000] font-bold hover:bg-[#800000] hover:text-[#FFD700] transition border-b border-gray-100">News</Link>
                    <Link href="/category/editorial" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-[#800000] font-bold hover:bg-[#800000] hover:text-[#FFD700] transition border-b border-gray-100">Editorial</Link>
                    <Link href="/category/column" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-[#800000] font-bold hover:bg-[#800000] hover:text-[#FFD700] transition border-b border-gray-100">Column</Link>
                    <Link href="/category/feature" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-[#800000] font-bold hover:bg-[#800000] hover:text-[#FFD700] transition border-b border-gray-100">Feature</Link>
                    <Link href="/category/sci-tech" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-[#800000] font-bold hover:bg-[#800000] hover:text-[#FFD700] transition border-b border-gray-100">Sci-Tech</Link>
                    <Link href="/category/sports" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-[#800000] font-bold hover:bg-[#800000] hover:text-[#FFD700] transition border-b border-gray-100">Sports</Link>
                    <Link href="/category/literary" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-[#800000] font-bold hover:bg-[#800000] hover:text-[#FFD700] transition border-b border-gray-100">Literary</Link>
                    <Link href="/category/graphics" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-[#800000] font-bold hover:bg-[#800000] hover:text-[#FFD700] transition border-b border-gray-100">Graphics</Link>
                    <Link href="/category/updates" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-[#800000] font-bold hover:bg-[#800000] hover:text-[#FFD700] transition">Updates</Link>
                  </div>
                </div>
              </div>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD700] transition">About</Link>
              <Link href="/staff" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD700] transition">Staff</Link>
              {isLoggedIn ? (
                <button onClick={() => setIsLoggedIn(false)} className="hover:text-[#FFD700] transition font-bold uppercase tracking-widest">Sign Out</button>
              ) : (
                <button onClick={() => setIsLoggedIn(true)} className="bg-[#FFD700] text-[#800000] px-5 py-2 rounded-full hover:bg-white hover:scale-105 transition shadow-lg font-bold uppercase tracking-widest text-xs">Sign In</button>
              )}
            </nav>
            <div className="flex justify-center mt-6 md:mt-0">
              <HeaderSearch />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}