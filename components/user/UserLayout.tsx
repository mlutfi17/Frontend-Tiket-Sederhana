"use client";

import { useState } from "react";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserSidebar
        open={mobileOpen}
        collapsed={collapsed}
        onClose={() => setMobileOpen(false)}
      />

      <div
        className={`
          transition-all duration-300
          ${collapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        <UserNavbar
          collapsed={collapsed}
          onMobileMenu={() => setMobileOpen(true)}
          onCollapseToggle={() => setCollapsed(!collapsed)}
        />

        <main className="p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
