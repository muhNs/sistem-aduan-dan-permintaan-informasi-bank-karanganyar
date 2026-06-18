// components/Layout.tsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth.js";
import BankLogo from "../assets/bank-karanganyar-logo.png";
import Swal from "sweetalert2";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin logout?",
      text: "Anda akan keluar dari sistem",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, keluar",
      cancelButtonText: "Batal",
      buttonsStyling: false, // 🔥 penting (disable style default)
      customClass: {
        confirmButton:
          "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600",
        cancelButton:
          "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 ml-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  // Toggle sidebar - buka/tutup dengan icon menu yang sama
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7fb] overflow-x-hidden">
      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* AREA UTAMA */}
      <main className="flex-1 min-w-0 flex flex-col md:ml-72 transition-all duration-300 ease-in-out min-h-screen">
        {/* TOP NAVBAR - FULL WIDTH MEPET KIRI */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1c2d] shadow-md border-b border-gray-700 h-16 flex items-center justify-between px-4 md:px-8">
          {/* KIRI: Hamburger Menu & Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger hanya di Mobile */}
            <button
              onClick={toggleSidebar}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 md:hidden"
            >
              <Menu size={24} />
            </button>
            {/* LOGO - Ditambahkan my-2 untuk margin atas dan bawah */}
            <img
              src={BankLogo}
              alt="Bank Karanganyar"
              className="h-10 md:h-14 w-auto object-contain my-2"
            />
          </div>

          {/* Spacer untuk Desktop */}
          <div className="hidden md:block flex-1"></div>

          {/* KANAN: Tombol Logout - MENTOK KANAN */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-lg transition-colors font-medium ml-auto"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </header>

        {/* KONTEN HALAMAN */}
        <div className="flex-1 pt-20 pb-6 w-full max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
