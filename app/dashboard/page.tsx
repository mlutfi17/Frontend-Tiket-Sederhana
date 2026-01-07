"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/axios";

type JwtPayload = {
  id: number;
  email: string;
  role: "admin" | "user";
};

type Booking = {
  status: "PENDING" | "PAID" | "CANCELLED";
};

export default function UserDashboard() {

  const [userEmail, setUserEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode<JwtPayload>(token);
    setUserEmail(decoded.email);

    api.get("/bookings/my").then((res) => setBookings(res.data));
  }, []);

  const total = bookings.length;
  const paid = bookings.filter((b) => b.status === "PAID").length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Selamat datang, <span className="font-medium">{userEmail}</span>
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
        <StatCard
          title="Total Booking"
          value={total}
          color="blue"
        />
        <StatCard
          title="Booking Dibayar"
          value={paid}
          color="green"
        />
        <StatCard
          title="Menunggu Pembayaran"
          value={pending}
          color="yellow"
        />
      </div>

      {/* Shortcut */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ShortcutCard
          title="My Booking"
          description="Lihat dan kelola booking Anda"
          href="/my-bookings"
        />
        <ShortcutCard
          title="Pesan Tiket"
          description="Cari dan pesan tiket perjalanan"
          href="/tickets"
        />
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "blue" | "green" | "yellow";
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
  };

  return (
    <div className="rounded-2xl bg-white shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
}

function ShortcutCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="
        block rounded-2xl bg-white shadow p-6
        hover:shadow-md transition
      "
    >
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        {description}
      </p>
    </a>
  );
}
