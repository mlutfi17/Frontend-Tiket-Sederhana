"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Ticket,
  ClipboardList,
  CreditCard,
  House,
  Tags,
} from "lucide-react";

type Props = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
};

export default function AdminSidebar({
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
            href="/admin/dashboard"
            label="Dashboard"
            collapsed={collapsed}
            active={pathname.startsWith("/admin/dashboard")}
            icon={<House size={18} />}
          />
          <SidebarItem
            href="/admin/categories"
            label="Kategori Tiket"
            collapsed={collapsed}
            active={pathname.startsWith("/admin/categories")}
            icon={<Tags size={18} />}
          />
          <SidebarItem
            href="/admin/tickets"
            label="Kelola Tiket"
            collapsed={collapsed}
            active={pathname.startsWith("/admin/tickets")}
            icon={<Ticket size={18} />}
          />
          <SidebarItem
            href="/admin/bookings"
            label="Data Booking"
            collapsed={collapsed}
            active={pathname.startsWith("/admin/bookings")}
            icon={<ClipboardList size={18} />}
          />
          <SidebarItem
            href="/admin/payments"
            label="Data Payment"
            collapsed={collapsed}
            active={pathname.startsWith("/admin/payments")}
            icon={<CreditCard size={18} />}
          />
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({
  href,
  label,
  collapsed,
  active,
  icon,
}: {
  href: string;
  label: string;
  collapsed: boolean;
  active: boolean;
  icon: React.ReactNode;
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
      {/* Active indicator */}
      {active && (
        <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-blue-600" />
      )}

      {/* Icon */}
      <span className="flex-shrink-0">
        {icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <span className="whitespace-nowrap">
          {label}
        </span>
      )}
    </Link>
  );
}
