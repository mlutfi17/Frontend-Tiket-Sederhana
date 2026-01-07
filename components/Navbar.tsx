"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutConfirm from "./LogoutConfirm";
import { logout } from "@/services/authService";

export default function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <span className="text-lg font-bold text-blue-600">
          Tiketku
        </span>

        <button
          onClick={() => setShowLogout(true)}
          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          Logout
        </button>
      </nav>

      {showLogout && (
        <LogoutConfirm
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </>
  );
}
