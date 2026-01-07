"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
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
        <AdminNavbar
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
