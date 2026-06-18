import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoBank from '../../assets/logo-final.png'; 

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#123296] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* SISI KIRI: Logo & Nama */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center">
              <img 
                src={logoBank} 
                alt="Logo Bank Karanganyar" 
                className="h-14 w-auto object-contain p-1" 
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/150x50/1e3a8a/ffffff?text=LOGO+BANK";
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg leading-tight">
                PT BPR BANK KARANGANYAR
              </h1>
              <p className="text-blue-200 text-xs font-medium tracking-wider">
                E-FORMULIR SYSTEM
              </p>
            </div>
          </div>

          {/* SISI KANAN: Menu Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-white text-sm font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wide">Home</a>
            <a href="#about" className="text-white text-sm font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wide">About</a>
            <a href="#contact" className="text-white text-sm font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wide">Contact us</a>
          </div>

          {/* SISI KANAN: Tombol Hamburger Mobile */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-white hover:text-yellow-400 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MENU DROPDOWN MOBILE */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full shadow-2xl border-t border-white/10 bg-[#123296]">
          <div className="px-6 py-6 space-y-2 flex flex-col">
            <a 
              href="#" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-4 rounded-xl text-lg font-bold text-white hover:bg-white/10 transition-all border-b border-white/5"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-4 rounded-xl text-lg font-bold text-white hover:bg-white/10 transition-all border-b border-white/5"
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-4 rounded-xl text-lg font-bold text-white hover:bg-white/10 transition-all"
            >
              Contact us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;