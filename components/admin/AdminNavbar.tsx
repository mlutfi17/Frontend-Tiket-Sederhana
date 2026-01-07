"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import LogoutConfirm from "../LogoutConfirm";
import { logout } from "@/services/authService";

type Props = {
  onMobileMenu: () => void;
  onCollapseToggle: () => void;
  collapsed: boolean;
};

export default function AdminNavbar({
  onMobileMenu,
  onCollapseToggle,
  collapsed,
}: Props) {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-6 py-4 shadow">
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <button
            onClick={onMobileMenu}
            className="lg:hidden text-gray-900 rounded-lg p-2 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          {/* Desktop collapse */}
          <button
            onClick={onCollapseToggle}
            className="hidden lg:inline text-gray-900 rounded-lg p-2 hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronsRight size={20} />
            ) : (
              <ChevronsLeft size={20} />
            )}
          </button>

          <h1 className="text-lg font-semibold text-gray-900">
            Admin Tiketku
          </h1>
        </div>

        <button
          onClick={() => setShowLogout(true)}
          className="
            flex items-center gap-2 rounded-lg
            bg-red-50 px-4 py-2 text-sm
            font-medium text-red-600 hover:bg-red-100
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </header>

      {showLogout && (
        <LogoutConfirm
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </>
  );
}
