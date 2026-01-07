"use client";

import { useState } from "react";
import { Menu, ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import LogoutConfirm from "@/components/LogoutConfirm";
import { logout } from "@/services/authService";

type Props = {
  collapsed: boolean;
  onMobileMenu: () => void;
  onCollapseToggle: () => void;
};

export default function UserNavbar({
  collapsed,
  onMobileMenu,
  onCollapseToggle,
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
          {/* Mobile */}
          <button
            onClick={onMobileMenu}
            className="lg:hidden text-gray-900 rounded-lg p-2 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          {/* Desktop */}
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
            User
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
