"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Ticket,
  HomeIcon,
  Home,
  User,
} from "lucide-react";

type Props = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
};

export default function UserSidebar({
  open,
  collapsed,
  onClose,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed z-50 h-full bg-white shadow
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-17 border-b">
          <span className="text-lg font-bold text-blue-600">
            {collapsed ? "T" : "Tiketku"}
          </span>
        </div>

        {/* Menu */}
        <nav className="px-2 py-4 space-y-1 text-sm">
          <SidebarItem
            href="/dashboard"
            label="Dashboard"
            icon={<Home size={18} />}
            active={pathname === "/dashboard"}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/my-bookings"
            label="My Booking"
            icon={<ClipboardList size={18} />}
            active={pathname.startsWith("/my-bookings")}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/tickets"
            label="Pesan Tiket"
            icon={<Ticket size={18} />}
            active={pathname.startsWith("/tickets")}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/profile"
            label="Profile"
            icon={<User size={18} />}
            active={pathname.startsWith("/profile")}
            collapsed={collapsed}
          />
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({
  href,
  label,
  icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        relative flex items-center gap-3 rounded-lg px-4 py-2
        transition
        ${
          active
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      {active && (
        <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-blue-600" />
      )}

      <span className="flex-shrink-0">{icon}</span>

      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
