// components/Sidebar.tsx
import {
  LayoutDashboard,
  Search,
  FileText,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ProfileCard } from "./profile-card";
import { useAduan } from "../features/aduan/hooks/useAduan";
import { useInformationList } from "../features/permintaan-informasi/hooks/useInformationList";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { data: aduanData } = useAduan();
  const { data: requestInfoData } = useInformationList();

  const openAduanCount = aduanData.filter((d) => d.status === "open").length;
  const openRequestCount = requestInfoData.filter(
    (d) => d.status === "pending",
  ).length;

  const menuItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    {
      path: "/aduan",
      label: "Daftar Aduan",
      icon: FileText,
      badge: {
        count: openAduanCount,
        // text: "baru",
        color: "bg-green-600 text-black border-green-600",
      },
    },
    {
      path: "/permintaan-informasi",
      label: "Permintaan Informasi",
      icon: Search,
      badge: {
        count: openRequestCount,
        // text: "baru",
        color: "bg-green-600 text-black border-green-600",
      },
    },
    { path: "/manajemen-user", label: "Manajemen User", icon: Users },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-72 bg-gradient-to-b from-[#1a1c2d] to-[#101223] h-screen text-white flex flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 shadow-2xl pt-16`}
    >
      {/* PROFILE CARD */}
      <ProfileCard />

      {/* MENU */}
      <nav className="flex-1 px-4 py-3 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-black font-semibold shadow-lg scale-[1.02]"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>

              {item.badge && item.badge.count > 0 && (
                <span
                  className={`text-[15px] px-2 py-0.6 rounded-full border transition-colors duration-200 ${
                    isActive
                      ? "bg-black/10 text-black border-black/20 font-bold"
                      : item.badge.color
                  }`}
                >
                  {item.badge.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
